<template>
  <div class="select-none">
    <div class="w-full max-w-md bg-white rounded-xl p-10">
      <div class="text-center mb-6">
        <h1 class="text-4xl font-bold text-green-600">Khôi phục mật khẩu</h1>
        <p class="text-sm text-gray-500 mt-1">Nhập email để nhận hướng dẫn đặt lại mật khẩu</p>
      </div>

      <form @submit.prevent="submitEmail" class="space-y-5">
        <input
          type="email"
          v-model="email"
          placeholder="Email của bạn"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Gửi
        </button>
        <p class="text-center text-sm text-gray-600">
        <RouterLink to="/login" class="text-green-500 hover:underline font-medium">Quay lại đăng nhập</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/plugins/axios'
const email = ref('')

const submitEmail = async () => {
  if (!email.value) {
    alert('Vui lòng nhập email.')
    return
  }

  try {
    const response = await api.post('/customer/forgot_password', {
      email: email.value
    })
    alert(response.data || 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.')
    email.value = ''
  } catch (error: any) {
    alert(error.response?.data || 'Không thể gửi email. Vui lòng thử lại sau.')
  }
}
</script>
