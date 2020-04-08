<template>
  <div id="six">
    <div class="pb-nav">
      <el-button size="small" type="info" icon="el-icon-download" @click="search()">打印</el-button>
      <el-input size="small" style="width: 20rem;"><label slot="prepend">关键字</label></el-input>
      <el-date-picker size="small"
        v-model="begin_date"
        align="right"
        type="date"
        placeholder="开始日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="small"
        v-model="over_date"
        align="right"
        type="date"
        placeholder="结束日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
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
  name: "six",
  components:{
    mytable
  },
  data(){
    return{
      begin_date: "",
      over_date: "",
      pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      tableTitle: [
        {key: "", title: "商品名称"},
        {key: "", title: "规格"},
        {key: "", title: "商品编码"},
        {key: "", title: "日期"},
        {key: "", title: "单号"},
        {key: "", title: "业务类型"},
        {key: "", title: "仓库"},
        {key: "", title: "门店"},
        {key: "", title: "入库数量"},
        {key: "", title: "单位成本"},
        {key: "", title: "入库金额"},
        {key: "", title: "出库数量"},
        {key: "", title: "单位成本"},
        {key: "", title: "出库金额"},
        {key: "", title: "结余数量"},
        {key: "", title: "结余金额"},
      ],
      tableData: [],
      operation: false
    }
  }
}
</script>

<style scoped>
#six{
  margin: 1rem 5rem;
}
</style>
