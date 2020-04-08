<template>
  <div id="three">
    <div class="pb-nav">
      <el-button size="mini" :type="tp === 1?'primary':''" @click="search(1)">今日</el-button>
      <el-button size="mini" :type="tp === 2?'primary':''" @click="search(2)">本月</el-button>
      <el-button size="mini" :type="tp === 3?'primary':''" @click="search(3)">本年</el-button>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <el-row class="date">
      <el-col :offset="2" :span="4">
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">总到店台次</label>
          <h1 style="line-height: 1px">{{show_title.allTimes}}</h1>
        </div>
      </el-col>
      <el-col :span="4">
        <el-divider direction="vertical"></el-divider>
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">会员消费</label>
          <h1 style="line-height: 1px">{{show_title.memberTimes}}</h1>
          <label style="line-height: 80px;">(占比{{proportion[0]}})</label>
        </div>
      </el-col>
      <el-col :span="4">
        <el-divider direction="vertical"></el-divider>
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">散客消费</label>
          <h1 style="line-height: 1px">{{show_title.isNotMemberTimes}}</h1>
          <label style="line-height: 80px;">(占比{{proportion[1]}})</label>
        </div>
      </el-col>
      <el-col :span="4">
        <el-divider direction="vertical"></el-divider>
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">新客到店</label>
          <h1 style="line-height: 1px">{{show_title.isNewMemberTimes}}</h1>
          <label style="line-height: 80px;">(占比{{proportion[2]}})</label>
        </div>
      </el-col>
      <el-col :span="4">
        <el-divider direction="vertical"></el-divider>
        <div style="color: #ffffff; display: flex; flex-direction: column; align-items: center;">
          <label style="line-height: 100px;">老客到店</label>
          <h1 style="line-height: 1px">{{show_title.oldMemberTimes}}</h1>
          <label style="line-height: 80px;">(占比{{proportion[3]}})</label>
        </div>
      </el-col>
    </el-row>

    <mytable :tableTitle="tableTitle" :tableData="tableData" :paging="paging" :number="number" :operation="operation" @resData="resData" @handlePageChange="handlePageChange" ref="mytable"></mytable>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"
export default{
  name: "three",
  components:{
    mytable
  },
  data(){
    return{
      tableTitle: [
        {key: "date", title: "日期", min_width: "100"},
        {key: "allTimes", title: "总到店台次", min_width: "100"},
        {key: "memberTimes", title: "会员消费", min_width: "100"},
        {key: "memberProportion", title: "会员占比", min_width: "100"},
        {key: "isNotMemberTimes", title: "散客消费", min_width: "100"},
        {key: "isNotMemberProportion", title: "散客占比", min_width: "100"},
        {key: "isNewMemberTimes", title: "新客到店", min_width: "100"},
        {key: "isNewMemberProportion", title: "新客占比", min_width: "100"},
        {key: "oldMemberTimes", title: "老客到店", min_width: "100"},
        {key: "oldMemberProportion", title: "老客占比", min_width: "100"}
      ],
      tableData: [],
      operation: false,
      number: false,
      paging: false,
      //数据
      tp: 2,
      store_name: "",
      show_title: [],
      proportion: []
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search(s){
      if(s !== undefined){
        this.tp = s;
      }
      this.init({sid: this.store_name, time_type: this.tp});
      this.handlePageChange({sid: this.store_name, time_type: this.tp});
    },
    store_change(s){
      this.store_name = s;
    },
    math(data){
      if(this.show_title.allTimes === 0){return 0}
      return Math.round(data/this.show_title.allTimes*100) + "%";
    },
    resData(data){
      this.tableData = data;
      for(let i in this.tableData){
        this.tableData[i].memberProportion = (this.tableData[i].memberTimes/this.tableData[i].allTimes*100).toFixed(2) + "%";
        this.tableData[i].isNotMemberProportion = (this.tableData[i].isNotMemberTimes/this.tableData[i].allTimes*100).toFixed(2) + "%";
        this.tableData[i].isNewMemberProportion = (this.tableData[i].isNewMemberTimes/this.tableData[i].allTimes*100).toFixed(2) + "%";
        this.tableData[i].oldMemberProportion = (this.tableData[i].oldMemberTimes/this.tableData[i].allTimes*100).toFixed(2) + "%";
        if(this.tableData[i].memberTimes == 0){
          this.tableData[i].memberProportion = 0 + "%";
        }
        if(this.tableData[i].isNotMemberTimes == 0){
          this.tableData[i].isNotMemberProportion = 0 + "%";
        }
        if(this.tableData[i].isNewMemberTimes == 0){
          this.tableData[i].isNewMemberProportion = 0 + "%";
        }
        if(this.tableData[i].oldMemberTimes == 0){
          this.tableData[i].oldMemberProportion = 0 + "%";
        }
      }
    },
    handlePageChange(data){
      if(data === undefined){data = {}}
      this.$refs.mytable.findList(this.$api.yuming + "/StoreAdmin/Financial/getCarComesTimesList", data);
    },
    init(s){
      this.$api.HttpPost("/StoreAdmin/Financial/getCarComesTimes", s)
      .then((data)=>{
        this.show_title = data.data.data;
        this.proportion[0] = this.math(this.show_title.memberTimes);
        this.proportion[1] = this.math(this.show_title.isNotMemberTimes);
        this.proportion[2] = this.math(this.show_title.isNewMemberTimes);
        this.proportion[3] = this.math(this.show_title.oldMemberTimes);
      })
    }
  }
}
</script>

<style scoped>
#three{
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
