<template>
  <div id="qzxmgl">
    <el-button size="mini" icon="el-icon-plus" type="primary" @click="add()">新增</el-button>
    <el-input style="width: 20rem;" size="mini" v-model="key_name" clearable placeholder="可按车牌/姓名/手机进行搜索"><label slot="prepend">关键字</label></el-input>
    <el-select size="mini" v-model="intentionality_name" clearable placeholder="意向度" @change="intentionality_change">
      <el-option v-for="value in intentionality_select" :key="value.intentionality_name" :label="value.intentionality_name" :value="value.intentionality_name"></el-option>
    </el-select>
    <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
      <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
    </el-select>
    <el-button size="mini" :type="is === 1?'primary':''" @click="bt(1)">今年</el-button>
    <el-button size="mini" :type="is === 2?'primary':''" @click="bt(2)">今月</el-button>
    <el-button size="mini" :type="is === 3?'primary':''" @click="bt(3)">今日</el-button>
    <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="s_pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <el-button size="mini" @click="search(iss, id)" icon="el-icon-search" type="primary">查询</el-button>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :operation_mod_name="operation_mod_name" :operation_del_name="operation_del_name" :operation_name="operation_name" :operation_="operation_" :check_box="check_box"
    :rstyle="rstyle" :cstyle="cstyle" @modify="modify" @del="del" @operat="operat" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>

    <Dialog :title="'新增潜在项目'" :width="'30%'" ref="dialog_qz" @enter="enter_qz">
      <template>
        <el-input size="mini" v-model="customer_name">
          <label slot="prepend">选择客户</label>
          <el-dropdown slot="append" trigger="click">
            <label class="el-icon-arrow-down el-icon--right"></label>
            <el-dropdown-menu slot="dropdown"><mytable :tableTitle="kh_tableTitle" :tableData="kh_tableData" :height="300" :check_box="check_box" :operation="operation"
            @resData="kh_resData" @handlePageChange="kh_handlePageChange" @cell_click="kh_cell_click" ref="kh_mytable"></mytable></el-dropdown-menu>
          </el-dropdown>
        </el-input>
        <el-select size="mini" style="width: 100%;" v-model="d_project_name" clearable filterable placeholder="项目" @change="d_project_change">
          <el-option v-for="value in project_select" :key="value.check_event_id" :label="value.check_even_name" :value="value.check_event_id"></el-option>
        </el-select>
        <el-select size="mini" style="width: 100%;" v-model="d_intentionality_name" clearable placeholder="意向度" @change="d_intentionality_change">
          <el-option v-for="value in intentionality_select" :key="value.d_intentionality_name" :label="value.d_intentionality_name" :value="value.d_intentionality_name"></el-option>
        </el-select>
        <el-date-picker v-model="d_time" size="mini" style="width: 100%;" clearable type="date" align="right" placeholder="预计消费日期" :picker-options="pickerOptions"></el-date-picker>
        <el-input size="mini" v-model="d_money" clearable><label slot="prepend">报价&#12288&#12288</label></el-input>
        <el-input size="mini" v-model="d_remark" clearable><label slot="prepend">备注&#12288&#12288</label></el-input>
      </template>
    </Dialog>

    <Dialog :title="'项目详情'" :footer="false" ref="dialog_xq">
      <template>
        <el-divider content-position="left">客户信息</el-divider>
        <el-input size="mini" v-model="xq_a" disabled><label slot="prepend">车牌&#12288&#12288</label></el-input>
        <el-input size="mini" v-model="xq_b" disabled><label slot="prepend">手机&#12288&#12288</label></el-input>
        <el-input size="mini" v-model="xq_c" disabled><label slot="prepend">客户姓名</label></el-input>
        <el-divider content-position="left">状态信息</el-divider>
        <el-input size="mini" v-model="xq_d" disabled><label slot="prepend">登记时间</label></el-input>
        <el-input size="mini" v-model="xq_e" disabled><label slot="prepend">登记人&#12288</label></el-input>
        <el-input size="mini" v-model="xq_f" disabled><label slot="prepend">登记门店</label></el-input>
        <el-input size="mini" v-model="xq_g" disabled><label slot="prepend">状态&#12288&#12288</label></el-input>
        <el-input size="mini" v-model="xq_h" disabled><label slot="prepend">关闭时间</label></el-input>
        <el-input size="mini" v-model="xq_i" disabled><label slot="prepend">关闭人&#12288</label></el-input>
        <el-input size="mini" v-model="xq_j" disabled><label slot="prepend">关闭类型</label></el-input>
        <el-input size="mini" v-model="xq_k" disabled><label slot="prepend">关闭原因</label></el-input>
        <el-divider content-position="left">项目信息</el-divider>
        <el-input size="mini" v-model="xq_l" disabled><label slot="prepend">项目名称</label></el-input>
        <el-input size="mini" v-model="xq_m" disabled><label slot="prepend">意向度&#12288</label></el-input>
        <el-input size="mini" v-model="xq_n" disabled><label slot="prepend">报价&#12288&#12288</label></el-input>
        <el-input size="mini" v-model="xq_o" disabled><label slot="prepend">预计消费</label></el-input>
        <el-input size="mini" v-model="xq_p" disabled><label slot="prepend">备注&#12288&#12288</label></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../mytable.vue"
