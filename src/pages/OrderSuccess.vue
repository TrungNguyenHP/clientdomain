<template>
  <div class="p-6 md:p-12 max-w-xl mx-auto text-center select-none bg-white rounded-xl shadow-lg mt-12">
    <!-- Icon chúc mừng -->
    <div class="text-5xl mb-4 text-green-500">🎉</div>

    <h1 class="text-3xl font-bold text-blue-700 mb-4">
      Cảm ơn bạn đã đặt hàng!
    </h1>

    <!-- Mail icon + nội dung -->
    <div class="flex items-center justify-center text-gray-700 mb-2">
      <MailIcon class="w-5 h-5 mr-2 text-blue-500" />
      <p>Thông tin đơn hàng đã được gửi đến email của bạn.</p>
    </div>

    <!-- Hóa đơn icon + nội dung -->
    <div class="flex items-center justify-center text-gray-700 mb-6">
      <ReceiptIcon class="w-5 h-5 mr-2 text-blue-500" />
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
