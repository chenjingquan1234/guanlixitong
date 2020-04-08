<template>
  <div id="huifangguanli">
    <el-button size="mini" :type="is === 1?'success':''" round @click="bt(1)">回访概览</el-button>
    <el-button size="mini" :type="is === 2?'success':''" round @click="bt(2)">回访客户</el-button>
    <el-button size="mini" :type="is === 3?'success':''" round @click="bt(3)">回访列表</el-button>
    <el-button size="mini" :type="is === 4?'success':''" round @click="bt(4)">设置</el-button>

    <div v-show="is === 1" style="margin-top: 1rem;">
      <el-row class="date">
        <el-col :span="5">
          <el-divider direction="vertical"></el-divider>
          <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
            <h1 style="line-height: 140px">{{show_title.daiHuiFang}}</h1>
            <label>待回访</label>
          </div>
        </el-col>
        <el-col :span="5">
          <el-divider direction="vertical"></el-divider>
          <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
            <h1 style="line-height: 140px">{{show_title.yiHuiFang}}</h1>
            <label>已回访</label>
          </div>
        </el-col>
        <el-col :span="4">
          <el-divider direction="vertical"></el-divider>
          <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
            <h1 style="line-height: 140px">{{show_title.jiJiangGuoQi}}</h1>
            <label>即将过期</label>
          </div>
        </el-col>
        <el-col :span="5">
          <el-divider direction="vertical"></el-divider>
          <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
            <h1 style="line-height: 140px">{{show_title.chaoQi}}</h1>
            <label>超期</label>
          </div>
        </el-col>
        <el-col :span="5">
          <el-divider direction="vertical"></el-divider>
          <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
            <h1 style="line-height: 140px">{{show_title.rate}}</h1>
            <label>回访率</label>
          </div>
        </el-col>
      </el-row>
      <div id="turnover" :style="{width: '100%', height: '300px'}"></div>
      <mytable :tableTitle="tableTitle" :tableData="tableData" :operation="operation" :paging="paging" @cell_click="cell_click"></mytable>
    </div>

    <div v-show="is === 2" style="margin-top: 1rem;">
      <el-input style="width: 20rem;" size="mini" v-model="hfkh_key_name" clearable placeholder="可按车牌/姓名/手机进行搜索"><label slot="prepend">关键字</label></el-input>
      <el-select size="mini" v-model="store_name" clearable placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-select size="mini" v-model="people_name" clearable placeholder="负责人" @change="people_change">
        <el-option v-for="value in people_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <el-button size="mini" @click="hfkh_search()" icon="el-icon-search" type="primary">查询</el-button>
      <mytable :tableTitle="hfkh_tableTitle" :tableData="hfkh_tableData" :operation_mod_name="'详情'" :operation_del_name="'放弃'"
      @modify="hfkh_modify" @del="hfkh_del" @resData="hfkh_resData" @handlePageChange="hfkh_handlePageChange" ref="hfkh_mytable"></mytable>
    </div>

    <div v-show="is === 3" style="margin-top: 1rem;">
      <div style="display: flex;">
        <el-input style="width: 20rem;" size="mini" v-model="hflb_key_name" clearable placeholder="可按车牌/姓名/手机进行搜索"><label slot="prepend">关键字</label></el-input>
        <el-checkbox-group style="margin-left: 1rem;" size="mini" v-model="hflb_status" @change="hflb_status_change">
          <el-checkbox-button :label="0">待回访</el-checkbox-button>
          <el-checkbox-button :label="1">已回访</el-checkbox-button>
          <el-checkbox-button :label="2">无效</el-checkbox-button>
        </el-checkbox-group>
        <el-checkbox-group style="margin-right: 1rem;" size="mini" v-model="hflb_member_status" @change="hflb_member_status_change">
          <el-checkbox-button :label="1">即将过期</el-checkbox-button>
          <el-checkbox-button :label="2">超时</el-checkbox-button>
        </el-checkbox-group>
        <el-button size="mini" :type="is_time === 1?'primary':''" @click="bt_time(1)">今年</el-button>
        <el-button size="mini" :type="is_time === 2?'primary':''" @click="bt_time(2)">今月</el-button>
        <el-button size="mini" :type="is_time === 3?'primary':''" @click="bt_time(3)">今日</el-button>
        <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="s_pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-button size="mini" @click="hflb_search()" icon="el-icon-search" type="primary">查询</el-button>
      </div>
      <mytable :tableTitle="hflb_tableTitle" :tableData="hflb_tableData" :operation_mod_name="'回访'" :operation_del_name="'放弃'"
      @modify="hflb_modify" @del="hflb_del" @resData="hflb_resData" @handlePageChange="hflb_handlePageChange" ref="hflb_mytable"></mytable>
    </div>

    <div v-show="is === 4" style="margin-top: 1rem;">
      <el-card style="width: 40%; margin: auto;">
        <div slot="header">
          <label>设置回访提前生成天数</label>
          <el-button style="float: right;" size="mini" type="primary" @click="sz_enter">确定</el-button>
        </div>
        <el-input size="mini" v-model="sz_a" clearable><label slot="prepend">项目回访</label><label slot="append">天</label></el-input>
        <el-input size="mini" v-model="sz_b" clearable><label slot="prepend">保养回访</label><label slot="append">天</label></el-input>
        <el-input size="mini" v-model="sz_c" clearable><label slot="prepend">生日回访</label><label slot="append">天</label></el-input>
        <el-input size="mini" v-model="sz_d" clearable><label slot="prepend">卡到期&#12288</label><label slot="append">天</label></el-input>
        <el-input size="mini" v-model="sz_e" clearable><label slot="prepend">保险到期</label><label slot="append">天</label></el-input>
        <el-input size="mini" v-model="sz_f" clearable><label slot="prepend">年检到期</label><label slot="append">天</label></el-input>
      </el-card>
    </div>

    <Dialog :title="'回访详情'" :width="'30%'" ref="hflb_dialog" @enter="hflb_enter">
      <template>
        <el-select style="width: 100%;" size="mini" v-model="hflb_name" clearable @change="hflb_change">
          <el-option v-for="value in hflb_select" :key="value.hflb_name" :label="value.hflb_name" :value="value.hflb_name"></el-option>
        </el-select>
        <el-date-picker v-model="hflb_time" size="mini" style="width: 100%;" clearable type="date" align="right" placeholder="回访时间" :picker-options="pickerOptions"></el-date-picker>
        <el-input v-model="hflb_remark" type="textarea" placeholder="回访详情"></el-input>
      </template>
    </Dialog>
  </div>
