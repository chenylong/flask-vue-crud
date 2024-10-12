<template>
    <div class="min-h-screen bg-gray-100 p-4">
        <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <h1 class="text-2xl font-bold text-center p-4 bg-gray-200"><strong>现场检查（勘验）记录表</strong></h1>
            <table class="w-full border-collapse">
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left" colspan="2">勘验时间：{{ checkTime }}</th>
                </tr>
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left" colspan="2">勘验地点：{{ checkLocation }}</th>
                </tr>
                <tr>
                    <td class="border border-gray-300 px-4 py-2 text-left" ><strong>当事人</strong></td>
                    <td class="border border-gray-300 px-4 py-2">{{ name }}</td>
                
                </tr>
                <tr>
                    <td class="border border-gray-300 px-4 py-2 text-left" ><strong>检查（勘验）机关</strong></td>
                    <td class="border border-gray-300 px-4 py-2">{{ checkDeptname }}</td>
                </tr>
                <tr>
                    <td class="border border-gray-300 px-4 py-2 text-left" ><strong>记录人</strong></td>
                    <td class="border border-gray-300 px-4 py-2">{{ recorder }}</td>
                </tr>
                <tr>
                    <th class="border border-gray-300 px-4 py-2">检查（勘验）人员</th>
                    <th class="border border-gray-300 px-4 py-2">执法证件号</th>
                </tr>
                <tr>
                    <td class="border border-gray-300 px-4 py-2">{{ inspector1Name }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ inspector1Id }}</td>
                </tr>
                <tr>
                    <td class="border border-gray-300 px-4 py-2">{{ inspector2Name }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ inspector2Id }}</td>
                </tr>
                <tr>
                    <td class="border border-gray-300 px-4 py-2" colspan="2">
                        <strong>现场检查（勘验）情况：</strong>
                        <p class="mt-2">{{ inspectionContent }}</p>
                    </td>
                </tr>
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left" colspan="2">当事人签名或盖章：{{ signature }}</th>
                </tr>
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left" colspan="2">见证人签名：{{ jianzhengSignatures }}</th>
                </tr>
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left" colspan="2">执法人员签名：{{ inspectorSignatures }}
                    </th>
                </tr>
            </table>
        </div>
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
      recorder: "",
      inspector1Name: "",
      inspector1Id: "",
      inspector2Name: "",
      inspector2Id: "",
      signature:"",
      inspectionContent:"",
      jianzhengSignatures:"",
      inspectorSignatures:""

    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const caseId =  this.$route.query.caseid
      try {
        const response = await axios.post('http://192.168.1.169:5001/morechat/getjieguodata', {caseid:caseId})

        const data = response.data.data;
        this.checkTime = data.checkTime;
        this.checkLocation = data.checkLocation;
        this.checkDeptname = data.checkDeptname;

        this.name = data.name;
        this.phone = data.phone;
        this.idNumber = data.idNumber;
      
        this.recorder = data.recorder;
        this.inspectionContent = data.inspectionContent;

        this.inspector1Name = data.inspector1Name;
        this.inspector1Id = data.inspector1Id;
        this.inspector2Name = data.inspector2Name;
        this.inspector2Id = data.inspector2Id;

        this.signature = data.inspector2Id;
        this.inspectionContent = data.inspectionContent;
        this.inspectorSignatures = data.inspectorSignatures;
        this.jianzhengSignatures = data.jianzhengSignatures;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>