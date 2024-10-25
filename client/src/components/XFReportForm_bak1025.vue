<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-xl font-semibold text-center">消火栓图片分析</h1>
    </header>

    <main class="container mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">现场消火栓照片</h2>
        <el-upload class="uploader" action="http://192.168.1.169:5001/imagechat/imageupload" :show-file-list="false"
          :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="w-44 h-44 object-cover rounded" alt="Uploaded image" />
          <div v-else class="w-44 h-44 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <el-icon class="text-gray-400 text-3xl">
              <Plus />
            </el-icon>
          </div>
        </el-upload>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">图片分析结果</h2>
        <div v-if="analysisResult" v-html="analysisResult" class="text-gray-700"></div>
        <el-skeleton v-else :rows="3" animated />
      </div>
 
 </main>

    <el-dialog v-model="dialogVisible" title="错误" width="80%" class="text-center">
      <span class="text-red-500">{{ errorMessage }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" class="bg-blue-500 text-white px-4 py-2 rounded">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router';

   //使用rote 获取caseid
   const router = useRouter()

  const imageUrl = ref('')
  const analysisResult = ref('请上传图片')
  const dialogVisible = ref(false)
  const errorMessage = ref('')
  var image_id = ref('')

  const handleUploadSuccess = (response, file) => {
    imageUrl.value = URL.createObjectURL(file.raw)
    ElMessage.success('图片上传成功')
    analyzeImage(response.imageId)
  }
  
  const handleUploadError = () => {
    errorMessage.value = '图片上传失败，请重试'
    dialogVisible.value = true
  }
  
  const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
  }

  return isImage && isLt5M
}
  const analyzeImage = async (imageId) => {
    try {
      const response = await fetch(`http://192.168.1.169:5001/imagechat/imagexhsanalysis?imageId=${imageId}`)
      if (!response.ok) {
        throw new Error('图片分析失败')
      }
      const data = await response.json()
      analysisResult.value = formatAnalysisResult(data)
      image_id = imageId

    } catch (error) {
      errorMessage.value = error.message
      dialogVisible.value = true
    }
  }
  

  const formatAnalysisResult = (data) => {
    // 这里可以根据实际的分析结果格式来调整

     return `
     <p><strong>分析结果:</strong> ${data.analysis_contet} </p>
     `;
  }



  const navigateToItem = (item) => {
      // 打印后台 ${encodeURIComponent(item)}
      console.log(`caseid=${encodeURIComponent(item)}`)
      router.push({ path: `/test` });
    };

  const submitForm = () => {
  // Implement form submission logic here
  console.log('Form submitted:', form.value)
  // After successful submission, navigate to /caseinfo
  // This assumes you're using Vue Router. If not, adjust accordingly.
  router.push(`/caseinfo?caseid=${formData.caseid}`)
}

  </script>
  
  <style>

  </style>