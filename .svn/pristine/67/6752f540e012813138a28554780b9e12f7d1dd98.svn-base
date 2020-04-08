<template>
  <div id="four">
    <div class="pb-nav">
      <el-button size="mini" type="primary" @click="modify(null, 1)">添加</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" operation_ :operation_name="'默认'"
    @modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog :title="add_num.add_type === 1?'新增附加项目':'修改附加项目'" :close-on-click-modal="false" @enter="enter" ref="dialog">
      <template>
        <el-input size="mini" v-model="add_num.work_hour_name"><label slot="prepend">名称</label></el-input>
        <el-input size="mini" v-model="add_num.minutes"><label slot="prepend">分钟</label></el-input>
        <el-input size="mini" v-model="add_num.price"><label slot="prepend">金额</label></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
	name: "four",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      tableTitle: [
        {key: "work_hour_name", title: "名称", min_width: "100"},
        {key: "minutes", title: "分钟", min_width: "100"},
        {key: "price", title: "金额", min_width: "100"},
        {key: "is_default", title: "默认", min_width: "100"},
        {key: "store_name", title: "门店", min_width: "100"},
      ],
      tableData: [],
      add_num: {
        add_type: 1,
        work_hour_name: "",
        minutes: "",
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
        work_hour_name: "",
        minutes: "",
        price: ""
      }
      if(key === 2){
        this.add_num = row.row;
        this.add_num.add_type = key;
      }
      this.$refs.dialog.init();
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Service/delWorkHour", {id: row.row.id})
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
    operat(row){
      this.$api.HttpPost("/StoreAdmin/Service/setWorkHour", {id: row.row.id})
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
      for(let i in this.tableData){
        if(this.tableData[i].is_default == 0){
          this.this.tableData[i].is_default = "否";
        }
        else{
          this.this.tableData[i].is_default = "是";
        }
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Service/getWorkHourList", {...data, ...{is_tree: true}});
    },
    enter(){
      this.$api.HttpPost("/StoreAdmin/Service/workHourEdit", this.add_num)
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
