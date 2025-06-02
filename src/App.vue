<script setup>
import { loadingStore } from '@/stores/loadingStore'
import Loading from '@/components/Loading.vue'

const loading = loadingStore()
</script>

<template>
  <router-view />
  <Loading v-if="loading.isLoading" />
</template>
