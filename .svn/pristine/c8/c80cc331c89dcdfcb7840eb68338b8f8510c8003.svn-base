<template>
  <div id="one">
    <div class="pb-nav">
      <el-button size="mini" :type="tp===1?'primary':''" @click="search(1)">今日</el-button>
      <el-button size="mini" :type="tp===2?'primary':''" @click="search(2)">今月</el-button>
      <el-button size="mini" :type="tp===3?'primary':''" @click="search(3)">今年</el-button>
      <el-select size="mini" v-model="store_name" placeholder="所属门店" clearable @change="store_change">
        <el-option v-for="value in store_select" :key="value.sid" :label="value.store_name" :value="value.sid"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>

    <el-tabs type="border-card" v-model="activeName" @tab-click="tab_click">
      <el-tab-pane name="one">
        <label slot="label"><el-tooltip effect="dark" :content="chart_amount_y[0]" placement="bottom"><label>实收金额(元)</label></el-tooltip></label>
        <center><div id="amount" :style="{width: '1200px', height: '600px'}"></div></center>
      </el-tab-pane>
      <el-tab-pane name="two">
        <label slot="label"><el-tooltip effect="dark" :content="chart_output_y[0]" placement="bottom"><label>产值(元)</label></el-tooltip></label>
        <center><div id="output" :style="{width: '1200px', height: '600px'}"></div></center>
      </el-tab-pane>
      <el-tab-pane name="three">
        <label slot="label"><el-tooltip effect="dark" :content="chart_totalcar_y[0]" placement="bottom"><label>总到店台次(台)</label></el-tooltip></label>
        <center><div id="totalcar" :style="{width: '1200px', height: '600px'}"></div></center>
      </el-tab-pane>
      <el-tab-pane name="four">
        <label slot="label"><el-tooltip effect="dark" :content="chart_oldcar_y[0]" placement="bottom"><label>散客(台)</label></el-tooltip></label>
        <center><div id="oldcar" :style="{width: '1200px', height: '600px'}"></div></center>
      </el-tab-pane>
      <el-tab-pane name="five">
        <label slot="label"><el-tooltip effect="dark" :content="chart_newcar_y[0]" placement="bottom"><label>新客(台)</label></el-tooltip></label>
        <center><div id="newcar" :style="{width: '1200px', height: '600px'}"></div></center>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default{
  name: "one",
  data(){
    return{
      activeName: "one",
      tp: 2,
      store_name: "",
      chart_amount_x: [],
      chart_amount_y: [],
      chart_output_x: [],
      chart_output_y: [],
      chart_totalcar_x: [],
      chart_totalcar_y: [],
      chart_oldcar_x: [],
      chart_oldcar_y: [],
      chart_newcar_x: [],
      chart_newcar_y: []
    }
  },
  props:{
    "store_select": {
      type: Array,
      default: ()=>{}
    }
  },
  methods:{
    search(day){
      if(day !== undefined){
        this.tp = day;
      }
      this.init_amount({sid: this.store_name, time_type: this.tp});
      this.init_output({sid: this.store_name, time_type: this.tp});
      this.init_totalcar({sid: this.store_name, time_type: this.tp});
      this.init_oldcar({sid: this.store_name, time_type: this.tp});
      this.init_newcar({sid: this.store_name, time_type: this.tp});
    },
    store_change(s){
      this.store_name = s;
    },
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.init_amount({sid: this.store_name, time_type: this.tp});
          break;
        }
        case "two":{
          this.init_output({sid: this.store_name, time_type: this.tp});
          break;
        }
        case "three":{
          this.init_totalcar({sid: this.store_name, time_type: this.tp});
          break;
        }
        case "four":{
          this.init_oldcar({sid: this.store_name, time_type: this.tp});
          break;
        }
        case "five":{
          this.init_newcar({sid: this.store_name, time_type: this.tp});
          break;
        }
      }
    },
    init_amount(s){
      this.$api.HttpPost("/StoreAdmin/Financial/sumReceived", s)
      .then((data)=>{
        if(data.data.code === 200){
          this.chart_amount_x = data.data.data.categories;
          this.chart_amount_y = data.data.data.data;
          this.$api.bar_chart("实收金额趋势", "amount", this.chart_amount_x, null, this.chart_amount_y);
        }
      })
    },
    init_output(s){
      this.$api.HttpPost("/StoreAdmin/Financial/productionValue", s)
      .then((data)=>{
        if(data.data.code === 200){
          this.chart_output_x = data.data.data.categories;
          this.chart_output_y = data.data.data.data;
          this.$api.bar_chart("产值额趋势", "output", this.chart_output_x, null, this.chart_output_y);
        }
      })
    },
    init_totalcar(s){
      this.$api.HttpPost("/StoreAdmin/Financial/trains", s)
      .then((data)=>{
        if(data.data.code === 200){
          this.chart_totalcar_x = data.data.data.categories;
          this.chart_totalcar_y = data.data.data.data;
          this.$api.bar_chart("总到店台次趋势", "totalcar", this.chart_totalcar_x, null, this.chart_totalcar_y);
        }
      })
    },
    init_oldcar(s){
      this.$api.HttpPost("/StoreAdmin/Financial/individualTraveler", s)
      .then((data)=>{
        if(data.data.code === 200){
          this.chart_oldcar_x = data.data.data.categories;
          this.chart_oldcar_y = data.data.data.data;
          this.$api.bar_chart("散客趋势", "oldcar", this.chart_oldcar_x, null, this.chart_oldcar_y);
        }
      })
    },
    init_newcar(s){
      this.$api.HttpPost("/StoreAdmin/Financial/newCustomer", s)
      .then((data)=>{
        if(data.data.code === 200){
          this.chart_newcar_x = data.data.data.categories;
          this.chart_newcar_y = data.data.data.data;
          this.$api.bar_chart("新客趋势", "newcar", this.chart_newcar_x, null, this.chart_newcar_y);
        }
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
