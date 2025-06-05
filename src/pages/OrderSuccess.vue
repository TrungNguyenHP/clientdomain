<template>
  <div class="p-6 md:p-12 max-w-xl mx-auto text-center select-none bg-white rounded-xl shadow-lg mt-12">
    <div class="text-5xl mb-4">🎉</div>
    <h1 class="text-3xl font-bold text-blue-700 mb-4">
      Cảm ơn bạn đã đặt hàng!
    </h1>
    <div class="text-gray-700 mb-4">
      <p>Thông tin đơn hàng đã được gửi đến email của bạn.</p>
      <p>Vui lòng thanh toán hóa đơn để kích hoạt dịch vụ.</p>
    </div>
    <RouterLink to="/profile/userservices" class="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
      Xem đơn đặt hàng
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
