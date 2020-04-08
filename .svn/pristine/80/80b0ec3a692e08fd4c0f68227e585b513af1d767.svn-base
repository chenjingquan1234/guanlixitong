<template>
  <div id="four">
    <div class="pb-nav">
      <el-button size="small" type="info" icon="el-icon-download" @click="search()">打印</el-button>
      <el-input size="small" style="width: 20rem;"><label slot="prepend">关键字</label></el-input>
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
  name: "four",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "", title: "商品/规格"},
        {key: "", title: "商品编码"},
        {key: "", title: "库存数量"},
        {key: "", title: "总销售数量"},
        {key: "", title: "库存总额"},
        {key: "", title: "总销售金额 "},
        {key: "", title: "总毛利"},
        {key: "", title: "几天未销售"},
        {key: "", title: "所属门店"}
      ],
      tableData: [],
      operation: false
    }
  }
}
</script>

<style scoped>
#four{
  margin: 1rem 5rem;
}
</style>
