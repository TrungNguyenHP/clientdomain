
<template>
  <div class="select-none" >
    <div class="w-full max-w-md bg-white rounded-xl p-10">
      <div class="text-center mb-6">
        <h1 class="text-4xl font-extrabold text-blue-600">DomainStore</h1>
        <p class="text-sm text-gray-500 mt-1">Đăng nhập để đăng ký và quản lý dịch vụ domain của bạn</p>
      </div>
    <form @submit.prevent="login" class="space-y-5">
      <input
        type="email"
        v-model="email"
        placeholder="Email đăng nhập"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Mật khẩu"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        Đăng nhập
      </button>
      <p class="text-center">
          <RouterLink to="/forgot-password" class="text-blue-500 hover:underline font-medium">Quên mật khẩu</RouterLink>
      </p>
      <p class="text-center text-gray-600">
        Chưa có tài khoản?
        <RouterLink to="/register" class="text-blue-500 hover:underline font-medium">Đăng ký ngay</RouterLink>
      </p>
    </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref  } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login() {
  try {
    const response = await api.post('/customer/login', {
    email: email.value,
    password: password.value
  })
    const { token, name: customerName} = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('customerName', customerName)

    router.push('/')
  } catch (error: any) {
    alert(error.response?.data || 'Đăng nhập thất bại.')
    console.error('Lỗi đăng nhập:', error)
  }
}
</script>

