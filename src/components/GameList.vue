<script setup lang="ts">
import type { GameData } from '../types';

// 親から受け取るデータ
defineProps<{
  games: GameData[];
  selectedGameId?: string;
}>();

// 親へ通知するイベント
const emit = defineEmits<{ (e: 'select', game: GameData): void; (e: 'launch', exePath: string): void }>();
</script>

<template>
	<div class="flex-1 overflow-y-auto p-4">
		<h2 class="text-2xl font-bold m-2 text-white">
			ゲーム一覧
		</h2>
		
		<div 
		v-for="game in games" 
		:key="game.id"
		@mouseenter="emit('select', game)"
		@click="emit('launch', game.exePath)"
		class="p-4 my-2 rounded transition-colors duration-200 cursor-pointer"
		:class="selectedGameId === game.id ? 'bg-blue-700 hover:bg-blue-500' : 'bg-gray-700'"
		>
			<span class="text-lg font-semibold">{{ game.title }}</span>
		</div>
	</div>
</template>
