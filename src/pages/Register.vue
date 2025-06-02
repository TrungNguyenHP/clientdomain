<template>
  <div class="select-none">
    <div class="w-full max-w-md bg-white rounded-xl p-10">
      <div class="text-center mb-6">
        <h2 class="text-4xl font-bold text-pink-600">Đăng ký</h2>
      </div>

      <form @submit.prevent="register" class="space-y-5">
        <input
          type="text"
          v-model="name"
          placeholder="Tên người dùng"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="text"
          v-model="phone"
          placeholder="Số điện thoại"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Mật khẩu"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
        <p v-if="passwordMismatch" class="text-red-500 text-sm">Mật khẩu không khớp</p>
        <input
          type="text"
          v-model="address"
          placeholder="Địa chỉ"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          type="submit"
          class="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
        >
          Đăng ký
        </button>
        <p class="text-center text-gray-600">
          Đã có tài khoản?
          <RouterLink to="/login" class="text-pink-500 hover:underline font-medium">Đăng nhập</RouterLink>
        </p>  
      </form>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const address = ref('')
const router = useRouter()

const passwordMismatch = computed(() => password.value !== confirmPassword.value)

async function register() {
  if (passwordMismatch.value) {
    alert('Mật khẩu không khớp!')
    return
  }

  try {
    const response = await api.post('/customer/register', {
      name: name.value,
      email: email.value,
      phoneNumber: phone.value,
      password: password.value,
      customerTypeId: 3,
      address: address.value
    })
    const { token, name: customerName } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('customerName', customerName)
    router.push('/')
  } catch (error: any) {
    alert(error.response?.data || 'Đăng ký thất bại. Vui lòng thử lại.')
    console.error('Lỗi đăng ký:', error)
  }
}
</script>
