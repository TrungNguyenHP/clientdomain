<template>
  <div class="max-w-6xl mx-auto px-4 py-16 select-none">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-10">Xác nhận Thanh Toán</h1>

    <div class="max-w-xl mx-auto p-6 rounded-lg shadow border space-y-6">
      <div>
        <p><strong class="text-blue-600 text-lg">Tên miền:</strong> {{ domain }}</p>
      </div>
      <div class="space-y-4">
        <p><strong class="text-blue-600 text-lg">Thời gian thuê:</strong></p>
        <input
          v-model.number="months"
          type="number"
          min="1"
          class="w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Thời gian thuê (tháng)"
        />
        <input
          v-model="discountCode"
          type="text"
          class="w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Mã giảm giá (nếu có)"
        />
        <select
          v-model="selectedPayment"
          class="w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option disabled value="">Chọn phương thức thanh toán</option>
          <option v-for="method in paymentMethods" :value="method.id">
            {{ method.paymentMethodName }}
          </option>
        </select>
      </div>
      <div >
        <strong class="text-blue-600 text-lg">Tổng giá:</strong> {{ formatVND(totalPrice) }}
      </div>

      <button
        @click="submitOrder"
        class="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
      >
        Tiến hành thanh toán
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'

const route = useRoute()
const router = useRouter()

const domain = (route.query.domain as string) || ''
const domainProductId = parseInt(route.query.domainProductId as string) || 0
const basePrice = parseInt(route.query.price as string) || 0

const months = ref(1)
const discountCode = ref('')
const selectedPayment = ref('')
const paymentMethods = ref<{ id: number; paymentMethodName: string }[]>([])

const totalPrice = computed(() => basePrice * months.value)
const formatVND = (n: number) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

onMounted(async () => {
  try {
    const response = await api.get('/payment_method', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    paymentMethods.value = response.data
  } catch (err) {
    alert('Không thể tải phương thức thanh toán')
  }
})

const submitOrder = async () => {
  const token = localStorage.getItem('token')
  if (!token) return alert('Bạn cần đăng nhập')
  if (!selectedPayment.value) return alert('Chọn phương thức thanh toán')
  if (months.value < 1) return alert('Thời gian thuê phải lớn hơn 0')
  try {
    await api.post('/order', {
      domainProductId,
      paymentMethodId: selectedPayment.value,
      DiscountCode: discountCode.value || null,
      durationByMonth: months.value,
      domainFirstPart: domain.split('.')[0]
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    router.push('/ordersuccess')
  } catch (err) {
    console.error('Lỗi tạo đơn:', err)
    alert('Tạo đơn hàng thất bại! Hãy thử lại.')
  }
}
</script>
