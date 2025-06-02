<template>
  <div class="select-none">
    <!-- Hero Banner -->
    <section class="bg-blue-700 text-white text-center py-20 bg-[url('https://www.transparenttextures.com/patterns/white-wall-3.png')] bg-cover bg-blend-overlay">
      <div class="max-w-6xl mx-auto px-4">
        <h1 class="text-5xl font-bold mb-4 flex items-center justify-center gap-2">
          🌐 Sở hữu Domain đẹp chỉ trong vài phút!
        </h1>
        <p class="text-xl mb-6">Giá cạnh tranh, hỗ trợ tận tâm, đăng ký siêu tốc</p>

        <!-- Search domain -->
        <div class="max-w-2xl mx-auto flex gap-2 mt-8">
          <input
            v-model="searchDomain"
            type="text"
            placeholder="Nhập tên domain (ví dụ: yourbrand.com)"
            class="flex-1 p-3 rounded-l border-2 border-white focus:outline-none text-black"
          />
          <button @click="checkDomain" class="bg-white text-blue-600 px-6 rounded-r font-semibold hover:bg-gray-100">
            Kiểm tra
          </button>
        </div>
        <p v-if="searchResult" class="mt-4 text-lg">{{ searchResult }}</p>
      </div>
    </section>

    <!-- Các bước đăng ký -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-blue-600 mb-10">Đăng ký domain trong 3 bước</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <div class="text-5xl text-blue-600 mb-4">🔍</div>
            <h3 class="font-semibold text-xl mb-2">Tìm kiếm domain</h3>
            <p class="text-gray-600">Nhập tên bạn muốn và kiểm tra khả dụng.</p>
          </div>
          <div>
            <div class="text-5xl text-blue-600 mb-4">🛒</div>
            <h3 class="font-semibold text-xl mb-2">Chọn và đăng ký tên miền</h3>
            <p class="text-gray-600">Chọn gói phù hợp và tiến hành thanh toán.</p>
          </div>
          <div>
            <div class="text-5xl text-blue-600 mb-4">✅</div>
            <h3 class="font-semibold text-xl mb-2">Hoàn tất đăng ký</h3>
            <p class="text-gray-600">Domain thuộc quyền sở hữu của bạn ngay lập tức.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vì sao chọn chúng tôi -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-blue-600 mb-10">Vì sao nên chọn DomainStore?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <div class="text-5xl mb-4">⚡</div>
            <h3 class="font-bold text-xl mb-2">Đăng ký siêu tốc</h3>
            <p class="text-gray-600">Chỉ mất vài phút để hoàn tất domain của bạn.</p>
          </div>
          <div>
            <div class="text-5xl mb-4">💰</div>
            <h3 class="font-bold text-xl mb-2">Giá cả cạnh tranh</h3>
            <p class="text-gray-600">Cam kết mức giá tốt nhất cho khách hàng.</p>
          </div>
          <div>
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="font-bold text-xl mb-2">Hỗ trợ tận tâm</h3>
            <p class="text-gray-600">Đội ngũ kỹ thuật luôn bên bạn 24/7.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gói nổi bật -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-blue-600 mb-10">Gói Domain nổi bật</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="border p-6 rounded-lg hover:shadow-lg transition">
            <h3 class="text-2xl font-bold mb-2">.com</h3>
            <span class="inline-block bg-yellow-400 text-xs font-semibold px-2 py-1 rounded-full mb-3">Bán chạy</span>
            <p class="text-3xl font-bold text-blue-500 mb-4">290.000₫/tháng</p>
            <router-link to="/domains" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Đăng ký ngay</router-link>
          </div>
          <div class="border p-6 rounded-lg hover:shadow-lg transition">
            <h3 class="text-2xl font-bold mb-2">.net</h3>
            <span class="inline-block bg-green-400 text-xs font-semibold px-2 py-1 rounded-full mb-3">Phổ biến</span>
            <p class="text-3xl font-bold text-blue-500 mb-4">320.000₫/tháng</p>
            <router-link to="/domains" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Đăng ký ngay</router-link>
          </div>
          <div class="border p-6 rounded-lg hover:shadow-lg transition">
            <h3 class="text-2xl font-bold mb-2">.vn</h3>
            <span class="inline-block bg-red-400 text-xs font-semibold px-2 py-1 rounded-full mb-3">Ưu đãi</span>
            <p class="text-3xl font-bold text-blue-500 mb-4">850.000₫/tháng</p>
            <router-link to="/domains" class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Đăng ký ngay</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Khách hàng -->
    <section class="py-16 bg-gray-100">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-blue-600 mb-10">Khách hàng nói gì về chúng tôi</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png" alt="Customer 1" class="mx-auto rounded-full w-24 h-24 object-cover mb-4" />
            <p class="text-gray-600 italic mb-4">
              "Dịch vụ đăng ký domain tại DomainStore rất nhanh chóng và dễ dàng"
            </p>
            <h4 class="font-bold text-blue-500">Phạm Trung Hiếu</h4>
            <span class="text-sm text-gray-500">Giám đốc Marketing</span>
          </div>

          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png" alt="Customer 2" class="mx-auto rounded-full w-24 h-24 object-cover mb-4" />
            <p class="text-gray-600 italic mb-4">
              "Giá domain ở đây cực kỳ hợp lý"
            </p>
            <h4 class="font-bold text-blue-500">Vũ Quý Nghĩa</h4>
            <span class="text-sm text-gray-500">Chủ shop online</span>
          </div>

          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png" alt="Customer 3" class="mx-auto rounded-full w-24 h-24 object-cover mb-4" />
            <p class="text-gray-600 italic mb-4">
              "Website chuyên nghiệp, thao tác đơn giản, mọi thứ rất dễ tìm kiếm"
            </p>
            <h4 class="font-bold text-blue-500">Trần Trọng Nghĩa</h4>
            <span class="text-sm text-gray-500">Freelancer thiết kế web</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA cuối trang -->
    <section class="py-16 bg-blue-600 text-white">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Sẵn sàng sở hữu Domain riêng?</h2>
        <p class="text-lg mb-6">Nhanh tay đăng ký trước khi ai đó mua mất tên bạn yêu thích!</p>
        <router-link to="/domains" class="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100">
          Đăng ký ngay
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const searchDomain = ref('')
const searchResult = ref('')

async function checkDomain() {
  const domain = searchDomain.value.trim()

  if (!domain) {
    searchResult.value = 'Vui lòng nhập tên domain!'
    return
  }

  if (!domain.includes('.')) {
    searchResult.value = 'Vui lòng nhập đầy đủ tên domain, ví dụ: youtube.com'
    return
  }

  try {
    const response = await axios.get('http://localhost:5246/api/registered_domain', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const registeredDomains = response.data
    const isRegistered = registeredDomains.some((item: any) =>
      item.fullDomainName?.toLowerCase() === domain.toLowerCase()
    )

    if (isRegistered) {
      searchResult.value = `❌ Domain "${domain}" đã được đăng ký.`
    } else {
      searchResult.value = `✅ Domain "${domain}" hiện đang có sẵn!`
    }

  } catch (error) {
    console.error('Lỗi kiểm tra domain:', error)
    searchResult.value = 'Có lỗi xảy ra khi kiểm tra domain. Vui lòng thử lại sau.'
  }
}

 
</script>
