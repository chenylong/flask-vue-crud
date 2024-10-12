<template>
    <div class="min-h-screen flex flex-col">
      <header class="bg-blue-200 py-2">
        <h1 class="text-center text-3xl font-bold">现场检查（勘验）记录表</h1>
      </header>
      <main class="flex-1 flex items-center justify-center">
        <section class="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <p class="text-blue-800">勘验时间：{{ checkTime }}</p>
          <p class="text-blue-800">勘验地点：{{ checkLocation }}</p>
          <p class="text-blue-800">执法部门：{{ checkDeptname }}</p>
          <table class="w-full mt-4">
            <thead>
              <tr class="bg-blue-500 text-white">
                <th class="py-2 px-4" colspan="2">当事人信息</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4">被检查人姓名</td>
                <td class="py-2 px-4">{{ name }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">联系电话</td>
                <td class="py-2 px-4">{{ phone || '未提供' }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">身份证号</td>
                <td class="py-2 px-4">{{ idNumber }}</td>
              </tr>
              <tr class="bg-blue-500 text-white">
                <th class="py-2 px-4" colspan="2">检查项目</th>
              </tr>
              <tr>
                <td class="py-2 px-4">现场是否属于室外公共场所</td>
                <td class="py-2 px-4">{{ isOutdoor }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">是否办理相关证照</td>
                <td class="py-2 px-4">{{ hasLicense }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">经营物品</td>
                <td class="py-2 px-4">{{ operatedGoods }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">是否使用载货（运输）工具</td>
                <td class="py-2 px-4">{{ isNonMotorVehicle  === 'true' ? '是' : '否' }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">载货（运输）工具是否为机动车</td>
                <td class="py-2 px-4">{{ isMotorVehicle === 'true' ? '是' : '否' }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">机动车车牌号码</td>
                <td class="py-2 px-4">{{ plateNumber || '' }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">载货（运输）工具类型</td>
                <td class="py-2 px-4">{{ vehicleType }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">机动车所有人</td>
                <td class="py-2 px-4">{{ vehicleOwner || '' }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">机动车驾驶人</td>
                <td class="py-2 px-4">{{ driver || '' }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4">驾驶证号码</td>
                <td class="py-2 px-4">{{ driverLicense || '' }}</td>
              </tr>
              <tr class="bg-blue-500 text-white">
                <th class="py-2 px-4" colspan="2">被检查人意见</th>
              </tr>
              <tr>
              <td class="py-2 px-4 w-1/2">对以上检查情况有无异议？</td>
              <td class="py-2 px-4 w-1/2">{{ inspectionOpinion || '无异议' }}</td>
            </tr>
            <tr>
              <td class="py-2 px-4 w-1/2">当事人签名：{{ signature || '未提供' }} </td>
              <td class="py-2 px-4 w-1/2">签名时间：{{ date || '未提供' }}</td>

            </tr>
              <tr>
               
              </tr>
              <tr class="bg-blue-500 text-white">
                <th class="py-2 px-4" colspan="2">检查人员信息</th>
              </tr>
              <tr>
                <td class="py-2 px-4 w-1/3 ">检查人员1：{{ inspector1Name }}</td>
                <td class="py-2 px-4 w-2/3">执法证号1：{{ inspector1Id }}</td>
              </tr>
              <tr>
                <td class="py-2 px-4 w-1/3" >检查人员2：{{ inspector2Name }}</td>
                <td class="py-2 px-4 w-2/3">执法证号2：{{ inspector2Id }}</td>
              </tr>
            
            </tbody>
          </table>
        </section>
      </main>
      <footer class="bg-blue-200 py-2">
        <p class="text-center text-blue-800">版权所有 © 2024 </p>
      </footer>
    </div>
  </template>
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        checkTime: "",
        checkLocation: "",

        checkDeptname: "",

        name: "",
        phone: "",
        idNumber: "",
        isOutdoor: "",
        hasLicense: "",

        operatedGoods: "",

        isNonMotorVehicle: "",
        isMotorVehicle:"",

        plateNumber: "",
        vehicleType: "",
        vehicleOwner: "",
        driver: "",
        driverLicense: "",

        inspectionOpinion: "",
        signature: "",
        date: "",
        inspector1Name: "",
        inspector1Id: "",
        inspector2Name: "",
        inspector2Id: ""
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const caseId =  this.$route.query.caseid
        try {
          const response = await axios.post('http://192.168.1.169:5001/morechat/getdata', {caseid:caseId})

          const data = response.data.data;
          this.checkTime = data.checkTime;
          this.checkLocation = data.checkLocation;
          this.checkDeptname = data.checkDeptname;

          this.name = data.name;
          this.phone = data.phone;
          this.idNumber = data.idNumber;
          this.isOutdoor = data.isOutdoor;
          this.isNotOutdoor = data.isNotOutdoor;
          this.hasLicense = data.hasLicense;
          this.noLicense = data.noLicense;
          this.operatedGoods = data.operatedGoods;

          this.isMotorVehicle = data.isMotorVehicle;
          this.plateNumber = data.plateNumber;
          this.vehicleType = data.vehicleType;
          this.vehicleOwner = data.vehicleOwner;
          this.driver = data.driver;
          this.driverLicense = data.driverLicense;
          this.isNonMotorVehicle = data.isNonMotorVehicle;
          this.nonMotorType = data.nonMotorType;
          this.inspectionOpinion = data.inspectionOpinion;
          this.signature = data.signature;
          this.date = data.date;
          this.inspector1Name = data.inspector1Name;
          this.inspector1Id = data.inspector1Id;
          this.inspector2Name = data.inspector2Name;
          this.inspector2Id = data.inspector2Id;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
};
</script>
<style scoped>
/* Your component styles here */
</style>
  