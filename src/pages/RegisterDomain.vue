<template>
  <div class="p-8 max-w-lg mx-auto select-none">
    <h1 class="text-2xl font-semibold mb-6 text-blue-700">Đăng ký đuôi .{{ domainName }}</h1>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <label for="domain" class="text-lg font-medium mb-1">Nhập tên miền bạn muốn đăng ký với đuôi trên</label>
      <input
        v-model="keyword"
        id="domain"
        type="text"
        placeholder="Ví dụ: yourbrand"
        class="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
      >
        Đăng ký
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
const route = useRoute()
const router = useRouter()
const domainName = route.params.domain as string
const keyword = ref('')
const price = ref(0)
const productId = ref<number | null>(null)
onMounted(async () => {
  try {
    const response = await api.get('/domain_product', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const item = response.data.find((d: any) => d.domainName === domainName)
    if (item) {
      price.value = item.price
      productId.value = item.id
    }
  } catch (err) {
    alert('Không thể tải thông tin tên miền')
  }
})

const submit = () => {
  if (!keyword.value || !price.value || !productId.value) return alert('Vui lòng nhập tên miền.')
  const fullDomain = `${keyword.value}.${domainName.replace(/^\./, '')}`
  router.push({ name: 'Checkout', query: { domain: fullDomain, price: price.value.toString(),domainProductId: productId.value.toString() } })
}
</script>
