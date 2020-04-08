<template>
  <div id="two">
    <div class="pb-nav">
      <el-input size="mini" style="width: 20rem;" v-model="key_name" placeholder="可按姓名/手机/预约项目搜索"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :check_box="check_box" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "two",
  components: {
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "mname", title: "姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "tel", title: "联系方式", min_width: "100"},
        {key: "goods", title: "寄存商品", min_width: "100"},
        {key: "location", title: "存放位置", min_width: "100"},
        {key: "ename", title: "负责人", min_width: "100"},
        {key: "create_time", title: "寄存时间", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"}
      ],
      tableData: [],
      check_box: false,
      operation: false,
      //数据
      key_name: "",
      store_name: "",
      store_id: "",
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    store_change: function(s){
      this.store_id = s;
    },
    search: function(){
      this.handlePageChange();
    },
    resData: function(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange: function(data){
      if(data === undefined){data = {status: 1, search: this.key_name, sid: this.store_id}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Client/getDepositList", data)
    }
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
</style>
