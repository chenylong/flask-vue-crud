<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-200 py-2">
      <h1 class="text-center text-3xl font-bold"><strong>案件信息</strong></h1>
    </header>
    <main class="flex-1 flex items-center justify-center">
      <section class="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <table class="w-full">
          <thead>
            <tr class="bg-blue-500 text-white">
              <th class="py-2 px-4">序号</th>
              <th class="py-2 px-4">案件名称</th>
              <th class="py-2 px-4">当事人</th>
              <th class="py-2 px-4">部门名称</th>
              <th class="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(caseItem, index) in cases" :key="caseItem.caseid">
              <td class="py-2 px-4">{{ index + 1 }}</td>
              <td class="py-2 px-4">{{ caseItem.name }}</td>
              <td class="py-2 px-4">{{ caseItem.party }}</td>
              <td class="py-2 px-4">{{ caseItem.department }}</td>
              <td class="py-2 px-4 text-right">
                <button @click="goToDetails(caseItem.caseid)" class="bg-blue-500 text-white py-1 px-2 rounded">详情</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      cases: [
        {  name: '张某户外无证经营案', party: '张力', department: '台州市综合执法局',caseid:'12345678' },
        {  name: '谭某某户外无证经营案', party: '谭玉米', department: '台州市综合执法局' ,caseid:'123456'},
        {  name: '王某某户外无证经营案', party: '王大力', department: '台州市综合执法局' ,caseid:'12345678'},
        {  name: '李某某户外无证经营案', party: '李达康', department: '台州市综合执法局',caseid:'123456' },
        {  name: '赵某户外无证经营案', party: '赵东来', department: '台州市综合执法局' ,caseid:'12345678'}
      ]
    };
  },
  methods: {
    goToDetails(caseid) {
      this.$router.push(`/test?caseid=${caseid}`);
    }
  }
};
</script>

<style>
/* 你可以在这里添加全局样式 */
</style>