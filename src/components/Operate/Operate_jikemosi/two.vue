<template>
  <div id="Operate_jikemosiTwo">
    <div class="pb-nav">
      <el-button size="small" type="info" icon="el-icon-money" @click="search()">充值提现</el-button>
      <el-button size="small" type="info" icon="el-icon-money" @click="search()">现金提现</el-button>
      <el-button size="small" type="info" icon="el-icon-user" @click="search()">人脉关系</el-button>
      <el-input style="width: 20rem;" size="small" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="small" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation"
    @cell_click="cell_click" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "Operate_jikemosiTwo",
  components: {
    mytable
  },
	data(){
		return{
      key_name: "",
      store_name: "",
      store_id: "",
      store_select: [],
      tableTitle: [
        {key: "", title: "会员昵称", min_width: "100"},
        {key: "", title: "手机", min_width: "100"},
        {key: "", title: "一级人脉", min_width: "100"},
        {key: "", title: "一级返利", min_width: "100"},
        {key: "", title: "二级人脉", min_width: "100"},
        {key: "", title: "二级返利", min_width: "100"},
        {key: "", title: "三级人脉", min_width: "100"},
        {key: "", title: "三级返利", min_width: "100"},
        {key: "", title: "剩余返利", min_width: "100"},
        {key: "", title: "已充值到会员卡的返利", min_width: "100"},
        {key: "", title: "注册时间", min_width: "100"},
      ],
      tableData: [],
      operation: false
		}
	},
  methods:{
    store_change: function(s){
      this.store_id = s;
    },
    search: function(){

    }
  }
}
</script>

<style scoped>
#Operate_jikemosiTwo{
  margin: 1rem 5rem;
}
</style>
