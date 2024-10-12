<template>
  <div class="a4-page font-song">
    <div class="form-container">
      <h1 class="text-center text-xl font-bold mb-2">
        对室外公共场所无照经营的处罚案
      </h1>
      <h2 class="text-center text-lg mb-4">现场检查（勘验）记录表</h2>
      
      <div class="border border-black p-4">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>检查时间：<span class="border-b border-black">{{ formData.checkTime }}</span></div>
          <div>检查地点：<span class="border-b border-black">{{ formData.checkLocation }}</span></div>
        </div>

        <table class="w-full border-collapse mb-4">
          <tbody>
            <tr>
              <td class="border border-black p-2 w-1/4">被检查人情况</td>
              <td class="border border-black p-2">
                <div class="flex justify-between mb-2">
                  <span>姓名：<span class="border-b border-black">{{ formData.name }}&nbsp;&nbsp;&nbsp;&nbsp;</span></span>    
                  <span>联系电话：<span class="border-b border-black">{{ formData.phone }}</span></span>
                </div>
                <div>身份证号：<span class="border-b border-black">{{ formData.idNumber }}</span></div>
              </td>
            </tr>
            <tr>
              <td class="border border-black p-2">是否是露天公共场所</td>
              <td class="border border-black p-2">
                <label class="mr-4">
                  <input type="checkbox" v-model="formData.isOutdoor" true-value="是" false-value="否" class="mr-1">是
                </label>
                <label>
                  <input type="checkbox" v-model="formData.isNotOutdoor" true-value="是" false-value="否" class="mr-1">否
                </label>
              </td>
            </tr>
            <tr>
              <td class="border border-black p-2">是否办理营业执照</td>
              <td class="border border-black p-2">
                <label class="mr-4">
                  <input type="checkbox" v-model="formData.hasLicense" true-value="是" false-value="否" class="mr-1">是
                </label>
                <label>
                  <input type="checkbox" v-model="formData.noLicense" true-value="是" false-value="否" class="mr-1">否
                </label>
              </td>
            </tr>
            <tr>
              <td class="border border-black p-2 align-top" rowspan="2">经营车辆</td>
              <td class="border border-black p-2">
                <div class="flex items-start mb-2">
                  <label class="flex items-center mr-4">
                    <input type="checkbox" v-model="formData.isMotorVehicle" class="mr-1">机动车&nbsp;&nbsp;&nbsp;&nbsp;
                  </label>
                  <div class="flex-1">
                    <div class="mb-1">车牌号：<span class="border-b border-black">{{ formData.plateNumber }}</span></div>
                    <div class="mb-1">车辆类型：<span class="border-b border-black">{{ formData.vehicleType }}</span></div>
                    <div class="mb-1">车辆所有人：<span class="border-b border-black">{{ formData.vehicleOwner }}</span></div>
                    <div class="mb-1">驾驶人：<span class="border-b border-black">{{ formData.driver }}</span></div>
                    <div class="mb-1">驾驶证号：<span class="border-b border-black">{{ formData.driverLicense }}</span></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="border border-black p-2">
                <label class="flex items-center mb-2">
                  <input type="checkbox" v-model="formData.isNonMotorVehicle" class="mr-1">非机动车
                </label>
                <div>车辆类型：<span class="border-b border-black">{{ formData.nonMotorType }}</span></div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mb-4">
          被检查人意见：
          <div class="border-b border-black my-2">
            {{ formData.inspectionOpinion }}

            <div class="flex justify-between mt-2">
            <span>被检查人签名：<span class="border-b border-black">{{ formData.signature }} &nbsp;&nbsp;&nbsp;&nbsp;</span></span>    
            <span>日期：<span class="border-b border-black">{{ formData.date }}</span></span>
          </div>  
          </div>
        
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <span> 检查人姓名：<span class="border-b border-black">{{ formData.inspector1Name }} &nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span> 执法证号：<span class="border-b border-black">{{ formData.inspector1Id }}</span></span>  
        </div>
          <div>
            <span> 检查人姓名：<span class="border-b border-black">{{ formData.inspector2Name }} &nbsp;&nbsp;&nbsp;&nbsp;</span></span>
            <span> 执法证号：<span class="border-b border-black">{{ formData.inspector2Id }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectionForm',
  data() {
    return {
      // 模拟数据
      mockData: {
        checkTime: '2024年3月15日 14:30',
        checkLocation: '城市中心广场东北角',
        name: '张三',
        phone: '13812345678',
        idNumber: '330102199001011234',
        isOutdoor: '是',
        isNotOutdoor: '否',
        hasLicense: '否',
        noLicense: '是',
        isMotorVehicle: true,
        plateNumber: '浙A12345',
        vehicleType: '小型面包车',
        vehicleOwner: '张三',
        driver: '张三',
        driverLicense: '330102199001011234',
        isNonMotorVehicle: false,
        nonMotorType: '',
        inspectionOpinion: '对以上检查情况无异议',
        signature: '张三',
        date: '2024年3月15日',
        inspector1Name: '李四',
        inspector1Id: 'ZF123456',
        inspector2Name: '王五',
        inspector2Id: 'ZF123457'
      },
      
      // 实际表单数据，初始化为模拟数据
      formData: {}
    }
  },
  created() {
    // 在组件创建时，用模拟数据初始化表单
    this.formData = {...this.mockData}
  },
  methods: {
    // 用于重置表单到初始状态的方法
    resetForm() {
      this.formData = {...this.mockData}
    },
    // 用于清空表单的方法
    clearForm() {
      this.formData = {
        checkTime: '',
        checkLocation: '',
        name: '',
        phone: '',
        idNumber: '',
        isOutdoor: '否',
        isNotOutdoor: '否',
        hasLicense: '否',
        noLicense: '否',
        isMotorVehicle: false,
        plateNumber: '',
        vehicleType: '',
        vehicleOwner: '',
        driver: '',
        driverLicense: '',
        isNonMotorVehicle: false,
        nonMotorType: '',
        inspectionOpinion: '',
        signature: '',
        date: '',
        inspector1Name: '',
        inspector1Id: '',
        inspector2Name: '',
        inspector2Id: ''
      }
    },
    // 模拟API调用的方法
    async fetchData() {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      // 模拟API返回数据
      return {...this.mockData}
    },
    // 模拟提交数据的方法
    async submitForm() {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      // 模拟API响应
      return {
        success: true,
        message: '提交成功'
      }
    }
  }
}
</script>

<style scoped>
/* 样式保持不变 */
@media print {
  @page {
    size: A4;
    margin: 0;
  }
  body {
    margin: 0;
  }
}

.a4-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 0.5cm rgba(0,0,0,0.1);
}

@media screen {
  .a4-page {
    margin: 1cm auto;
  }
}

.form-container {
  padding: 20mm;
}

.font-song {
  font-family: SimSun, "宋体", sans-serif;
  font-size: 14pt;
  line-height: 1.5;
}

h1 {
  font-size: 18pt;
}

h2 {
  font-size: 16pt;
}

table {
  font-size: 12pt;
}

input[type="checkbox"] {
  transform: scale(1.2);
}
</style>