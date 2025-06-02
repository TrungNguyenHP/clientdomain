<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg select-none">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">Dịch vụ đang chờ thanh toán</h1>

    <div v-if="services.length === 0" class="text-center text-gray-500">
      <p>Chưa có dịch vụ nào được đăng ký.</p>
    </div>

    <div v-else>
      <div
        v-for="service in services"
        :key="service.id"
        class="mb-6 p-6 bg-gray-100 rounded-md shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold">{{ service.name }}</h2>
            <p class="text-gray-600">Thời gian thuê: {{ service.duration }} tháng</p>
            <p class="text-gray-600">Phương thức thanh toán: {{ service.paymentMethod }}</p>
            <p class="text-gray-600 text-sm">Ngày đăng ký: {{ service.registrationDate }}</p>
            <p class="text-gray-600 text-sm">Tình trạng: {{ service.status }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-blue-700">{{ formatVND(service.price) }}</p>
            <button
            v-if="service.status.toLowerCase() === 'pending'"
            @click="updateStatus(service.id, 'Cancelled')" 
            class="mt-2 px-4 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
        >
          Huỷ đơn hàng
        </button>
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

const updateStatus = async (orderId: number, newStatus: string) => {
  const confirmCancel = confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')
  if (!confirmCancel) return

  const token = localStorage.getItem('token')
  if (!token) {
    alert('Vui lòng đăng nhập')
    return
  }
  try {
    await api.put(`/order/${orderId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const idx = services.value.findIndex(s => s.id === orderId)
    if (idx !== -1) services.value[idx].status = newStatus
    services.value = services.value.filter(s => s.status.toLowerCase() === 'pending')
  } catch (err) {
    console.error('Lỗi cập nhật trạng thái:', err)
    alert('Không thể cập nhật trạng thái đơn hàng')
  }
}
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
    .filter((order: any) => order.status?.toLowerCase() === 'pending')
    .map((order: any) => ({
    id: order.id,
    name: `${order.domainFirstPart}.${order.domainProduct.domainName}`,
    duration: order.durationByMonth,
    paymentMethod: order.paymentMethod?.paymentMethodName || 'Không rõ',
    price: order.totalPrice,
    createdAt: new Date(order.createdAt),   
    registrationDate: new Date(order.createdAt).toLocaleDateString('vi-VN',),
    status: order.status
  }))
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (err) {
    console.error('Lỗi khi tải dịch vụ:', err)
    alert('Không thể tải danh sách dịch vụ đã đăng ký')
  }
})
</script>