import Dialog from "./../other/Dialog.vue"
export default{
	name: "qzxmgl",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
      is: 2,
      url: [
        "/StoreAdmin/Report/getPotentialList",
        "/StoreAdmin/Report/getMemberSelect",
        "/StoreAdmin/Report/getRepairCheckEventList",
        "/StoreAdmin/Report/cancelPotential",
        "/StoreAdmin/Report/addOrUpdatePotential"
      ],
      key_name: "",
      s_time: [],
      intentionality_name: "",
      intentionality_select: [
        {intentionality_name: "高", d_intentionality_name: "高"},
        {intentionality_name: "中", d_intentionality_name: "中"},
        {intentionality_name: "低", d_intentionality_name: "低"}
      ],
      store_name: "",
      tableTitle: [
        {key: "create_time", title: "登记时间", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "member_name", title: "客户姓名", min_width: "100"},
        {key: "tel", title: "手机号", min_width: "100"},
        {key: "name", title: "项目名称", min_width: "100"},
        {key: "price", title: "报价", min_width: "100"},
        {key: "intention", title: "意向度", min_width: "100"},
        {key: "status", title: "项目状态", min_width: "100"},
        {key: "expect_time", title: "预计消费时间", min_width: "100"},
        {key: "ename", title: "登记人", min_width: "100"},
        {key: "store_name", title: "登记人门店", min_width: "100"}
      ],
      tableData: [],
      operation_mod_name: "修改",
      operation_del_name: "作废",
      operation_name: "查看",
      //弹出框
      add_type: "",
      d_id: "",
      customer_name: "",
      customer_id: "",
      kh_tableTitle: [
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "tel", title: "手机", min_width: "100"},
      ],
      kh_tableData: [],
      check_box: false,
      operation: false,
      operation_: true,
      pickerOptions: {
        // disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      s_pickerOptions: {
        shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
        {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
        {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
      },
      d_project_name: "",
      project_select: [],
      d_intentionality_name: "高",
      d_time: "",
      d_money: "",
      d_remark: "",

      xq_a: "",
      xq_b: "",
      xq_c: "",
      xq_d: "",
      xq_e: "",
      xq_f: "",
      xq_g: "",
      xq_h: "",
      xq_i: "",
      xq_j: "",
      xq_k: "",
      xq_l: "",
      xq_m: "",
      xq_n: "",
      xq_o: "",
      xq_p: "",
      xq_q: ""
		}
	},
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    },
    "iss": {
      type: Number,
      default: 1
    },
    "id": {
      type: Number,
      default: null
    }
  },
  methods:{
    search(is, data){
      if(this.s_time === null){
        this.s_time = [];
        this.s_time[0] = "";
        this.s_time[1] = "";
      }
      if(is === 1){
        this.handlePageChange({search: this.key_name, sid: this.store_name, intention: this.intentionality_name, start_time: this.s_time[0], end_time: this.s_time[1]});
      }
      else if(is === 2){
        this.handlePageChange({search: this.key_name, sid: this.store_name, intention: this.intentionality_name, eid: data, start_time: this.s_time[0], end_time: this.s_time[1]});
      }
      else if(is === 3){
        this.handlePageChange({search: this.key_name, sid: this.store_name, intention: this.intentionality_name, check_event_id: data, start_time: this.s_time[0], end_time: this.s_time[1]});
      }
    },
    intentionality_change(s){
      this.intentionality_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    bt(s){
      this.is = s;
      if(this.is === 1){
        this.s_time = [
          new Date(new Date().getFullYear(), 0, 1),
          new Date(new Date().getFullYear(), 11, 31)
        ]
      }
      else if(this.is === 2){
        this.s_time = [
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date(new Date().getFullYear(), new Date().getMonth()+1, 1)
        ]
      }
      else if(this.is === 3){
        this.s_time = [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          new Date()
        ]
      }
    },
    add(){
      this.$refs.dialog_qz.init();
      this.add_type = 1;
      this.$nextTick(()=>{
        this.$api.HttpPost(this.url[2], {})
        .then((data)=>{
          this.project_select = data.data.data;
        })
        this.kh_handlePageChange();
      })
    },
    operat(row){
      this.$refs.dialog_xq.init();
      this.xq_a = row.row.car;
      this.xq_b = row.row.tel;
      this.xq_c = row.row.member_name;
      this.xq_d = row.row.create_time;
      this.xq_e = row.row.ename;
      this.xq_f = row.row.store_name;
      this.xq_g = row.row.status;
      this.xq_h = row.row.close_time;
      this.xq_i = row.row.cname;
      this.xq_j = row.row.close_type;
      this.xq_k = row.row.close_remark;
      this.xq_l = row.row.name;
      this.xq_m = row.row.intention;
      this.xq_n = row.row.price;
      this.xq_o = row.row.expect_time;
      this.xq_p = row.row.remark;
    },
    del(row){
      this.$prompt("作废原因", "作废潜在项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
      .then(({value})=>{
        this.$api.HttpPost(this.url[3], {id: row.row.id, close_remark: value})
        .then((data)=>{
          if(data.data.code === 200){
            this.handlePageChange();
            this.$message.success(data.data.msg);
          }
          else{
            this.$message.error(data.data.msg);
          }
        })
      })
    },
    modify(row){
      this.$refs.dialog_qz.init();
      this.add_type = 2;
      this.$nextTick(()=>{
        this.$api.HttpPost(this.url[2], {})
        .then((data)=>{
          this.project_select = data.data.data;
        })
        this.kh_handlePageChange();
      })
      this.d_id = row.row.id;
      this.customer_name = row.row.ename;
      this.customer_id = row.row.member_id;
      this.d_project_name = row.row.check_event_id;
      this.d_intentionality_name = row.row.intention;
      this.d_money = row.row.price;
      this.d_remark = row.row.remark;
      this.d_time = row.row.expect_time * 1000;
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        if(this.tableData[i].status == 0){
          this.tableData[i].status = "进行中";
        }
        else if(this.tableData[i].status == 1){
          this.tableData[i].status = "已过期";
        }
        else if(this.tableData[i].status == 2){
          this.tableData[i].status = "已作废";
        }
        this.tableData[i].car = this.tableData[i].plate_id + this.tableData[i].license_plate_number;
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + this.url[0], data);
    },
    //新增
    kh_cell_click(row){
      this.customer_name = row.row.name;
      this.customer_id = row.row.member_id;
    },
    kh_resData(data){
      this.kh_tableData = data;
      for(let i in this.tableData){
        this.kh_tableData[i].car = this.kh_tableData[i].plate_id + this.kh_tableData[i].license_plate_number;
      }
    },
    kh_handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.kh_mytable.findList(this.$api.yuming + this.url[1], data);
    },
    d_project_change(s){
      this.d_project_name = s;
    },
    d_intentionality_change(s){
      this.d_intentionality_name = s;
    },
    enter_qz(){
      this.$api.HttpPost(this.url[4],
      {add_type: this.add_type,
      id: this.d_id,
      member_id: this.customer_id,
      check_event_id: this.d_project_name,
      price: this.d_money,
      intention: this.d_intentionality_name,
      expect_time: this.d_time,
      remark: this.d_remark})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.dialog_qz.cancel();
          this.handlePageChange();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    rstyle({row, rowIndex, column, columnIndex}){
      // console.log({row, rowIndex, column, columnIndex})
    },
    cstyle({row, rowIndex, column, columnIndex}){
      if(column.title === "项目状态"){
        if(row.status === "进行中"){
          return{
            // backgroundColor: "green",
            color: "green"
          }
        }
        else{
          return{
            // backgroundColor: "red",
            color: "red"
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
