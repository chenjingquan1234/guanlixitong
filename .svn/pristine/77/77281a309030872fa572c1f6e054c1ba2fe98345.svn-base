<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">导出</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">单据编号</label></el-input>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :resData="resData" :handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "three",
	components:{
		mytable
	},
	data(){
		return{
      tableTitle: [
        {key: "", title: "员工姓名", min_width: "100"},
        {key: "", title: "基本工资", min_width: "100"},
        {key: "", title: "扣款", min_width: "100"},
        {key: "", title: "补贴/奖励", min_width: "100"},
        {key: "", title: "销售提成", min_width: "100"},
        {key: "", title: "施工提成", min_width: "100"},
        {key: "", title: "售卡提成", min_width: "100"},
        {key: "", title: "薪资年月", min_width: "100"},
        {key: "", title: "工资合计", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      key_name: "",
      store_name: "",
      store_id: "",
		}
	},
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "people_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    store_change: function(s){
      this.store_id = s;
    },
    download: function(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    search: function(){
      this.handlePageChange({sid: this.store_id});
    },
    resData: function(data){
      this.tableData = data;
    },
    handlePageChange: function(data){
      if(data === undefined){data = {}}
      this.$refs.findList();
    }
  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
</style>
