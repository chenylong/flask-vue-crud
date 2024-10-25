<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-xl font-semibold text-center">立案</h1>
    </header>

    <main class="container mx-auto px-4 py-6">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">现场照片</h2>
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
        <h2 class="text-lg font-semibold mb-4">图片分析</h2>
        <div v-if="analysisResult" v-html="analysisResult" class="text-gray-700"></div>
        <el-skeleton v-else :rows="3" animated />
      </div>

      <!-- <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">关联信息</h2>
        <el-collapse v-model="activeCollapse">
          <el-collapse-item title="相关事项推荐" name="1">
            <ul v-if="relatedInfo.length" class="list-disc list-inside text-gray-700">
              <li v-for="(item, index) in relatedInfo" :key="index" class="hover:bg-gray-100 cursor-pointer p-1"
                @click="navigateToItem(item)">
                {{ item }}
              </li>
            </ul>
            <el-skeleton v-else :rows="3" animated />
          </el-collapse-item>
        </el-collapse>
      </div> -->

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-lg font-semibold mb-4">关联信息</h2>
    <el-collapse v-model="activeCollapse">
      <el-collapse-item title="相关事项推荐" name="1">
        <ul v-if="relatedInfo.length" class="list-disc list-inside text-gray-700">
          <li v-for="(item, index) in relatedInfo" 
              :key="index" 
              :class="[
                'cursor-pointer p-1 rounded transition-colors duration-200',
                selectedItems.includes(item) ? 'bg-green-100 text-blue-600' : 'hover:bg-gray-100'
              ]"
              @click="toggleSelection(item)">
            {{ item }}
          </li>
        </ul>
        <el-skeleton v-else :rows="3" animated />
      </el-collapse-item>
    </el-collapse>
  </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">信息录入</h2>
        <el-form :model="formData" :rules="rules" ref="reportForm" label-width="100px">
      <el-form-item label="立案时间" prop="filingDate">
        <el-date-picker
          v-model="formData.filingDate"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      
      <el-form-item label="案发地点" prop="incidentLocation">
        <el-input
          v-model="formData.incidentLocation"
          placeholder="请输入案发地点"
        ></el-input>
      </el-form-item>
      
      <el-form-item label="当事人姓名" prop="personName">
        <el-input
          v-model="formData.personName"
          placeholder="请输入当事人姓名"
        ></el-input>
      </el-form-item>

      

    </el-form>
      </div>
      <el-button type="primary" @click="submitForm" class="w-full py-2 text-lg font-semibold">提交</el-button>
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
  import { ref,reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router';

   //使用rote 获取caseid
   const router = useRouter()

  const imageUrl = ref('')
  const analysisResult = ref('')
  var relatedInfo = ref([])
  const dialogVisible = ref(false)
  const errorMessage = ref('')
  var activeCollapse = ref(['0'])
  var image_id = ref('')
  const form = ref({
    illegalFact: ''
  })
  var data = reactive({})
  const reportForm = ref(null)


  const formatDateToTZString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `TZ${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    
  const formData = reactive({
    filingDate: new Date().toISOString().split('T')[0], // 默认为当前日期
    incidentLocation: '椒江区白云广场',
    personName: '',
    caseid: formatDateToTZString(new Date()) // 新增：用于存储案件ID uuid生成
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
      const response = await fetch(`http://192.168.1.169:5001/imagechat/imageanalysis?imageId=${imageId}`)
      if (!response.ok) {
        throw new Error('图片分析失败')
      }
      data = await response.json()
      analysisResult.value = formatAnalysisResult(data)
      relatedInfo = data.shixiang
      activeCollapse = ['1']
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

  //   return `
  //   <p><strong>图片ID:</strong> ${data.objects}</p>
  //   <p><strong>分析结果:</strong> ${data.analysis_contet} </p>
  //   <p><strong>关联的裁量信息推荐:</strong></p>
  //   <ul>
  //     ${data.shixiang.map(item => `<li>${item}</li>`).join('')}
  //   </ul>
  // `;

  }

  const rules = {
      filingDate: [
        { required: true, message: '请选择立案时间', trigger: 'change' }
      ],
      incidentLocation: [
        { required: true, message: '请输入案发地点', trigger: 'blur' },
        { min: 5, message: '地点描述至少5个字符', trigger: 'blur' }
      ],
      personName: [
        { required: true, message: '请输入当事人姓名', trigger: 'blur' },
        { min: 2, message: '姓名至少2个字符', trigger: 'blur' }
      ],
      phoneNumber: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
      ],
      idNumber: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
        { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入有效的身份证号', trigger: 'blur' }
      ]
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

<script>
export default {
  data() {
    return {
      relatedInfo: [],
      activeCollapse: [],
      selectedItems: [], // 新增：用于跟踪选中的项
    }
  },
  mounted() {
    this.loadRelatedInfo()
  },
  methods: {
    async loadRelatedInfo() {
      try {
        // 假设这是加载数据的 API 调用
        // this.relatedInfo = data.shixiang
        // 数据加载完成后，自动展开折叠面板
        this.activeCollapse = ['1']
      } catch (error) {
        console.error('加载相关信息失败:', error)
        // 可以在这里添加错误处理逻辑
      }
    },
    toggleSelection(item) {
      const index = this.selectedItems.indexOf(item)
      if (index === -1) {
        // 如果项目不在选中列表中，添加它
        this.selectedItems.push(item)
        console.log(this.selectedItems)
      } else {
        // 如果项目已经在选中列表中，移除它
        this.selectedItems.splice(index, 1)
      }
    }
  }
}
</script>
  
  <style>

  </style>