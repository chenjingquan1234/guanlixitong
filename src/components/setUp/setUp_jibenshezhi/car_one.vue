<template>
  <div id="one">
    <el-input v-model="new_area" style="width: 20%;" size="mini" clearable><label slot="prepend">省份</label></el-input>
    <el-button size="mini" type="primary" @click="modify(new_area, 1)">添加</el-button>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_="true" :operation_mod_name="'保存'" :operation_name="'设为默认'"
    @modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
	name: "one",
  components:{
    mytable
  },
	data(){
		return{
      new_area: " ",
      tableTitle: [
        {key: "plate_id", title: "省份", min_width: "100", edit: {name: 'input', autoselect: true}},
        {key: "is_default", title: "是否默认", min_width: "100"}
      ],
      tableData: [],
		}
	},
  methods:{
    modify(row, key){
      let id = "";
      let plate_id = "";
      if(key === 1){
        id = "";
        plate_id = row;
      }
      else if(key === 2){
        id = row.row.id;
        plate_id = row.row.plate_id;
      }
      this.$api.HttpPost("/storeadmin/Customer/addOrUpdateMemberPlate", {add_type: key, id: id, plate_id: plate_id})
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
    del(row){
      this.$api.HttpPost("/storeadmin/Customer/delMemberPlate", {id: row.row.id})
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
      this.$api.HttpPost("/storeadmin/Customer/setDefaultMemberPlate", {id: row.row.id})
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
          this.tableData[i].is_default = "否";
        }
        else if(this.tableData[i].is_default == 1){
          this.tableData[i].is_default = "是";
        }
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/Customer/getMemberPlateList", data);
    }
  },
  mounted(){
    this.handlePageChange();
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 0;
}
</style>
