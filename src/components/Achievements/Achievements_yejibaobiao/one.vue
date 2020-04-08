<template>
  <div id="one">
    <div class="pb-nav">
      <el-date-picker v-model="s_time" size="mini" type="datetimerange" clearable :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <el-divider></el-divider>
    <center><div id="achievement_echart" :style="{width: '1200px', height: '600px'}"></div></center>
  </div>
</template>

<script>
export default{
	name: "one",
	data(){
		return{
      pickerOptions: {
        shortcuts: [{text: '最近一周',onClick(picker){const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}},
        {text: '最近一个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);picker.$emit('pick', [start, end]);}},
        {text: '最近三个月',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);picker.$emit('pick', [start, end]);}}]
      },
      s_time: ["", ""],
      store_name: "",
      title: "业绩报表",
      id: "achievement_echart",
      xData: [],
      yData: [],
      seriesData: [],
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
      if(this.s_time === null){
        this.s_time = [];
        this.s_time[0] = "";
        this.s_time[1] = "";
      }
      this.init({start_time: this.s_time[0], end_time: this.s_time[1], sid: this.store_name});
    },
    achievement_echarts(){
      this.$api.bar_chart(this.title, this.id, this.xData, this.yData, this.seriesData);
    },
    init(pdata){
      if(pdata === undefined){pdata = {}}
      this.$api.HttpPost("/storeadmin/staff/getPerformanceList", pdata)
      .then((data)=>{
        let s = data.data.data;
        this.xData = s.categories;
        this.seriesData = s.data;
        this.achievement_echarts();
      })
    }
  }
}
</script>

<style scoped>
#one{
  margin: 1rem 5rem;
}
</style>
