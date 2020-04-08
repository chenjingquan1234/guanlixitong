<template>
  <div id="Operate_jikemosiThree">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <div class="pb-nav el-tab-pane">
        <el-input style="width: 20rem;" size="small" v-model="key_name"><label slot="prepend">关键字</label></el-input>
        <el-select size="small" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
          <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
        </el-select>
        <el-button size="small" type="primary" @click="search()">查询</el-button>
      </div>
      <el-tab-pane label="微信购买返利记录" name="one">
        <mytable :tableTitle="tableTitle" :tableData="tableData1" :operation="operation"
        @resData="resData" @handlePageChange="handlePageChange" ref="mytable1"></mytable>
      </el-tab-pane>
      <el-tab-pane label="系统消费返利记录" name="two">
        <mytable :tableTitle="tableTitle" :tableData="tableData2" :operation="operation"
        @resData="resData" @handlePageChange="handlePageChange" ref="mytable2"></mytable>
      </el-tab-pane>
      <el-tab-pane label="扫二维码关注返利记录" name="three">
        <mytable :tableTitle="tableTitle" :tableData="tableData3" :operation="operation"
        @resData="resData" @handlePageChange="handlePageChange" ref="mytable3"></mytable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "Operate_jikemosiThree",
  components:{
    mytable
  },
	data(){
		return{
      activeName: "one",
      tableTitle: [
        {key: "", title: "车牌", min_width: "100"},
        {key: "", title: "会员昵称", min_width: "100"},
        {key: "", title: "手机", min_width: "100"},
        {key: "", title: "消费产品", min_width: "100"},
        {key: "", title: "购买数量", min_width: "100"},
        {key: "", title: "单价", min_width: "100"},
        {key: "", title: "金额", min_width: "100"},
        {key: "", title: "上级人脉", min_width: "100"},
        {key: "", title: "人脉级别", min_width: "100"},
        {key: "", title: "返利比例", min_width: "100"},
        {key: "", title: "获得返利", min_width: "100"},
        {key: "", title: "交易时间", min_width: "100"},
      ],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      store_select: []
		}
	},
  methods:{
    tabClick: function(s){
      if(s.name === "one"){
        tableTitle = [
          {key: "", title: "车牌", min_width: "100"},
          {key: "", title: "会员昵称", min_width: "100"},
          {key: "", title: "手机", min_width: "100"},
          {key: "", title: "消费产品", min_width: "100"},
          {key: "", title: "购买数量", min_width: "100"},
          {key: "", title: "单价", min_width: "100"},
          {key: "", title: "金额", min_width: "100"},
          {key: "", title: "上级人脉", min_width: "100"},
          {key: "", title: "人脉级别", min_width: "100"},
          {key: "", title: "返利比例", min_width: "100"},
          {key: "", title: "获得返利", min_width: "100"},
          {key: "", title: "交易时间", min_width: "100"},
        ]
      }
      else if(s.name === "two"){
        this.tableTitle = [
          {key: "", title: "车牌", min_width: "100"},
          {key: "", title: "会员昵称", min_width: "100"},
          {key: "", title: "手机", min_width: "100"},
          {key: "", title: "消费产品", min_width: "100"},
          {key: "", title: "消费金额", min_width: "100"},
          {key: "", title: "上级人脉", min_width: "100"},
          {key: "", title: "人脉级别", min_width: "100"},
          {key: "", title: "返利比例", min_width: "100"},
          {key: "", title: "获得返利", min_width: "100"},
          {key: "", title: "交易时间", min_width: "100"},
          {key: "", title: "备注", min_width: "100"},
        ]
      }
      else if(s.name === "three"){
        this.tableTitle = [
          {key: "", title: "微信昵称", min_width: "100"},
          {key: "", title: "会员昵称", min_width: "100"},
          {key: "", title: "上级人脉会员昵称", min_width: "100"},
          {key: "", title: "上级人脉车牌", min_width: "100"},
          {key: "", title: "上级人脉手机", min_width: "100"},
          {key: "", title: "上级人脉获得返利", min_width: "100"},
          {key: "", title: "扫码日期", min_width: "100"},
          {key: "", title: "备注", min_width: "100"},
        ]
      }
    },
    store_change: function(s){
      this.store_id = s;
    },
    search: function(){

    },
    resData: function(){

    },
    handlePageChange: function(){

    }
  }
}
</script>

<style scoped>

.el-tab-pane{
  margin: 1rem 5rem;
}
</style>