</template>

<script>
import mytable from "./../mytable.vue"
import Dialog from "./../other/Dialog.vue"
export default{
	name: "huifangguanli",
  components:{
    mytable,
    Dialog
  },
	data(){
		return{
		  is: 1,
		  is_time: 2,
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
		  member_id: "",
		  eid: "",
		  show_title:{},
		  turnover_xData: [],
		  turnover_seriesData: [],
		  tableTitle: [
        {key: "name", title: "员工", min_width: "100"},
        {key: "total_member", title: "负责客户数", min_width: "100"},
        {key: "daiHuiFang", title: "待回访", min_width: "100"},
        {key: "yiYuQi", title: "已逾期", min_width: "100"},
        {key: "yiShiXiao", title: "已失效", min_width: "100"},
        {key: "yiHuiFang", title: "已回访", min_width: "100"},
        {key: "rate", title: "回访率", min_width: "100"}
		  ],
		  tableData: [],
		  operation: false,
		  paging: false,
		  //回访客户
		  hfkh_key_name: "",
		  store_name: "",
		  store_select: [],
		  people_name: "",
		  people_select: [],
		  hfkh_tableTitle: [
        {key: "ename", title: "负责人", min_width: "100"},
        {key: "name", title: "客户姓名", min_width: "100"},
        {key: "tel", title: "手机号", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "car_type", title: "客户类型", min_width: "100"},
        {key: "daiHuiFang", title: "待回访数量", min_width: "100"},
        {key: "yiYuQi", title: "已逾期数量", min_width: "100"},
        {key: "yiShiXiao", title: "已失效数量", min_width: "100"},
        {key: "yiHuiFang", title: "已回访数量", min_width: "100"}
		  ],
		  hfkh_tableData: [],
		  //回访列表
		  hflb_key_name: "",
		  s_time: [],
		  hflb_member_status: [],
		  hflb_status: [],
		  hflb_id: "",
		  hflb_name: "",
		  hflb_select: [
        {hflb_name: "不购买"},
        {hflb_name: "暂时不购买"},
        {hflb_name: "已购买其他家"},
        {hflb_name: "其他"}
		  ],
		  hflb_time: "",
		  hflb_remark: "",
		  hflb_tableTitle: [
        {key: "ename", title: "负责人", min_width: "100"},
        {key: "member_name", title: "回访客户", min_width: "100"},
        {key: "tel", title: "手机号", min_width: "100"},
        {key: "car", title: "车牌", min_width: "100"},
        {key: "type", title: "回访事项", min_width: "100"},
        {key: "expiration_time", title: "到期时间", min_width: "100"},
        {key: "member_status", title: "客户状态", min_width: "100"},
        {key: "status", title: "状态", min_width: "100"},
        {key: "next_callback", title: "下次回访时间", min_width: "100"},
        {key: "remark", title: "备注", min_width: "100"},
        {key: "callback_remark", title: "回访详情", min_width: "100"},
        {key: "callback_time", title: "回访时间", min_width: "100"}
		  ],
		  hflb_tableData: [],
		  //
		  sz_a: "",
		  sz_b: "",
		  sz_c: "",
		  sz_d: "",
		  sz_e: "",
		  sz_f: ""
		}
	},
  methods:{
    bt(s){
      this.is = s;
      switch(this.is){
        case 1:{
          this.$api.HttpPost("/StoreAdmin/Callback/callbackOverview", {})
          .then((data)=>{
            this.show_title = data.data.data;
          })
          break;
        }
        case 2:{
          this.hfkh_handlePageChange();
          break;
        }
        case 3:{
          this.member_id = "";
          this.eid = "";
          this.hflb_handlePageChange();
          break;
        }
        case 4:{
          this.$api.HttpPost("/StoreAdmin/Callback/getCallbackConfig", {})
          .then((data)=>{
            this.sz_a = data.data.data.xiangmu_callback;
            this.sz_b = data.data.data.baoyang_callback;
            this.sz_c = data.data.data.shengri_callback;
            this.sz_d = data.data.data.ka_callback;
            this.sz_e = data.data.data.baoxian_callback;
            this.sz_f = data.data.data.nianjian_callback;
          })
          break;
        }
      }
    },
    bt_time(s){
      this.is_time = s;
      if(this.is_time === 1){
        this.s_time = [
          new Date(new Date().getFullYear(), 0, 1),
          new Date(new Date().getFullYear(), 11, 31)
        ]
      }
      else if(this.is_time === 2){
        this.s_time = [
          new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          new Date(new Date().getFullYear(), new Date().getMonth()+1, 1)
        ]
      }
      else if(this.is_time === 3){
        this.s_time = [
          new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          new Date()
        ]
      }
    },
    hflb_member_status_change(s){
      this.hflb_member_status = s;
    },
    hflb_status_change(s){
      this.hflb_status = s;
    },
    hfkh_search(){
      this.hfkh_handlePageChange({search: this.hfkh_key_name, sid: this.store_name, eid: this.people_name});
    },
    hflb_search(){
      if(this.s_time === null){
        this.s_time = [];
        this.s_time[0] = "";
        this.s_time[1] = "";
      }
      this.$nextTick(()=>{
        this.hflb_handlePageChange({search: this.hflb_key_name, member_status: this.hflb_member_status, status: this.hflb_status,
        member_id: this.member_id, eid: this.eid, start_time: this.s_time[0], end_time: this.s_time[1]});
      })
    },
    hflb_change(s){
      this.hflb_name = s;
    },
    type_change(s){
      this.type_name = s;
    },
    store_change(s){
      this.store_name = s;
    },
    people_change(s){
      this.people_name = s;
    },
    cell_click(row){
      this.eid = row.row.eid;
      this.is = 3;
      this.hflb_search();
    },
    //回访客户
    hfkh_modify(row){
      this.member_id = row.row.member_id;
      this.is = 3;
      this.hflb_search();
    },
    hfkh_del(row){
      this.$api.HttpPost("/StoreAdmin/Callback/cancelCallbackItemByMember_id", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.hfkh_search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    hfkh_resData(data){
      this.hfkh_tableData = data;
      for(let i in this.hfkh_tableData){
        this.hfkh_tableData[i].car = this.hfkh_tableData[i].plate_id + this.hfkh_tableData[i].license_plate_number;
        switch(this.hfkh_tableData[i].car_type){
          case 1:{this.hfkh_tableData[i].car_type = "普通会员"; break;}
          case 2:{this.hfkh_tableData[i].car_type = "特殊会员"; break;}
        }
      }
    },
    hfkh_handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.hfkh_mytable.findList(this.$api.yuming + "/StoreAdmin/Callback/analysisMember", data);
    },
    //回访列表
    hflb_enter(){
      this.$api.HttpPost("/StoreAdmin/Callback/callbackItem",
      {id: this.hflb_id,
      callback_remark: this.hflb_remark + "(" + this.hflb_name + ")",
      next_callback: this.hflb_time})
      .then((data)=>{
        if(data.data.code === 200){
          this.$refs.hflb_dialog.cancel()
          this.hflb_search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    hflb_modify(row){
      this.$refs.hflb_dialog.init();
      this.hflb_id = row.row.id;
    },
    hflb_del(row){
      this.$api.HttpPost("/StoreAdmin/Callback/cancelCallbackItem", {id: row.row.id})
      .then((data)=>{
        if(data.data.code === 200){
          this.hflb_search();
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    hflb_resData(data){
      this.hflb_tableData = data;
      for(let i in this.hflb_tableData){
        this.hflb_tableData[i].car = this.hflb_tableData[i].plate_id + this.hflb_tableData[i].license_plate_number;
        this.hflb_tableData[i].expiration_time = this.$api.date_conversion(this.hflb_tableData[i].expiration_time);
        this.hflb_tableData[i].next_callback = this.$api.date_conversion(this.hflb_tableData[i].next_callback);
        this.hflb_tableData[i].callback_time = this.$api.date_conversion(this.hflb_tableData[i].callback_time);
        switch(this.hflb_tableData[i].type){
          case 1:{this.hflb_tableData[i].type = "项目回访"; break;}
          case 2:{this.hflb_tableData[i].type = "保养回访"; break;}
          case 3:{this.hflb_tableData[i].type = "生日回访"; break;}
          case 4:{this.hflb_tableData[i].type = "卡到期"; break;}
          case 5:{this.hflb_tableData[i].type = "保险到期"; break;}
          case 6:{this.hflb_tableData[i].type = "车检到期"; break;}
        }
        switch(this.hflb_tableData[i].member_status){
          case 1:{this.hflb_tableData[i].member_status = "即将过期"; break;}
          case 2:{this.hflb_tableData[i].member_status = "超期"; break;}
        }
        switch(this.hflb_tableData[i].status){
          case 0:{this.hflb_tableData[i].status = "待回访"; break;}
          case 1:{this.hflb_tableData[i].status = "已回访"; break;}
          case 2:{this.hflb_tableData[i].status = "无效"; break;}
        }
      }
    },
    hflb_handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.hflb_mytable.findList(this.$api.yuming + "/StoreAdmin/Callback/getCallbackList", data);
    },
    //
    sz_enter(){
      this.$api.HttpPost("/StoreAdmin/Callback/setCallbackConfig",
      {xiangmu_callback: this.sz_a,
      baoyang_callback: this.sz_b,
      shengri_callback: this.sz_c,
      ka_callback: this.sz_d,
      baoxian_callback: this.sz_e,
      nianjian_callback: this.sz_f})
      .then((data)=>{
        if(data.data.code === 200){
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Callback/callbackOverview", {}),
      this.$api.HttpPost("/StoreAdmin/Callback/callbackOverviewByEid", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
      this.show_title = data[2].data.data;
      this.tableData = data[3].data.data;
      for(let i in this.tableData){
        this.turnover_seriesData.splice(i, 0, this.tableData[i].rate);
        this.turnover_xData.splice(i, 0, this.tableData[i].name);
      }
      this.$api.bar_chart("回访完成率报表", "turnover", this.turnover_xData, null, this.turnover_seriesData);
    })
  }
}
</script>

<style scoped>
#huifangguanli{
  margin: 1rem 5rem;
}
.date{
  margin: 10px;
  height: 200px;
  background-color: #6699ff;
}
.el-divider{
  float: left;
  margin: 20px auto;
  height: 160px;
}
</style>
