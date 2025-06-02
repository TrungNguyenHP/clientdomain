<template>
  <div class="select-none max-w-5xl mx-auto p-6 md:p-8">
    <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">
      Tin tức – Bản cập nhật mới nhất
    </h1>


    <p v-if="articles.length === 0" class="text-center text-gray-500">
      Hiện chưa có bài viết nào.
    </p>


    <div
      v-else
      class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="post in articles"
        :key="post.id"
        class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >

        <img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          :alt="post.title"
          class="h-40 w-full object-cover"
        />

        <div class="p-5 flex flex-col h-full">

          <h2 class="text-xl font-semibold mb-2 line-clamp-2">
            {{ post.title }}
          </h2>


          <p class="text-xs text-gray-500 mb-4">
            {{ formatDate(post.publishedAt) }}
          </p>

          <p class="text-gray-700 mb-4 line-clamp-3 flex-grow">
            {{ post.summary }}
          </p>

          <router-link
            :to="`/news/${post.id}`"
            class="text-blue-600 hover:underline mt-auto"
          >
            Đọc chi tiết →
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/plugins/axios'
import { ref, onMounted } from 'vue'

type Article = {
  id: number | string
  title: string
  content: string
  summary: string
  imageUrl: string | null
  publishedAt: string | Date
}

const articles = ref<Article[]>([])

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

onMounted(async () => {
  try {
    const response = await api.get('/new', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    articles.value = response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      summary: item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content,
      imageUrl: item.imageUrl,
      publishedAt: item.createdAt
    }))
  } catch (error) {
    console.error('Lỗi khi lấy tin tức:', error)
  }
})

</script>
