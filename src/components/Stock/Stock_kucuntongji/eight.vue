<template>
  <div id="eight">
    <div class="pb-nav">
      <el-button size="mini" type="info" icon="el-icon-download" @click="download()">打印</el-button>
      <el-input size="mini" style="width: 20rem;" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :operation_mod="operation_mod" :operation_del="operation_del" :operation_="operation_" :operation_name="operation_name"
    @resData="resData" @handlePageChange="handlePageChange" @operat="operat" ref="mytable"></mytable>

    <el-dialog title="设置预警" :visible.sync="dialog" width="30%">
      <el-input size="mini" v-model="min"><label slot="prepend">最低库存</label></el-input>
      <el-input size="mini" v-model="max"><label slot="prepend">最高库存</label></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="enter()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "eight",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "product_name", title: "商品名称", min_width: "100"},
        {key: "product_type", title: "规格型号", min_width: "100"},
        {key: "product_code", title: "商品编码", min_width: "100"},
        {key: "classify_name", title: "商品分类", min_width: "100"},
        {key: "unit_name", title: "单位", min_width: "100"},
        {key: "inventory", title: "当前库存 ", min_width: "100"},
        {key: "minimum", title: "最低库存", min_width: "100"},
        {key: "maximum", title: "最高库存", min_width: "100"},
        {key: "over_umber", title: "超限数量", min_width: "100"}
      ],
      tableData: [],
      operation_mod: false,
      operation_del: false,
      operation_: true,
      operation_name: "设置预警",
      dialog: false,
      key_name: "",
      store_name: "",
      min: 0,
      max: 0,
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search(){
      this.handlePageChange({search: this.key_name, sid: this.store_name});
    },
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    store_change(s){
      this.store_name = s;
    },
    enter(){
      this.$message("该功测试中...");
      this.dialog = false;
    },
    operat(row){
      console.log(row)
      this.dialog = true;
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$store.state.domainName_http+"/StoreAdmin/Statistics/getWarningList", data);
    }
  }
}
</script>

<style scoped>
#eight{
  margin: 1rem 5rem;
}
</style>
