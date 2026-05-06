<template>
  <section id="rsvp" class="py-24 overflow-hidden bg-hero-pattern" style="background-color: #FDFAF4">
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

      <!-- Google Form -->
      <div data-aos="fade-up" data-aos-delay="200"
        class="bg-white rounded-3xl shadow-xl overflow-hidden border border-pink-50">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeuLwkJ6mtE6z8oPNwotobxcmqq-GUOFHbDHzxEq7ABqolbeA/viewform?embedded=true"
          width="100%" height="1200" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"
          style="display:block; overflow:hidden">
          載入中…
        </iframe>
      </div>
    </div>
  </section>
</template>
