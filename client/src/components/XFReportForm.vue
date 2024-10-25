<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-xl font-semibold text-center">消火栓图片分析</h1>
    </header>

    <main class="container mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">现场消火栓照片</h2>
        <el-upload
          class="uploader"
          action="http://192.168.1.169:5001/imagechat/imageupload"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="w-44 h-44 object-cover rounded"
            alt="Uploaded image"
          />
          <div
            v-else
            class="w-44 h-44 border-2 border-dashed border-gray-300 rounded flex items-center justify-center"
          >
            <el-icon class="text-gray-400 text-3xl">
              <Plus />
            </el-icon>
          </div>
        </el-upload>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">图片分析结果</h2>
        <el-progress
          v-if="isAnalyzing"
          :percentage="analysisProgress"
          :format="() => '解析中...'"
        />
        <div v-else-if="analysisResult" v-html="renderedAnalysisResult" class="text-gray-700 markdown-body"></div>
        <el-skeleton v-else :rows="10" animated />
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
import { ref, nextTick,computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'

const router = useRouter()

const imageUrl = ref('')
const analysisResult = ref('')
const dialogVisible = ref(false)
const errorMessage = ref('')
const image_id = ref('')
const isAnalyzing = ref(false)
const analysisProgress = ref(0)

const renderedAnalysisResult = computed(() => {
  return  marked(analysisResult.value)
})
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
    isAnalyzing.value = true
    analysisProgress.value = 0
    const interval = setInterval(() => {
      analysisProgress.value += 10
      if (analysisProgress.value >= 90) {
        clearInterval(interval)
      }
    }, 500)

    const response = await fetch(`http://192.168.1.169:5001/imagechat/imagexhsanalysis?imageId=${imageId}`)
    if (!response.ok) {
      throw new Error('图片分析失败')
    }
    const data = await response.json()
    clearInterval(interval)
    analysisResult.value = data.analysis_content
    image_id.value = imageId
    console.log('Analysis Result:', analysisResult.value) // 添加日志

    setTimeout(() => {
      isAnalyzing.value = false
    }, 500)
  } catch (error) {
    console.error('Analysis Error:', error)
    errorMessage.value = error.message
    dialogVisible.value = true
    isAnalyzing.value = false
  }
}

const navigateToItem = (item) => {
  console.log(`caseid=${encodeURIComponent(item)}`)
  router.push({ path: `/test` })
}

const submitForm = () => {
  console.log('Form submitted:', form.value)
  router.push(`/caseinfo?caseid=${formData.caseid}`)
}
</script>

<style>
.markdown-body {
  /* 添加一些基本的Markdown样式 */
  line-height: 1.6;
  word-wrap: break-word;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body p {
  margin-bottom: 16px;
}

.markdown-body ul,
.markdown-body ol {
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-body li {
  margin-bottom: 4px;
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}
</style>