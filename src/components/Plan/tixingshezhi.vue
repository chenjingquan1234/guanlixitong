<template>
  <div id="tixingshezhi">
    <el-tabs tab-position="left" @tab-click="tabClick">
      <el-tab-pane label="项目提醒">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="xm_add()">添加提醒</el-button>
        <el-input style="width: 20rem;" size="mini" v-model="xm_key_name" clearable placeholder="搜索"><label slot="prepend">关键字</label></el-input>
        <el-radio-group size="mini" v-model="xm_radio" @change="xm_change">
          <el-radio-button :label="1">服务分类</el-radio-button>
          <el-radio-button :label="2">库存分类</el-radio-button>
        </el-radio-group>
        <el-button size="mini" @click="xm_search()" icon="el-icon-search" type="primary">查询</el-button>
        <mytable :tableTitle="xm_tableTitle" :tableData="xm_tableData" :operation_mod="operation_mod" :operation_='operation_' :operation_name="operation_name"
        @del="xm_del" @operat="xm_operat" @resData="xm_resData" @handlePageChange="xm_handlePageChange" ref="xm_mytable"></mytable>
        <Dialog :title="'添加提醒'" ref="tj_dialog" @enter="tj_enter">
          <template>
            <el-input style="width: 20rem;" size="mini" v-model="tj_key_name" clearable placeholder="搜索"><label slot="prepend">关键字</label></el-input>
            <el-radio-group size="mini" v-model="tj_radio" @change="tj_change">
              <el-radio-button :label="1">服务分类</el-radio-button>
              <el-radio-button :label="2">库存分类</el-radio-button>
            </el-radio-group>
            <el-button size="mini" @click="tj_search()" icon="el-icon-search" type="primary">查询</el-button>
            <mytable :tableTitle="tj_tableTitle" :tableData="tj_tableData" :height="400" :operation="operation"
            @cell_click="tj_cell_click" @resData="tj_resData" @handlePageChange="tj_handlePageChange" ref="tj_mytable"></mytable>
          </template>
        </Dialog>
        <Dialog :title="'设置提醒'" :width="'30%'" ref="sz_dialog" @enter="sztx_enter">
          <el-input size="mini" v-model="sz_wxtx" clearable><label slot="prepend">温馨提醒&#12288&#12288</label></label><label slot="append">天</label></el-input>
          <el-input size="mini" v-model="sz_bytx" clearable><label slot="prepend">保养提醒&#12288&#12288</label></label><label slot="append">天</label></el-input>
          <el-input size="mini" v-model="sz_khjltx" clearable><label slot="prepend">客户经理提醒</label></label><label slot="append">天</label></el-input>
        </Dialog>
      </el-tab-pane>

      <el-tab-pane label="生日提醒">
        <el-card style="width: 50%; margin: auto;">
          <div slot="header">
            <label>设置生日提醒天数</label>
            <el-button style="float: right;" size="mini" type="primary" @click="sz_enter(1)">确定</el-button>
          </div>
          <el-input size="mini" v-model.number="sz_srkh" clearable><label slot="prepend">顾客生日提前几天提醒客户</label><label slot="append">天</label></el-input>
          <el-input size="mini" v-model.number="sz_srjl" clearable><label slot="prepend">顾客生日提前几天提醒管理员和客户经理</label><label slot="append">天</label></el-input>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="保险提醒">
        <el-card style="width: 50%; margin: auto;">
          <div slot="header">
            <label>设置保险提醒天数</label>
            <el-button style="float: right;" size="mini" type="primary" @click="sz_enter(2)">确定</el-button>
          </div>
          <el-input size="mini" v-model.number="sz_bxkh" clearable><label slot="prepend">保险到期提前几天提醒客户</label><label slot="append">天</label></el-input>
          <el-input size="mini" v-model.number="sz_bxjl" clearable><label slot="prepend">保险到期提前几天提醒管理员和客户经理</label><label slot="append">天</label></el-input>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="年检提醒">
        <el-card style="width: 50%; margin: auto;">
          <div slot="header">
            <label>设置年检提醒天数</label>
            <el-button style="float: right;" size="mini" type="primary" @click="sz_enter(3)">确定</el-button>
          </div>
          <el-input size="mini" v-model.number="sz_njkh" clearable><label slot="prepend">年检到期提前几天提醒客户</label><label slot="append">天</label></el-input>
          <el-input size="mini" v-model.number="sz_njjl" clearable><label slot="prepend">年检到期提前几天提醒管理员和客户经理	</label><label slot="append">天</label></el-input>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="余额提醒">
        <el-card style="width: 50%; margin: auto;">
          <div slot="header">
            <label>设置余额提醒天数</label>
            <el-button style="float: right;" size="mini" type="primary" @click="sz_enter(4)">确定</el-button>
          </div>
          <el-input size="mini" v-model.number="sz_yekh" clearable><label slot="prepend">余额不足多少钱提醒顾客</label><label slot="append">元</label></el-input>
          <el-input size="mini" v-model.number="sz_yejl" clearable><label slot="prepend">余额不足多少钱提醒管理员和客户经理</label><label slot="append">元</label></el-input>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="卡到期提醒">
        <el-card style="width: 50%; margin: auto;">
          <div slot="header">
            <label>设置卡到期提醒天数</label>
            <el-button style="float: right;" size="mini" type="primary" @click="sz_enter(5)">确定</el-button>
          </div>
          <el-input size="mini" v-model.number="sz_kkh" clearable><label slot="prepend">会员卡到期提前几天提醒客户</label><label slot="append">天</label></el-input>
          <el-input size="mini" v-model.number="sz_kjl" clearable><label slot="prepend">会员卡到期提前几天提醒管理员和客户经理</label><label slot="append">天</label></el-input>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mytable from "./../mytable.vue"
