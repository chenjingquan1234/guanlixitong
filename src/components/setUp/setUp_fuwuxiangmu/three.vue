<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" type="primary" @click="modify(null, 1)">添加</el-button>
      <el-input style="width: 20rem;" size="mini" placeholder="可按名称 规格 编码进行搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData"
    @modify="modify" @del="del" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog :title="add_num.add_type === 1?'新增附加项目':'修改附加项目'" :close-on-click-modal="false" @enter="enter" ref="dialog">
      <template>
        <el-input size="mini" v-model="add_num.addition_item_name"><label slot="prepend">项目名称</label></el-input>
        <el-input size="mini" v-model="add_num.price"><label slot="prepend">项目金额</label></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
	name: "three",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      key_name: "",
      store_name: "",
      //
      tableTitle: [
        {key: "addition_item_name", title: "项目名称", min_width: "100"},
        {key: "price", title: "价格", min_width: "100"},
      ],
      tableData: [],
      add_num: {
        add_type: 1,
        addition_item_name: "",
        price: ""
      }
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
      this.store_name = s;
    },
    search(){
      this.handlePageChange({sid: this.store_name});
    },
    modify(row, key){
      this.add_num = {
        add_type: 1,
        addition_item_name: "",
        price: ""
      }
      if(key === 2){
        this.add_num = row.row;
        this.add_num.add_type = key;
      }
      this.$refs.dialog.init();
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Service/delAdditionItem", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    resData(data){
      this.tableData = data;
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Service/getAdditionItemList", data);
    },
    enter(){
      this.$api.HttpPost("/StoreAdmin/Service/additionItemEdit", this.add_num)
      .then((data)=>{
        if(data.data.code === 200){
          this.handlePageChange();
          this.$refs.dialog.cancel();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
