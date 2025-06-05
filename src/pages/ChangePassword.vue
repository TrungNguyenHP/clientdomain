<template>
  <div class="max-w-xl mx-auto p-4 shadow-lg rounded-lg select-none">
      <div class="text-center mb-6">
        <h1 class="text-4xl font-bold text-blue-600">Đổi mật khẩu</h1>
      </div>
      <form @submit.prevent="changePassword" class="space-y-5">
        <input
          type="password"
          v-model="oldPassword"
          placeholder="Nhập mật khẩu cũ"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          v-model="newPassword"
          placeholder="Mật khẩu mới"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Nhập lại mật khẩu mới"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          Cập nhật mật khẩu
        </button>
      </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/plugins/axios'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('Mật khẩu mới và xác nhận không khớp.')
    return
  }

  try {
    const response = await api.put(
      '/customer/change_password',
      {
        currentPassword: oldPassword.value,
        newPassword: newPassword.value
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    alert(response.data || 'Đổi mật khẩu thành công!')
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error: any) {
    alert(error.response?.data || 'Đổi mật khẩu thất bại. Vui lòng thử lại.')
  }
}
</script>
