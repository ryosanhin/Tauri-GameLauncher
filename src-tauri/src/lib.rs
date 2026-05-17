use tauri::Manager;
use std::process::Command as StdCommand;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![launch_game_wait])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn launch_game_wait(cmd: String) -> Result<(), String> {
    tauri::async_runtime::spawn_blocking(move || {
        // OS標準の機能で対象のファイル(exeやbat)を起動
        let mut child = StdCommand::new(cmd)
            .spawn()
            .map_err(|e| e.to_string())?;

        // プロセスが終了するまでここで待機
        child.wait().map_err(|e| e.to_string())?;
        
        Ok::<(), String>(())
    })
    .await
    .map_err(|_| "スレッドの実行エラー".to_string())??;

    // ゲームが終了したらJS側に完了(Ok)を返す
    Ok(())
}