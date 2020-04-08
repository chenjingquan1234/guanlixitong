<template>
  <div id="one">
    <div class="pb-nav">
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
      store_name: "",
      title: "工资报表",
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
      this.init({sid: this.store_name});
    },
    achievement_echarts(){
      this.$api.bar_chart(this.title, this.id, this.xData, this.yData, this.seriesData);
    },
    init(pdata){
      if(pdata === undefined){pdata = {}}
      this.$api.HttpPost("/storeadmin/staff/getWageList", pdata)
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