import Dialog from "./../other/Dialog.vue"
export default{
	name: "tixingshezhi",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      xm_key_name: "",
      xm_radio: 1,
      xm_tableTitle: [
        {key: "item_name", title: "保养项目", min_width: "100"},
        {key: "classify_name", title: "所属分类", min_width: "100"}
      ],
      xm_tableData: [],
      tj_key_name: "",
      tj_radio: 1,
      tj_tableTitle: [
        {key: "service_item_name", title: "保养项目", min_width: "100"},
        {key: "classify_name", title: "所属分类", min_width: "100"}
      ],
      tj_tableData: [],
      operation: false,
      operation_mod: false,
      operation_: true,
      operation_name: "提醒设置",
      tj_id: "",
      sz_id: "",
      sz_wxtx: "",
      sz_bytx: "",
      sz_khjltx: "",
      sz_srkh: 0,
      sz_srjl: 0,
      sz_bxkh: 0,
      sz_bxjl: 0,
      sz_njkh: 0,
      sz_njjl: 0,
      sz_yekh: 0,
      sz_yejl: 0,
      sz_kkh: 0,
      sz_kjl: 0,
		}
	},
  methods:{
    tabClick(s){
      switch(s.index){
        case "0":{
          break;
        }
        case "1":{
          this.$api.HttpPost("/storeadmin/remind/getBirthdayRemind", {})
          .then((data)=>{
            this.sz_srkh = data.data.data.member_remind;
            this.sz_srjl = data.data.data.employee_remind;
          })
          break;
        }
        case "2":{
          this.$api.HttpPost("/storeadmin/remind/getInsuranceRemind", {})
          .then((data)=>{
            this.sz_bxkh = data.data.data.member_remind;
            this.sz_bxjl = data.data.data.employee_remind;
          })
          break;
        }
        case "3":{
          this.$api.HttpPost("/storeadmin/remind/getInspectionRemind", {})
          .then((data)=>{
            this.sz_njkh = data.data.data.member_remind;
            this.sz_njjl = data.data.data.employee_remind;
          })
          break;
        }
        case "4":{
          this.$api.HttpPost("/storeadmin/remind/getBalanceRemind", {})
          .then((data)=>{
            this.sz_yekh = data.data.data.member_remind;
            this.sz_yejl = data.data.data.employee_remind;
          })
          break;
        }
        case "5":{
          this.$api.HttpPost("/storeadmin/remind/getCardRemind", {})
          .then((data)=>{
            this.sz_kkh = data.data.data.member_remind;
            this.sz_kjl = data.data.data.employee_remind;
          })
          break;
        }
      }
    },
    xm_search(){
      this.xm_handlePageChange({search: this.xm_key_name});
    },
    xm_add(){
      this.$refs.tj_dialog.init();
      this.$nextTick(()=>{
        this.tj_handlePageChange();
      })
    },
    xm_change(s){
      this.xm_search();
    },
    tj_search(){
      this.tj_handlePageChange({search: this.xm_key_name});
    },
    tj_change(s){
      if(this.tj_radio === 1){
        this.tj_tableTitle = [
          {key: "service_item_name", title: "保养项目", min_width: "100"},
          {key: "classify_name", title: "所属分类", min_width: "100"}
        ]
      }
      else if(this.tj_radio === 2){
        this.tj_tableTitle = [
          {key: "product_name", title: "保养项目", min_width: "100"},
          {key: "classify_name", title: "所属分类", min_width: "100"}
        ]
      }
      this.tj_search();
    },
    tj_enter(){
      if(this.tj_radio === 1){var url = "/storeadmin/remind/setServiceRemind"}
      else if(this.tj_radio === 2){var url = "/storeadmin/remind/setProductRemind"}
      this.$api.HttpPost(url, {item_id: this.tj_id})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.tj_dialog.cancel();
          if(this.tj_radio === 1){this.xm_radio = 1;}
          else if(this.tj_radio === 2){this.xm_radio = 2;}
          this.xm_search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    sztx_enter(row){
      if(this.tj_radio === 1){var url = "/storeadmin/remind/setServiceRemind"}
      else if(this.tj_radio === 2){var url = "/storeadmin/remind/setProductRemind"}
      this.$api.HttpPost(url,
      {item_id: this.sz_id,
      warm_remind: this.sz_wxtx,
      maintenance_remind: this.sz_bytx,
      employees_remind: this.sz_khjltx})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.sz_dialog.cancel();
          this.xm_search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    xm_del(row){
      if(this.xm_radio === 1){var url = "/storeadmin/remind/delServiceRemind"}
      else if(this.xm_radio === 2){var url = "/storeadmin/remind/delProductRemind"}
      this.$api.HttpPost(url, {item_id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.xm_search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    xm_operat(row){
      this.$refs.sz_dialog.init();
      this.sz_id = row.row.item_id;
      this.sz_wxtx = row.row.warm_remind;
      this.sz_bytx = row.row.maintenance_remind;
      this.sz_khjltx = row.row.employees_remind;
    },
    xm_resData(data){
      this.xm_tableData = data;
    },
    xm_handlePageChange(data){
      if(data === undefined){data = {}}
      if(this.xm_radio === 1){var url = "/storeadmin/remind/getServiceRemindList"}
      else if(this.xm_radio === 2){var url = "/storeadmin/remind/getProductRemindList"}
      this.$refs.xm_mytable.findList(this.$api.yuming + url, data);
    },
    tj_cell_click(row){
      this.tj_id = row.row.id;
    },
    tj_resData(data){
      this.tj_tableData = data;
    },
    tj_handlePageChange(data){
      if(data === undefined){data = {}}
      if(this.tj_radio === 1){var url = "/Storeadmin/Service/getServiceItemList"}
      else if(this.tj_radio === 2){var url = "/storeadmin/inventory/getProductList"}
      this.$refs.tj_mytable.findList(this.$api.yuming + url, data);
    },
    sz_enter(s){
      switch(s){
        case 1:{
          this.$api.HttpPost("/storeadmin/remind/setBirthdayRemind", {member_remind: this.sz_srkh, employee_remind: this.sz_srjl})
          .then((data)=>{
            if(data.data.code === 200){
              this.$message.success(data.data.msg);
            }
            else{
              this.$message.error(data.data.msg);
            }
          })
          break;
        }
        case 2:{
          this.$api.HttpPost("/storeadmin/remind/setInsuranceRemind", {member_remind: this.sz_bxkh, employee_remind: this.sz_bxjl})
          .then((data)=>{
            if(data.data.code === 200){
              this.$message.success(data.data.msg);
            }
            else{
              this.$message.error(data.data.msg);
            }
          })
          break;
        }
        case 3:{
          this.$api.HttpPost("/storeadmin/remind/setInspectionRemind", {member_remind: this.sz_njkh, employee_remind: this.sz_njjl})
          .then((data)=>{
            if(data.data.code === 200){
              this.$message.success(data.data.msg);
            }
            else{
              this.$message.error(data.data.msg);
            }
          })
          break;
        }
        case 4:{
          this.$api.HttpPost("/storeadmin/remind/setBalanceRemind", {member_remind: this.sz_yekh, employee_remind: this.sz_yejl})
          .then((data)=>{
            if(data.data.code === 200){
              this.$message.success(data.data.msg);
            }
            else{
              this.$message.error(data.data.msg);
            }
          })
          break;
        }
        case 5:{
          this.$api.HttpPost("/storeadmin/remind/setCardRemind", {member_remind: this.sz_kkh, employee_remind: this.sz_kjl})
          .then((data)=>{
            if(data.data.code === 200){
              this.$message.success(data.data.msg);
            }
            else{
              this.$message.error(data.data.msg);
            }
          })
          break;
        }
      }
    }
  },
  mounted(){
    this.xm_handlePageChange();
  }
}
</script>

<style scoped>
#tixingshezhi{
  margin: 1rem 5rem;
}
.tree-select{
  height:200px;
  overflow: auto;
  background-color: #ffffff;
}
.el-input-group__prepend{
  width: 20rem;
}
</style>
