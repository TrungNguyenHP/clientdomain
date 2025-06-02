<template>
  <div class="border p-6 rounded-lg hover:shadow-lg transition text-center">
    <h2 class="text-2xl font-bold text-blue-700 mb-2">.{{ domain.name }}</h2>
    <p class="text-3xl font-bold text-blue-500 mb-4">{{ formatVND(domain.price) }}/tháng</p>
    <router-link
      :to="`/registerdomain/${domain.name}`"
      class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Đăng ký ngay
    </router-link>
  </div>
</template>
  
<script setup lang="ts">
  defineProps<{
    domain: {
      name: string
      price: number
    }
  }>();
  const formatVND = (price: number) =>
  price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
</script>
  