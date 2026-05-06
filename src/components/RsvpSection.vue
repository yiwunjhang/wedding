<template>
  <section id="rsvp" class="py-24 overflow-hidden" style="background-color: #F5EFE6">
    <div class="max-w-2xl mx-auto px-6">
      <!-- Header -->
      <div data-aos="fade-up">
        <h2 class="section-title font-serif">出席回覆</h2>
        <p class="section-subtitle">RSVP</p>
        <div class="flex items-center justify-center gap-3 mb-6">
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
          <span style="color:#D4B87A">✦</span>
          <span class="block h-px w-16 opacity-40" style="background:#D4B87A"></span>
        </div>
        <p class="text-center text-gray-500 text-sm mb-12 leading-relaxed">
          請於 2027 年 3 月 13 日前回覆，<br>以便我們提前準備，感謝您的配合。
        </p>
      </div>

      <!-- Form card -->
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        class="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-pink-50"
      >
        <!-- Success state -->
        <div v-if="submitted" class="text-center py-8">
          <div class="flex justify-center mb-6">
            <EnvelopeIcon class="w-16 h-16" style="color:#B1C97A" />
          </div>
          <h3 class="font-serif text-2xl mb-3" style="color:#B1C97A">感謝您的回覆！</h3>
          <p class="text-gray-500 text-sm leading-relaxed">
            我們已收到您的出席回覆，<br>期待與您共享這份喜悅。
          </p>
          <button @click="reset" class="btn-outline mt-8 text-sm">再次填寫</button>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" novalidate>
          <!-- Name -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">
              姓名 <span style="color:#B1C97A">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="請輸入您的姓名"
              class="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all text-sm"
              :class="errors.name
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-200 focus:ring-pink-100 focus:border-pink-300'"
            />
            <p v-if="errors.name" class="text-xs text-red-400 mt-1">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">
              電子信箱 <span style="color:#B1C97A">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="your@email.com"
              class="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all text-sm"
              :class="errors.email
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-200 focus:ring-pink-100 focus:border-pink-300'"
            />
            <p v-if="errors.email" class="text-xs text-red-400 mt-1">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">聯絡電話</label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="09xx-xxxxxx"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm"
            />
          </div>

          <!-- Attendance -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-3">
              出席意願 <span style="color:#B1C97A">*</span>
            </label>
            <div class="flex gap-4">
              <label
                v-for="opt in attendanceOptions"
                :key="opt.value"
                class="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-medium"
                :class="form.attendance === opt.value
                  ? 'border-pink-wedding text-white'
                  : 'border-gray-200 text-gray-500 hover:border-pink-200'"
                :style="form.attendance === opt.value ? 'background: #6E8F3C; border-color: transparent' : ''"
              >
                <input type="radio" v-model="form.attendance" :value="opt.value" class="hidden" />
                <component :is="opt.icon" class="w-4 h-4" />
                {{ opt.label }}
              </label>
            </div>
            <p v-if="errors.attendance" class="text-xs text-red-400 mt-1">{{ errors.attendance }}</p>
          </div>

          <!-- Guests -->
          <div v-if="form.attendance === 'yes'" class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-2">出席人數</label>
            <select
              v-model="form.guests"
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm bg-white"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }} 位</option>
            </select>
          </div>

          <!-- Dietary -->
          <div v-if="form.attendance === 'yes'" class="mb-6">
            <label class="block text-sm font-medium text-gray-600 mb-3">飲食需求</label>
            <div class="flex flex-wrap gap-3">
              <label
                v-for="d in dietaryOptions"
                :key="d.value"
                class="flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer text-sm transition-all"
                :class="form.dietary.includes(d.value)
                  ? 'border-transparent text-white'
                  : 'border-gray-200 text-gray-500 hover:border-gold-wedding'"
                :style="form.dietary.includes(d.value) ? 'background: #6E8F3C' : ''"
              >
                <input type="checkbox" :value="d.value" v-model="form.dietary" class="hidden" />
                <component :is="d.icon" class="w-4 h-4" />
                {{ d.label }}
              </label>
            </div>
          </div>

          <!-- Message -->
          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-600 mb-2">祝福留言</label>
            <textarea
              v-model="form.message"
              rows="3"
              placeholder="寫下您對新人的祝福..."
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-sm resize-none"
            ></textarea>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-4 rounded-2xl text-white font-medium text-base transition-all duration-300 flex items-center justify-center gap-2"
            :style="loading
              ? 'background: #ccc; cursor: not-allowed'
              : 'background: #6E8F3C; box-shadow: 0 4px 15px rgba(110,143,60,0.35)'"
          >
            <ArrowPathIcon v-if="loading" class="animate-spin w-5 h-5" />
            <EnvelopeIcon v-else class="w-5 h-5" />
            <span>{{ loading ? '送出中...' : '送出回覆' }}</span>
          </button>

          <p v-if="errorMsg" class="text-center text-red-400 text-sm mt-4">{{ errorMsg }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'
import {
  EnvelopeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon,
  FireIcon,
  HeartIcon,
  StarIcon,
  MinusCircleIcon,
} from '@heroicons/vue/24/outline'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const submitted = ref(false)
const loading   = ref(false)
const errorMsg  = ref('')

const form = reactive({
  name:       '',
  email:      '',
  phone:      '',
  attendance: '',
  guests:     1,
  dietary:    [],
  message:    '',
})

const errors = reactive({
  name:       '',
  email:      '',
  attendance: '',
})

const attendanceOptions = [
  { value: 'yes', label: '出席', icon: CheckCircleIcon },
  { value: 'no',  label: '婉謝', icon: XCircleIcon },
]

const dietaryOptions = [
  { value: 'vegetarian', label: '素食',     icon: SparklesIcon },
  { value: 'vegan',      label: '全素',     icon: HeartIcon },
  { value: 'gluten',     label: '無麩質',   icon: FireIcon },
  { value: 'halal',      label: '清真',     icon: StarIcon },
  { value: 'none',       label: '無特殊需求', icon: MinusCircleIcon },
]

function validate() {
  errors.name = errors.email = errors.attendance = ''
  let ok = true
  if (!form.name.trim()) { errors.name = '請輸入姓名'; ok = false }
  if (!form.email.trim()) { errors.email = '請輸入電子信箱'; ok = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = '請輸入有效的電子信箱'; ok = false }
  if (!form.attendance) { errors.attendance = '請選擇出席意願'; ok = false }
  return ok
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  errorMsg.value = ''

  const templateParams = {
    from_name:  form.name,
    from_email: form.email,
    phone:      form.phone || '未填寫',
    attendance: form.attendance === 'yes' ? '出席' : '婉謝',
    guests:     form.attendance === 'yes' ? form.guests : 0,
    dietary:    form.dietary.length ? form.dietary.join('、') : '無特殊需求',
    message:    form.message || '（無留言）',
  }

  try {
    if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    }
    submitted.value = true
  } catch (err) {
    console.error(err)
    errorMsg.value = '送出失敗，請稍後再試或直接聯繫我們。'
  } finally {
    loading.value = false
  }
}

function reset() {
  submitted.value = false
  Object.assign(form, { name: '', email: '', phone: '', attendance: '', guests: 1, dietary: [], message: '' })
}
</script>
