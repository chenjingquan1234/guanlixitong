<template>
  <div id="Operate_jikemosiFour">
    <div class="pb-nav">
      <el-input style="width: 20rem;" size="small" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="small" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation"
    @resData="resData" @handlePageChange="handlePageChange" ref="mytable3"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "Operate_jikemosiFour",
  components:{
    mytable
  },
	data(){
		return{
      tableTitle: [
        {key: "", title: "车牌", min_width: "100"},
        {key: "", title: "姓名", min_width: "100"},
        {key: "", title: "微信名称", min_width: "100"},
        {key: "", title: "提现类型", min_width: "100"},
        {key: "", title: "提现金额", min_width: "100"},
        {key: "", title: "提现日期", min_width: "100"},
        {key: "", title: "备注", min_width: "100"},
        {key: "", title: "门店", min_width: "100"},
      ],
      tableData: [],
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
      store_select: []
		}
	}
}
</script>

<style scoped>
#Operate_jikemosiFour{
  margin: 1rem 5rem;
}
</style>
