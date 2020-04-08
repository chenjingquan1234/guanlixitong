<template>
  <div id="one">
    <el-input v-model="new_unit" style="width: 20%;" size="mini" clearable><label slot="prepend">单位</label></el-input>
    <el-button size="mini" type="primary" @click="modify(new_unit, 1)">添加</el-button>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_mod_name="'保存'"
    @modify="modify" @del="del" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
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
      new_unit: " ",
      tableTitle: [
        {key: "unit_name", title: "单位", min_width: "100", edit: {name: 'input', autoselect: true}}
      ],
      tableData: [],
		}
	},
  methods:{
    modify(row, key){
      let id = "";
      let unit_name = "";
      if(key === 1){
        id = "";
        unit_name = row;
      }
      else if(key === 2){
        id = row.row.id;
        unit_name = row.row.unit_name;
      }
      this.$api.HttpPost("/storeadmin/repair/addOrUpdateUnit", {add_type: key, id: id, unit_name: unit_name})
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
      this.$api.HttpPost("/storeadmin/repair/delUnit", {id: row.row.id})
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
      this.$refs.mytable.findList(this.$api.yuming + "/storeadmin/repair/getUnitList", data);
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
