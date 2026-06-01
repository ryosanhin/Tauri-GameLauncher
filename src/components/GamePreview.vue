<script setup lang="ts">
defineProps<{ imageUrl: string; title?: string }>();
</script>

<template>
    <div class="flex-1 bg-black flex items-center justify-center p-2">
        <div v-if="imageUrl" class="w-full h-full relative rounded-lg overflow-hidden">
            <img :src="imageUrl" :alt="title" class="absolute inset-0 w-full h-full object-contain bg-gray-900" />
        </div>
        
        <div v-else class="text-gray-600 text-2xl font-bold tracking-widest">
            NO IMAGE
        </div>
    </div>
</template>