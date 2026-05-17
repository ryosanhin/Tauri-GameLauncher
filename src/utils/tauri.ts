import { convertFileSrc, invoke, isTauri } from "@tauri-apps/api/core";
import { join, resourceDir } from "@tauri-apps/api/path";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { readTextFile } from "@tauri-apps/plugin-fs";
import type { GameData } from "../types";

const DataDir = "Datas";

// ゲーム一覧を読み込む関数
export async function loadGames(): Promise<GameData[]> {
  if (isTauri()) {
    const dirPath = await resourceDir();
    const configPath = await join(dirPath, DataDir, "config.json");
    const jsonText = await readTextFile(configPath);
    return JSON.parse(jsonText) as GameData[];
  } else {
    const res = await fetch(`/${DataDir}/config.json`);
    return await res.json();
  }
}

// 画像の表示用URLを生成する関数
export async function getImageUrl(game: GameData): Promise<string> {
  if (isTauri()) {
    const dirPath = await resourceDir();
    const imagePath = await join(dirPath, DataDir, game.imagePath);
    return convertFileSrc(imagePath);
  } else {
    return `/${DataDir}/${game.imagePath}`;
  }
}

// ゲームを起動する関数
export async function launchGame(exePath: string): Promise<void> {
  if (isTauri()) {
    const appWindow = getCurrentWindow();

    try {
      await appWindow.minimize();
      const dirPath = await resourceDir();
      const cmd = await join(dirPath, DataDir, exePath);
      console.log(cmd);
      await invoke("launch_game_wait", { cmd: cmd });
    } catch (e) {
      console.error("起動エラー:", e);
      alert("ゲーム起動に失敗。");
    } finally {
      await appWindow.unminimize();
      await appWindow.setFocus();
    }
  } else {
    alert(`【テスト起動】\n/${DataDir}/${exePath}`);
  }
}
