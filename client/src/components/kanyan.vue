<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-md py-3 px-4 flex items-center justify-between">
      <button class="text-gray-700 focus:outline-none focus:text-blue-600">
        <ArrowLeft size="24" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">智能助手</h1> <!-- 增大标题字体大小 -->
    </header>
    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto p-4" ref="chatContainer">
      <div v-for="(message, index) in messages" :key="index" 
           class="mb-4 flex" :class="{'justify-end': message.isUser}">
        <div class="max-w-[80%]" :class="{
          'bg-blue-500 text-white rounded-lg p-3': message.isUser,
          'bg-white shadow rounded-lg p-3 flex': !message.isUser
        }">
          <div v-if="!message.isUser" class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white mr-2">
            🤖
          </div>
          <div>
            <div v-if="message.type === 'options'" class="space-y-2">
              <p class="mb-2">{{ message.text }}</p>
              <div v-for="option in message.options" :key="option.value"
                   class="border rounded p-2 cursor-pointer hover:bg-gray-50"
                   @click="selectOption(option.value, message.questionId)">
                {{ option.label }}
              </div>
            </div>
            <div v-else>
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Input Area -->
    <div class="bg-white border-t p-4 flex items-center">
      <input v-model="userInput" 
             @keyup.enter="sendMessage"
             placeholder="请输入..."
             class="flex-1 border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500">
      <button @click="startVoiceInput" class="p-2 text-gray-600 hover:text-blue-500">
        <Mic size={24} />
      </button>
      <button @click="sendMessage" 
              class="bg-blue-500 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-600">
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ArrowLeft, Mic } from 'lucide-react'

const messages = ref([])
const userInput = ref('')
const chatContainer = ref(null)

// Simulated bot responses and questions
const questions = [
  {
    id: 1,
    text: '下面我们将通过问答结果生成勘验表和询问笔录：',
    type: 'options',
    options: [
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' }
    ]
  },
  {
    id: 2,
    text: '经营的物品是什么？',
    type: 'text'
  },
  {
    id: 3,
    text: '是否使用装载工具',
    type: 'options',
    options: [
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' }
    ]
  }
]

let currentQuestionIndex = 0

onMounted(() => {
  addBotMessage(questions[currentQuestionIndex])
})

function addBotMessage(question) {
  messages.value.push({
    isUser: false,
    questionId: question.id,
    text: question.text,
    type: question.type,
    options: question.options
  })
  scrollToBottom()
}

function sendMessage() {
  if (!userInput.value.trim()) return
  
  messages.value.push({
    isUser: true,
    text: userInput.value
  })
  
  userInput.value = ''
  currentQuestionIndex++
  
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      addBotMessage(questions[currentQuestionIndex])
    }, 500)
  }
  
  scrollToBottom()
}

function selectOption(value, questionId) {
  messages.value.push({
    isUser: true,
    text: value === 'yes' ? '是' : '否'
  })
  
  currentQuestionIndex++
  
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      addBotMessage(questions[currentQuestionIndex])
    }, 500)
  }
  
  scrollToBottom()
}

function startVoiceInput() {
  // Implement voice input logic here
  console.log('Voice input started')
}

async function scrollToBottom() {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}
</script>

<script>
export default {
  created() {
    console.log('Case ID:', this.$route.query.caseid);
  },
};
</script>