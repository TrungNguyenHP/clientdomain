<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg select-none">
    <h1 class="text-3xl font-bold mb-6 text-center text-red-600">Dịch vụ đã hủy</h1>

    <div v-if="services.length === 0" class="text-center text-gray-500">
      <p>Không có dịch vụ nào bị hủy.</p>
    </div>

    <div v-else>
      <div
        v-for="service in services"
        :key="service.id"
        class="mb-6 p-6 bg-gray-100 rounded-md shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-red-700">{{ service.name }}</h2>
            <p class="text-gray-600">Thời gian thuê: {{ service.duration }} tháng</p>
            <p class="text-gray-600">Phương thức thanh toán: {{ service.paymentMethod }}</p>
            <p class="text-gray-600 text-sm">Ngày đăng ký: {{ service.registrationDate }}</p>
            <p class="text-gray-600 text-sm">Tình trạng: {{ service.status }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-blue-700">{{ formatVND(service.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const services = ref<any[]>([])

const formatVND = (amount: number) =>
  amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('Vui lòng đăng nhập để xem dịch vụ')
    return
  }

  try {
    const response = await api.get('/order', {
      headers: { Authorization: `Bearer ${token}` }
    })

    services.value = response.data
      .filter((order: any) => order.status?.toLowerCase() === 'cancelled')
      .map((order: any) => ({
        id: order.id,
        name: `${order.domainFirstPart}.${order.domainProduct.domainName}`,
        duration: order.durationByMonth,
        paymentMethod: order.paymentMethod?.paymentMethodName || 'Không rõ',
        price: order.totalPrice,
        registrationDate: new Date(order.createdAt).toLocaleString('vi-VN',),
        status: order.status
      }))
  } catch (err) {
    console.error('Lỗi khi tải dịch vụ:', err)
    alert('Không thể tải danh sách dịch vụ đã hủy')
  }
})
</script>
