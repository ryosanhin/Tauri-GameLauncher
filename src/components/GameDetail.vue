<script setup lang="ts">
import type { GameData } from "../types";

defineProps<{ game: GameData | null }>();
</script>

<template>
    <div class="p-6 bg-gray-900">
        <div v-if="game" class="flex flex-col">
            <h3 class="text-2xl font-bold text-white m-2">{{ game.title }}</h3>
            
            <p class="text-white overflow-y-auto whitespace-break-spaces m-2">
                {{ game.description }}
            </p>
        </div>
    </div>
</template>