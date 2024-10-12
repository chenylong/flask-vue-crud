<template>
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-500 text-white p-4 flex items-center">
        <ArrowLeft class="mr-2" />
        <Home class="mr-2" />
        <h1 class="text-lg font-semibold">调查取证</h1>
      </header>
  
      <main class="p-4">
        <div class="bg-white rounded-lg shadow p-4 mb-4">
          <div class="flex items-center mb-2">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2">
              张三
            </div>
            <div>
              <p class="font-semibold">办案人员：张三</p>
              <p class="text-sm text-gray-500">王五/xx综合行政执法大队-xx中队</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">对室外摊贩无照经营行政处罚</p>
        </div>
  
        <div class="grid grid-cols-4 gap-4 mb-4">
          <button
            v-for="action in actions"
            :key="action.label"
            class="flex flex-col items-center justify-center bg-white rounded-lg shadow p-2"
          >
            <component :is="action.icon" class="mb-1" />
            <span class="text-xs">{{ action.label }}</span>
          </button>
        </div>
  
        <div class="bg-white rounded-lg shadow p-4 mb-4">
          <h2 class="font-semibold mb-2">立案</h2>
          <div class="flex items-center">
            <Upload class="mr-2 text-red-500" />
            <div>
              <p class="font-semibold">{{ caseName }}</p>
              <p class="text-xs text-gray-500">{{ caseDate }}</p>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-lg shadow p-4 mb-4">
          <h2 class="font-semibold mb-2">调查取证</h2>
          <div class="flex items-center">
            <Upload class="mr-2 text-blue-500" />
            <div>
              <p class="font-semibold">现场勘查</p>
              <!-- <p class="text-xs text-blue-500"> {{ verificationStatus }}</p> -->
               <!-- 使用 router-link 组件来创建链接 -->
                <router-link :to="{ path: '/kanyan', query: { caseid: caseId }}" class="text-xs text-blue-500">
                {{ verificationStatus }}
                </router-link>
                <span> &nbsp;&nbsp;</span>
                <router-link :to="{ path: '/Kanyanjilu', query: { caseid: caseId }}" class="text-xs text-blue-500">
                {{ kanyanresult }}
                </router-link>
            
            </div>
          </div>
        </div>
      </main>
  
      <footer class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          @click="handleNextStep"
          class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
        >
          下一步骤
        </button>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ArrowLeft, Home, Upload, Phone, MoreHorizontal } from 'lucide-vue-next'
  
  const caseName = ref('立案审批表')
  const caseDate = ref('创建时间：2022/12/11 09:41')
  const verificationStatus = ref('在线制作')
  const kanyanresult = ref('查看结果')
  const caseId = ref('12345678'); // 示例 caseId
  
  const actions = [
    { icon: Upload, label: '文书制作' },
    { icon: Upload, label: '附件上传' },
    { icon: Phone, label: '电话' },
    { icon: MoreHorizontal, label: '更多选项' }
  ]
  
  const handleNextStep = () => {
    console.log('Next step clicked')
  }
  </script>