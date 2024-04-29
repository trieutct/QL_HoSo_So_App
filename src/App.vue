<template>
  <router-view
    v-loading="loadingStore.isLoading"
    element-loading-text="Loading..."
    element-loading-zIndex="9999999"
  />
</template>
<script setup>
import { useLoadingStore } from "./features/loading/store";
const loadingStore = useLoadingStore();
</script>
