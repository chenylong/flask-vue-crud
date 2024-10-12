<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
    <!-- 顶部标题栏 -->
    <header class="bg-gray-800 px-4 py-3 flex items-center justify-between mb-4">
      <div class="flex items-center">
        <ArrowLeft class="w-6 h-6 text-gray-400" />
        <h1 class="text-xl font-bold text-blue-400 ml-3">勘验bot</h1>
      </div>
      <div class="flex items-center space-x-4">
        <Home class="w-5 h-5 text-gray-400" />
        <MoreHorizontal class="w-5 h-5 text-gray-400" />
      </div>
    </header>
    
    <!-- 聊天区域 -->
    <div class="flex-1 overflow-hidden p-4">
      <div 
        ref="chatBoxRef" 
        class="h-full overflow-y-auto space-y-4"
      >
        <div v-for="(msg, index) in messages" 
             :key="index" 
             class="flex items-start space-x-2"
             :class="msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''"
        >
          <!-- 头像 -->
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            :class="msg.type === 'user' ? 'bg-blue-500' : 'bg-gray-700'"
          >
            {{ msg.type === 'user' ? '👤' : '🤖' }}
          </div>
          
          <!-- 消息内容 -->
          <div 
            class="max-w-[75%] rounded-lg px-4 py-2 text-sm"
            :class="msg.type === 'user' ? 'bg-blue-600' : 'bg-gray-800 border border-gray-700'"
          >
            <p>{{ msg.content }}</p>
            <span class="text-xs text-gray-400 mt-1 block">
              {{ msg.time }}
            </span>
          </div>
        </div>
        <div v-if="isLoading" class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            🤖
          </div>
          <div class="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
      <div class="flex items-center space-x-2">
        <button class="text-gray-400">
          <Upload class="w-6 h-6" />
        </button>
        <input 
          v-model="userInput" 
          @keyup.enter="sendMessage"
          type="text"
          placeholder="请输入您的问题..."
          class="flex-1 bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-gray-100 focus:outline-none focus:border-blue-500 placeholder-gray-400"
        >
        <button 
          v-if="!userInput.trim()"
          class="text-gray-400"
        >
          <Phone class="w-6 h-6" />
        </button>
        <button 
          v-else
          @click="sendMessage"
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200 focus:outline-none"
        >发送
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.message {
  white-space: pre-wrap; /* 保持换行 */
  word-wrap: break-word; /* 自动换行 */
  max-width: 80%; /* 最大宽度限制 */
  padding: 10px;
  border-radius: 8px;
}
</style>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { ArrowLeft, Home, Upload, Phone, MoreHorizontal } from 'lucide-vue-next'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'

var sessionID = uuidv4();
var flag = 1
const userInput = ref('')
const messages = ref([])
const isLoading = ref(false)
const chatBoxRef = ref(null)
const route = useRoute()
const caseid =  route.query.caseid 
 

const getCurrentTime = () => {
  return new Date().toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const addBotMessage = (content) => {
  messages.value.push({
    content,
    type: 'bot',
    time: getCurrentTime()
  })
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  // 添加用户消息
  messages.value.push({
    content: userInput.value,
    type: 'user',
    time: getCurrentTime()
  })
  
  const userMessage = userInput.value
  const botMessage = messages.value.slice(-2)[0]
  userInput.value = ''
  isLoading.value = true
  
  await scrollToBottom()

  
  try {
    // 调用后台接口
    // 本次会话，生成唯一标识uuid
    //const response = await axios.get(`http://192.168.1.169:5001/chat/chat/${encodeURIComponent(userMessage)}`)

    //判断是不是第一次调用，第一次调用要把案件信息，赋值到input
    if (flag == 1) {
      //const caseinfo = "案件信息：" + caseinfostr + "用户输入：" + userMessage
      const question = "是否开始"

      const response = await axios.post('http://192.168.1.169:5001/morechat/chat', { caseinfo:caseinfostr, input: userMessage, sessionID: sessionID, flag: flag,question:question,caseid:caseid })
      //const botResponse = response.data.response;

      let content = response.data.data
      let c_status = response.data.status

      if (c_status === 'success') {
        // 执行成功时的操作
        console.log('接口反馈成功');
        //addBotMessage(content)
        // 添加机器人消息到消息列表
        addBotMessage(content);
        flag = flag + 1
        // 日志打印
        console.log('User Input flag :', flag)
      }
      else {
        // 执行失败时的操作
        console.log('接口反馈失败');
        addBotMessage('抱歉，发生了一些错误，请稍后再试。')
      }


    }
    else {
      const question = botMessage.content
      const response = await axios.post('http://192.168.1.169:5001/morechat/chat', { input: userMessage, sessionID: sessionID, flag: flag,question:question,caseid:caseid})

      let content = response.data.data
      let c_status = response.data.status

      if (c_status === 'success') {
        // 执行成功时的操作
        console.log('接口反馈成功');
        //addBotMessage(content)
        // 添加机器人消息到消息列表
        addBotMessage(content);
        flag = flag + 1
        // 日志打印
        console.log('User Input flag :', flag)
      }
      else {
        // 执行失败时的操作
        console.log('接口反馈失败');
        addBotMessage('抱歉，发生了一些错误，请稍后再试。')
      }
    }


  } catch (error) {
    console.error('Error:', error)
    addBotMessage('抱歉，发生了一些错误，请稍后再试。')
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

const  caseinfostr = `
    检查部门：台州综合执法局;
    记录人：刘云;
    检查人员1：刘云;
    执法证号1：1232344324;
    检查人员2：刘明;
    执法证号2：11212232344324;
    立案时间：2024年9月16日10时;
    勘验开始时间：2024年9月16日14时；
    勘验地点：台州市椒江区白云街道1223号新城广场东侧；
    当事人姓名：王峰也，联系电话：1234234008611，身份证号：52013141241212343；
  `

onMounted(() => {
  addBotMessage("hi，我是您的现场勘验助手，让我们开始吧！首先您需要确认以下案件基本信息是否正确。")
  addBotMessage("/n")
  addBotMessage(caseinfostr)
})
</script>