<template>
  <div class="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg select-none">
    <h1 class="text-3xl font-semibold text-center mb-8 text-blue-700">Thông tin hồ sơ</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Loại khách hàng -->
      <div>
        <label class="block text-lg font-medium mb-1">Loại khách hàng</label>
        <input
          type="text"
          :value="customtype"
          class="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>

      <!-- Tên -->
      <div>
        <label for="name" class="block text-lg font-medium mb-1">Tên người dùng</label>
        <input
          v-model="name"
          type="text"
          id="name"
          :readonly="!isEditing"
          :class="[
            'w-full p-3 border rounded-md',
            isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
          ]"
        />
      </div>

      <!-- Email (không chỉnh sửa) -->
      <div>
        <label for="email" class="block text-lg font-medium mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          readonly
          class="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      <!-- Số điện thoại -->
      <div>
        <label for="phone" class="block text-lg font-medium mb-1">Số điện thoại</label>
        <input
          v-model="phone"
          type="text"
          id="phone"
          :readonly="!isEditing"
          :class="[
            'w-full p-3 border rounded-md',
            isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
          ]"
        />
      </div>

      <!-- Địa chỉ -->
      <div>
        <label for="address" class="block text-lg font-medium mb-1">Địa chỉ</label>
        <input
          v-model="address"
          type="text"
          id="address"
          :readonly="!isEditing"
          :class="[
            'w-full p-3 border rounded-md',
            isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
          ]"
        />
      </div>

      <!-- Nút chỉnh sửa / lưu -->
      <div class="text-right">
        <button
          type="button"
          @click="toggleEdit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {{ isEditing ? 'Lưu' : 'Chỉnh sửa' }}
        </button>
      </div>
    </form>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const isEditing = ref(false)
const id = ref('')
const customtype = ref('')
const customerTypeId = ref('')
const name = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')

const loadProfile = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const response = await api.get('/customer/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = response.data
    id.value = data.id
    name.value = data.name
    email.value = data.email
    phone.value = data.phoneNumber
    address.value = data.address
    customtype.value = data.hasType
  } catch (error) {
    console.error('Lỗi khi tải thông tin hồ sơ:', error)
    alert('Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.')
  }
}

const toggleEdit = async () => {
  if (!isEditing.value) {
    isEditing.value = true
  } else {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      await axios.put(
        `http://localhost:5246/api/customer/${id.value}`,
        {
          name: name.value,
          address: address.value,
          phoneNumber: phone.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert('Cập nhật hồ sơ thành công!')
      isEditing.value = false
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error)
      alert('Cập nhật thất bại. Vui lòng thử lại.')
    }
  }
}

onMounted(loadProfile)
</script>

