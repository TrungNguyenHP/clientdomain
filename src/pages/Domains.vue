<template>
  <section class="py-16 px-4 max-w-7xl mx-auto select-none">
    <h1 class="text-3xl font-bold text-blue-600 text-center mb-10">Bảng Giá Tên Miền</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <DomainCard
        v-for="d in domains"
        :key="d.id"
        :domain="{ name: d.domainName, price: d.price }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import DomainCard from '@/components/DomainCard.vue'

const domains = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/domain_product', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    domains.value = response.data
  } catch (err) {
    console.error('Lỗi tải domain:', err)
    alert('Không thể tải tên miền.')
  }
})
</script>
