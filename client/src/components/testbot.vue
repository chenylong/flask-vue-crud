<template>
    <div class="h-screen flex overflow-hidden">
      <!-- Chat container -->
      <div class="relative z-10 w-full max-w-md mx-auto overflow-y-auto flex-1">
        <div class="p-4">
          <!-- Chat messages go here -->
        </div>
      </div>
      
      <!-- Chat input container -->
      <div class="bg-gray-800 px-4 py-2 flex items-center justify-between w-full">
        <input type="text" v-model="userMessage" @keyup.enter="sendUserMessage" class="w-full rounded-l-lg bg-transparent text-white placeholder-gray-400 outline-none" />
        <button @click="sendUserMessage" class="rounded-r-lg bg-blue-600 px-4 py-2 text-white">发送</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userMessage: '',
      };
    },
    methods: {
      async sendUserMessage() {
        const response = await fetch(`http://192.168.1.169:5001/chat/chat/${encodeURIComponent(this.userMessage)}`);
        const chatResponse = await response.json();
        this.userMessage = '';
        // Display the chat response in your UI
      },
    },
  };
  </script>