<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">案件信息</h1>
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-blue-500 text-white">
            <th class="px-4 py-2">序号</th>
            <th class="px-4 py-2">案件名称</th>
            <th class="px-4 py-2">当事人</th>
            <th class="px-4 py-2">部门名称</th>
            <th class="px-4 py-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(caseItem, index) in caseList" :key="caseItem.caseid" :class="index % 2 === 0 ? 'bg-white' : 'bg-blue-50'">
            <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ caseItem.caseName }}</td>
            <td class="border px-4 py-2">{{ caseItem.involvedParty }}</td>
            <td class="border px-4 py-2">{{ caseItem.department }}</td>
            <td class="border px-4 py-2 text-center">
              <button @click="goToDetails(caseItem.caseid)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                调查取证
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
  

  

const router = useRouter()

const caseList = ref([
  { caseid: '12345678', caseName: '张某户外无证经营案', involvedParty: '张凤', department: '台州市综合执法局' },
  { caseid: '123456', caseName: '李某违规停车案', involvedParty: '李明', department: '台州市综合执法局' },
  { caseid: '123456789', caseName: '王某噪音扰民案', involvedParty: '王力', department: '台州市综合执法局' },
  { caseid: 'A001', caseName: '赵某违章建筑案', involvedParty: '赵康', department: '台州市综合执法局' },
  { caseid: 'A002', caseName: '刘某户外广告违规案', involvedParty: 'zhao', department: '台州市综合执法局' },
])

const goToDetails = (caseid) => {
  router.push(`/test?caseid=${caseid}`)
}

const imageUrl = ref('')
const analysisResult = ref('')
const dialogVisible = ref(false)
const errorMessage = ref('')


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
    const isLt2M = file.size / 1024 / 1024 < 2
  
    if (!isImage) {
      ElMessage.error('只能上传图片文件!')
    }
    if (!isLt2M) {
      ElMessage.error('图片大小不能超过 2MB!')
    }
  
    return isImage && isLt2M
  }
  
  const analyzeImage = async (imageId) => {
    try {
      const response = await fetch(`http://192.168.1.169:5001/imagechat/imageanalysis?imageId=${imageId}`)
      if (!response.ok) {
        throw new Error('图片分析失败')
      }
      const data = await response.json()
      analysisResult.value = formatAnalysisResult(data)
    } catch (error) {
      errorMessage.value = error.message
      dialogVisible.value = true
    }
  }
  
  const formatAnalysisResult = (data) => {
    // 这里可以根据实际的分析结果格式来调整
    // return `
    //   <p><strong>图片ID:</strong> ${data.objects}</p>
    //   <p><strong>分析结果:</strong> ${data.analysis_contet} </p>
    //   <p><strong>关联的裁量信息推荐:</strong> ${data.shixiang}</p>
    // `
    return `
    <p><strong>图片ID:</strong> ${data.objects}</p>
    <p><strong>分析结果:</strong> ${data.analysis_contet} </p>
    <p><strong>关联的裁量信息推荐:</strong></p>
    <ul>
      ${data.shixiang.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;


  }

</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.uploader {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.uploaded-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.analysis-result {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>