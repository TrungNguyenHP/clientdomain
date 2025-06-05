<template>
  <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg select-none">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-700">Danh sách dịch vụ domain đã đăng ký của bạn</h1>
    <div v-if="services.length === 0" class="text-center text-gray-500">
      <p>Không có dịch vụ nào được đăng ký.</p>
    </div>
    <div v-else>
      <div
        v-for="service in services"
        :key="service.id"
        class="mb-6 p-6 bg-gray-100 rounded-md shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-blue-700">{{ service.name }}</h2>
            <p class="text-gray-600">Thời gian thuê: {{ service.duration }} tháng</p>
            <p class="text-gray-600">Ngày đăng ký: {{ service.registrationDate }}</p>
          </div>
          <button @click="goToRenew(service)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Gia hạn</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useRouter } from 'vue-router'

const services = ref<any[]>([])
const router = useRouter()

function goToRenew(service: any) {
  router.push({
    name: 'Checkout',
    query: {
      domain: service.name,
      price: service.price.toString(),
      domainProductId: service.domainProductId.toString()
    }
  })
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

    const paidOrders = response.data.filter((order: any) => order.status === 'Paid')

    const domainMap = new Map<string, any>()

    paidOrders.forEach((order: any) => {
      const domainKey = `${order.domainFirstPart}.${order.domainProduct.domainName}`
      const existing = domainMap.get(domainKey)

      if (existing) {
        existing.duration += order.durationByMonth
      } else {
        domainMap.set(domainKey, {
          id: order.id,
          name: domainKey,
          duration: order.durationByMonth,
          registrationDate: new Date(order.createdAt).toLocaleDateString('vi-VN'),
          price: order.domainProduct.price,
          domainProductId: order.domainProduct.id
        })
      }
    })
    services.value = Array.from(domainMap.values())
  } catch (err) {
    console.error('Lỗi khi tải dịch vụ:', err)
    alert('Không thể tải danh sách dịch vụ đã đăng ký')
  }
})
</script>
