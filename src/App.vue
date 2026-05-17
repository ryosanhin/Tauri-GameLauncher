<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { GameData } from './types';
import { loadGames, getImageUrl, launchGame } from './utils/tauri';

// コンポーネントのインポート
import GameList from './components/GameList.vue';
import GameDetail from './components/GameDetail.vue';
import GamePreview from './components/GamePreview.vue';

const games = ref<GameData[]>([]);
const selectedGame = ref<GameData | null>(null);
const selectedGameImageUrl = ref<string>('');

onMounted(async () => {
	games.value = await loadGames();
	if (games.value.length > 0) {
		handleSelectGame(games.value[0]);
	}
});

const handleSelectGame = async (game: GameData) => {
	selectedGame.value = game;
	selectedGameImageUrl.value = await getImageUrl(game);
};
</script>

<template>
	<div class="h-screen flex bg-gray-900 text-white overflow-hidden">
		<!-- left side -->
		<div class="w-1/3 flex bg-gray-800">
			<GameList 
			:games="games" 
			:selected-game-id="selectedGame?.id"
			@select="handleSelectGame"
			@launch="launchGame"
			/>
			
			
		</div>

		<!-- right side -->
		<div class="flex flex-col w-full bg-gray-800">
			<GamePreview 
			:image-url="selectedGameImageUrl" 
			:title="selectedGame?.title" 
			/>
			<GameDetail 
			:game="selectedGame"
			/>
		</div>
	</div>
</template>