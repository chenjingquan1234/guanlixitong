<template>
  <div id="five">
    <div class="pb-nav">
      <el-button size="small" type="info" icon="el-icon-download" @click="search()">打印</el-button>
      <el-button size="small" type="primary" plain @click="search()">本年商品销售</el-button>
      <el-button size="small" type="primary" plain @click="search()">历史商品销售</el-button>
      <el-input size="small" style="width: 20rem;"><label slot="prepend">关键字</label></el-input>
      <el-select size="small" v-model="value_select" placeholder="产品类型">
        <el-option v-for="value in value_c_select" :key="value" :label="value" :value="value"></el-option>
      </el-select>
      <el-select size="small" v-model="value_select" placeholder="所属门店">
        <el-option v-for="value in value_c_select" :key="value" :label="value" :value="value"></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "five",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "", title: "名称"},
        {key: "", title: "规格"},
        {key: "", title: "商品编码"},
        {key: "", title: "类型"},
        {key: "", title: "1月(金额/数量)"},
        {key: "", title: "2月(金额/数量)"},
        {key: "", title: "3月(金额/数量)"},
        {key: "", title: "4月(金额/数量)"},
        {key: "", title: "5月(金额/数量)"},
        {key: "", title: "6月(金额/数量)"},
        {key: "", title: "7月(金额/数量)"},
        {key: "", title: "8月(金额/数量)"},
        {key: "", title: "9月(金额/数量)"},
        {key: "", title: "10月(金额/数量)"},
        {key: "", title: "11月(金额/数量)"},
        {key: "", title: "12月(金额/数量)"}
      ],
      tableData: [],
      operation: false
    }
  }
}
</script>

<style scoped>
#five{
  margin: 1rem 5rem;
}
</style>
