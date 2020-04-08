<!--  -->
<template>
  <div class="contatain">
    <div class="query-box">

      <el-button size="mini" :type="tp === 1?'primary':''" @click="search(1)">今日</el-button>
      <el-button size="mini" :type="tp === 2?'primary':''" @click="search(2)">本月</el-button>
      <el-button size="mini" :type="tp === 3?'primary':''" @click="search(3)">本年</el-button>
      <el-button size="mini" :type="tp === 4?'primary':''" @click="search(4)" disabled>历史</el-button>
      <el-date-picker size="mini"
        v-model="begin_date"
        align="right"
        type="date"
        placeholder="开始日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-date-picker size="mini"
        v-model="over_date"
        align="right"
        type="date"
        placeholder="结束日期|时间"
        :picker-options="pickerOptions">
      </el-date-picker>

      <!-- <el-button type="primary" plain size="mini" @click="search(1)">今日</el-button> -->
      <!-- <el-button type="primary" plain size="mini" @click="search(2)">本月</el-button> -->
      <!-- <el-button type="primary" plain size="mini" @click="search(3)">本年</el-button> -->
      <!-- <el-date-picker
        style="margin:0 7px"
        size="mini"
        value-format="timestamp"
        v-model="date_time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker> -->
      <el-select
        style="margin:0 7px"
        v-model="store_value"
        clearable
        size="mini"
        placeholder="请选择所属门店"
      >
        <el-option
          v-for="(item, index) in store_select"
          :key="index"
          :label="item.store_name"
          :value="item.sid"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="search(0)" style="margin-left:10px"
        >查询</el-button
      >
    </div>
    <div class="content">
      <el-row class="date">
        <el-col :span="6">
          <div
            style="color: #ffffff; display: flex; flex-direction: column; align-items: center;"
          >
            <label style="line-height: 100px;">产品收入</label>
            <h1 style="line-height: 1px">{{shouru || 0}}</h1>
          </div>
        </el-col>
        <el-col :span="6">
          <el-divider direction="vertical"></el-divider>
          <div
            style="color: #ffffff; display: flex; flex-direction: column; align-items: center;"
          >
            <label style="line-height: 100px;">成本</label>
            <h1 style="line-height: 1px">{{chengben || 0}}</h1>
          </div>
        </el-col>
        <el-col :span="6">
          <el-divider direction="vertical"></el-divider>
          <div
            style="color: #ffffff; display: flex; flex-direction: column; align-items: center;"
          >
            <label style="line-height: 100px;">毛利</label>
            <h1 style="line-height: 1px">{{maoli || 0}}</h1>
          </div>
        </el-col>
        <el-col :span="6">
          <el-divider direction="vertical"></el-divider>
          <div
            style="color: #ffffff; display: flex; flex-direction: column; align-items: center;"
          >
            <label style="line-height: 100px;">毛利率</label>
            <h1 style="line-height: 1px">{{maolilv || 0}}</h1>
          </div>
        </el-col>

      </el-row>
        <h3 class="mt">服务项目</h3>
      <vxe-table
        style="border:1px solid #e0e0e0;margin-top:7px"
        size="mini"
        :border="true"
        align="center"
        show-header
        :data="tableData_1"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          :field="item.field"
          :formatter="formatterSex"
          :min-width="item.min_width"
          :title="item.title"
          v-for="(item, index) in tableTitle"
          :key="index"
        ></vxe-table-column>
      </vxe-table>
      <h3 class="mt">维修配件</h3>
      <vxe-table
      style="border:1px solid #e0e0e0;margin-top:7px"
        size="mini"
        border="none"
        align="center"
        show-header
        :data="tableData_2"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          :field="item.field"
          :formatter="formatterSex"
          :min-width="item.min_width"
          :title="item.title"
          v-for="(item, index) in tableTitle"
          :key="index"
        ></vxe-table-column>
      </vxe-table>
    </div>
  </div>
</template>

<script>
// import mytable from "../mytable";
export default {
  components: {
    // mytable
  },
  props:{
      store_select:{
          type:Array,
          default:()=>{[]}
      }
  },
  data() {
    return {
      // 时间
      tp:1,
      begin_date: new Date(new Date().getTime() - 31536000000),
      over_date: new Date(),
       pickerOptions: {
        disabledDate(time){return time.getTime() > Date.now();},
        shortcuts: [{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}},
        {text: '昨天',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24);picker.$emit('pick', date);}},
        {text: '一周前',onClick(picker){const date = new Date();date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', date);}}]
      },
      chengben:0,
      shouru:0,
      maoli:0,
      maolilv:0,
      store_value:1,
      date_time: "",
      time:1,
      tableTitle: [
        { field: "classify_name", title: "大类名称"},
        { field: "cost", title: "成本" },
        { field: "amount", title: "业绩"  },
        { field: "maoli", title: "毛利"  },
        { field: "maolilv", title: "毛利率" }
      ],
   
      tableData_1: [],
      tableData_2: []
    };
  },
  mounted() {
      this.search()
  },
  methods: {
      formatterSex({cellValue}) {
          return cellValue ? cellValue : 0
      },
      search(day) {
         switch(day) {
        case 1: 
          this.begin_date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          this.over_date = new Date()
          break;
        case 2: 
          this.begin_date = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          this.over_date = new Date(new Date().getFullYear(), new Date().getMonth()+1, 1)
          break; 
        case 3: 
          this.begin_date = new Date(new Date().getFullYear(), 0, 1)
          this.over_date = new Date(new Date().getFullYear(), 11, 31)
          break;
        case 4: 
          this.begin_date = ""
          this.over_date = ""
          break;
      }
      this.tp = day;
      const start_time = (new Date(this.begin_date).getTime()+ '').substr(0, 10)
      const end_time = (new Date(this.over_date).getTime()+ '').substr(0, 10)


          // val ? this.time = val : ""
          let sid = this.store_value || 2
          // let time = this.time
          this.$api.HttpPost("/storeadmin/financial/maoligaiKuang",{sid,start_time, end_time})
          .then(v => {
              if(v.data.code = 200) {
                  let data = v.data.data
                  this.chengben = data.chengben
                  this.shouru = data.shouru
                  this.maoli = data.maoli
                  this.maolilv = data.maolilv
                  this.tableData_1 = data.firstList
                  this.tableData_2 = data.secondList
              }
          })
      }
  }
};
</script>

<style scoped>
.query-box {
  width: 100%;
  padding: 0 5%;
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 10px auto;
}
.content {
  /* width: 100%; */
  padding: 10px 10rem;
  margin: 0 auto;
}
.date {
  margin: 10px;
  height: 200px;
  background-color: #6699ff;
}
.el-divider {
  float: left;
  margin: 20px auto;
  height: 160px;
}
.mt {
    margin-top:20px;
    color: #666
}
</style>
