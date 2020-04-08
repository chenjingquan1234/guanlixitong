<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" type="primary" @click="modify(null, 1)">添加</el-button>
      <el-button size="mini" type="info" @click="download()">导出</el-button>
      <el-input style="width: 20rem;" size="mini" placeholder="可按名称 规格 编码进行搜索" v-model="key_name"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="type_name" clearable placeholder="所属分类" @clear="type_clear">
        <el-option :label="type_name" :value="type_name" class="tree-select">
          <el-tree :data="treeData" :props="{children: 'children', label: 'classify_name'}" @node-click="node_click"></el-tree>
        </el-option>
      </el-select>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_del_name="'停用'"
    @modify="modify" @del="del" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog :title="add_num.add_type === 1?'新增服务项目':'修改服务项目'" :close-on-click-modal="false" @enter="enter" ref="dialog">
      <template>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input size="mini" v-model="add_num.service_item_name"><label slot="prepend" style="color: red;">名称</label></el-input>
            <el-input size="mini" v-model="add_num.cost"><label slot="prepend">成本</label></el-input>
            <el-input size="mini" v-model="add_num.specification"><label slot="prepend">规格</label></el-input>
            <el-input size="mini" v-model="add_num.price"><label slot="prepend" style="color: red;">售价</label></el-input>
            <el-input size="mini" v-model="add_num.work_hours" placeholder="分钟"><label slot="prepend">工时</label></el-input>
          </el-col>
          <el-col :span="12">
            <el-input size="mini" v-model="add_num.number" ><label slot="prepend">编码</label></el-input>
            <el-select v-model="add_num.unit" style="width: 100%;" size="mini" clearable placeholder="单位" @change="unit_change">
              <el-option v-for="value in unit_select" :key="value.id" :label="value.unit_name" :value="value.id"></el-option>
            </el-select>
            <el-select size="mini" class="effective" style="width: 100%;" v-model="add_num.classify_name" clearable placeholder="分类" @clear="type_clear">
              <el-option :label="add_num.classify_name" :value="add_num.classify_name" class="tree-select">
                <el-tree :data="treeData" :props="{children: 'children', label: 'classify_name'}" @node-click="type_node_click"></el-tree>
              </el-option>
            </el-select>
            <el-input v-model="add_num.remark" size="mini" type="textarea" placeholder="备注"></el-input>
          </el-col>
        </el-row>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
import Dialog from "./../../other/Dialog.vue"
export default{
	name: "one",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      key_name: "",
      type_name: "",
      type_id: "",
      store_name: "",
      //
      tableTitle: [
        {key: "service_item_name", title: "服务项目", min_width: "100"},
        {key: "specification", title: "规格", min_width: "100"},
        {key: "number", title: "编码", min_width: "100"},
        {key: "cost", title: "成本", min_width: "100"},
        {key: "work_hours", title: "工时数", min_width: "100"},
        {key: "price", title: "销售价格", min_width: "100"},
        {key: "unit_name", title: "单位", min_width: "100"},
        {key: "classify_name", title: "所属分类", min_width: "100"},
        {key: "create_time", title: "创建时间", min_width: "100"}
      ],
      tableData: [],
      unit_select: [],
	  treeData: [],
      add_num: {
        add_type: 1,
        id: "",
        service_item_name: "",
        cost: "",
        specification: "",
        price: "",
        work_hours: "",
        number: new Date().getTime() + Math.round(Math.random()*1000),
        unit_name: "",
        unit: "",
        classify_name: "",
        classify_id: "",
        work_hours: "",
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
    type_clear(){
      this.type_id = "";
      this.add_num.classify_id = "";
    },
    node_click(s){
      this.type_id = s.id;
      this.type_name = s.classify_name;
    },
    store_change(s){
      this.store_name = s;
    },
    download(){
      this.$refs.mytable.$refs.xTable.exportData({type: "csv"});
    },
    search(){
      this.handlePageChange({search: this.key_name, sid: this.store_name, classify_id: this.type_id});
    },
    modify(row, key){
      this.add_num = {
        add_type: 1,
        id: "",
        service_item_name: "",
        cost: "",
        specification: "",
        price: "",
        work_hours: "",
        number: new Date().getTime() + Math.round(Math.random()*1000),
        unit_name: "",
        unit: "",
        classify_name: "",
        classify_id: "",
        work_hours: "",
      }
      if(key === 2){
        this.add_num = row.row;
        this.add_num.add_type = key;
      }
      this.$refs.dialog.init();
    },
    del(row){
      this.$api.HttpPost("/StoreAdmin/Service/stopServiceItem", {id: row.row.id, status: 0})
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
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Service/getServiceItemList", data);
    },
    unit_change(s){
      this.add_num.unit = s;
    },
    type_node_click(s){
      this.add_num.classify_id = s.id;
      this.add_num.classify_name = s.classify_name;
    },
    enter(){
      this.$api.HttpPost("/StoreAdmin/Service/serviceItemEdit", this.add_num)
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
