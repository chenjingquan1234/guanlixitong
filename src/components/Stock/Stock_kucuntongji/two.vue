<template>
  <div id="two">
    <div class="pb-nav">
<!--      <el-button size="mini" type="danger" icon="el-icon-delete" @click="del()">停用</el-button>
      <el-button size="mini" type="info" icon="el-icon-c-scale-to-original" @click="del_()">已停用商品</el-button>
      <el-button size="mini" type="info" icon="el-icon-c-scale-to-original" @click="del_()">未用商品</el-button> -->
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "two",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "product_name", title: "商品", min_width: "100"},
        {key: "product_type", title: "规格", min_width: "100"},
        {key: "classify_name", title: "所属分类", min_width: "100"},
        {key: "unit_name", title: "单位", min_width: "100"},
        {key: "barcode", title: "条形码", min_width: "100"},
        {key: "product_code", title: "商品编码", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "product_price", title: "售价", min_width: "100"},
        {key: "wholesale_price", title: "成本", min_width: "100"},
        {key: "last_purchase_price", title: "最后进价", min_width: "100"},
        {key: "inventory", title: "库存总量", min_width: "100"},
        {key: "total_price", title: "库存总额", min_width: "100"},
        {key: "repertory_name", title: "仓库名称", min_width: "100"}
      ],
      tableData: [],
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
    store_change(s){
      this.store_id = s;
    },
    search(){
      this.handlePageChange({search: this.key_name, sid: this.store_id})
    },
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].total_price = this.tableData[i].wholesale_price * this.tableData[i].inventory;
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getInventoryList", data);
    }
  }
}
</script>

<style scoped>
#two{
  margin: 1rem 5rem;
}
</style>
