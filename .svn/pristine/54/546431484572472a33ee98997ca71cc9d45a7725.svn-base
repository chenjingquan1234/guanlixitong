<template>
  <div id="two">
    <div class="pb-nav">
      <el-button size="mini" type="primary" @click="modify(null, 1)">添加</el-button>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
      <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData"
    @modify="modify" @del="del" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog :title="add_num.add_type === 1?'新增服务产品分类':'修改服务产品分类'" :close-on-click-modal="false" @enter="enter" ref="dialog">
      <template>
        <el-input size="mini" v-model="add_num.classify_name"><label slot="prepend" style="color: red;">名称</label></el-input>
        <el-select size="mini" style="width: 100%;" v-model="add_num.parent_name" clearable placeholder="分类" @clear="type_clear">
          <el-option :label="add_num.parent_name" :value="add_num.parent_name" class="tree-select">
            <el-tree :data="treeData" :props="{children: 'children', label: 'classify_name'}" @node-click="type_node_click"></el-tree>
          </el-option>
        </el-select>
        <el-input v-model="add_num.remark" size="mini" type="textarea" placeholder="备注"></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
	name: "two",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      store_name: "",
      //
      tableTitle: [
        {key: "classify_name", title: "分类名称", min_width: "100", tree: true},
        {key: "create_time", title: "创建时间", min_width: "100"},
      ],
      tableData: [],
      add_num: {
        add_type: 1,
        id: "",
        classify_name: "",
        work_hour_id: "",
        parent_name: "",
        pid: "",
        remark: "",
      }
		}
	},
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "treeData": {
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
        id: "",
        classify_name: "",
        work_hour_id: "",
        parent_name: "",
        pid: "",
        remark: "",
      }
      this.init();
      if(key === 2){
        this.add_num = row.row;
        this.add_num.add_type = key;
      }
      this.$refs.dialog.init();
    },
    del(row){
      this.$api.HttpPost("/storeadmin/Service/delServiceItemClassify", {id: row.row.id})
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
      if(data === undefined){data = {}};
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Service/getServiceItemClassifyList", {...data, ...{is_tree: true}});
    },
    type_clear(){
      this.add_num.pid = "";
    },
    type_node_click(s){
      this.add_num.pid = s.id;
      this.add_num.parent_name = s.classify_name;
    },
    enter(){
      this.$api.HttpPost("/StoreAdmin/Service/serviceItemClassifyEdit", this.add_num)
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
    },
    init(){
      this.$axios.all([
        this.$api.HttpPost("/StoreAdmin/Service/getUnitSelect", {}),
        this.$api.HttpPost("/StoreAdmin/Service/getServiceItemClassifySelect", {}),
      ])
      .then((data)=>{
        this.unit_select = data[0].data.data;
        this.treeData = data[1].data.data;
      })
    }
  }
}
</script>

<style scoped>
</style>
