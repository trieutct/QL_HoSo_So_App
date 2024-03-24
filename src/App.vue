<template>
  <router-view v-loading="loadingStore.isLoading" element-loading-text="Loading..." element-loading-background="rgba(122, 122, 122, 0.8)"/>
</template>
<script setup>
import { useLoadingStore } from './features/loading/store';
const loadingStore = useLoadingStore()
</script>
