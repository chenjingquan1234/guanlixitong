<template>
  <div id="setUp_jibenshezhi">
    <el-row type="flex">
      <el-col :span="3">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo"
        background-color="#e6e6e6" text-color="#303030" active-text-color="#409eff" @select="handleSelect">
          <el-menu-item v-for="value in menu" :key="value.key" :index="value.key.toString()">
            <span>{{value.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div v-if="menu_index === 1">
          <el-tabs v-model="activeName" type="card" @tab-click="tab_click">
            <el-tab-pane label="账类" name="one"><maintenanceOne ref="one"></maintenanceOne></el-tab-pane>
            <el-tab-pane label="维修类型" name="two"><maintenanceTwo ref="two"></maintenanceTwo></el-tab-pane>
            <el-tab-pane label="洗车类型" name="three"><maintenanceThree ref="three"></maintenanceThree></el-tab-pane>
            <el-tab-pane label="工位" name="four"><maintenanceFour ref="four"></maintenanceFour></el-tab-pane>
            <el-tab-pane label="检查报告" name="five"><maintenanceFive ref="five"></maintenanceFive></el-tab-pane>
            <el-tab-pane label="维修类别" name="six"><maintenanceSix ref="six"></maintenanceSix></el-tab-pane>
            <el-tab-pane label="质保说明" name="seven"><maintenanceSeven ref="seven"></maintenanceSeven></el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="menu_index === 2">
          <paymentOne></paymentOne>
        </div>
        <div v-if="menu_index === 3">
          <carOne></carOne>
        </div>
        <div v-if="menu_index === 4">
          <unitOne></unitOne>
        </div>
        <div v-if="menu_index === 5">
          <insuranceOne></insuranceOne>
        </div>
        <div v-if="menu_index === 6">
          <printOne></printOne>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import maintenanceOne from './setUp_jibenshezhi/maintenance_one.vue'
import maintenanceTwo from './setUp_jibenshezhi/maintenance_two.vue'
import maintenanceThree from './setUp_jibenshezhi/maintenance_three.vue'
import maintenanceFour from './setUp_jibenshezhi/maintenance_four.vue'
import maintenanceFive from './setUp_jibenshezhi/maintenance_five.vue'
import maintenanceSix from './setUp_jibenshezhi/maintenance_six.vue'
import maintenanceSeven from './setUp_jibenshezhi/maintenance_seven.vue'

import paymentOne from './setUp_jibenshezhi/payment_one.vue'
import carOne from './setUp_jibenshezhi/car_one.vue'
import unitOne from './setUp_jibenshezhi/unit_one.vue'
import insuranceOne from './setUp_jibenshezhi/insurance_one.vue'
import printOne from './setUp_jibenshezhi/print_one.vue'
export default{
  name: "setUp_jibenshezhi",
  components:{
    maintenanceOne,
    maintenanceTwo,
    maintenanceThree,
    maintenanceFour,
    maintenanceFive,
    maintenanceSix,
    maintenanceSeven,
    paymentOne,
    carOne,
    unitOne,
    insuranceOne,
    printOne
  },
  data(){
    return{
      activeIndex: "1",
      menu_index: 1,
      menu: [
        {name: "维修项", key: 1},
        {name: "支付设置", key: 2},
        {name: "车牌设置", key: 3},
        {name: "单位设置", key: 4},
        {name: "保险设置", key: 5},
        {name: "打印设置", key: 6},
        // {name: "打印设置", key: 7},
        // {name: "签名设置", key: 8},
        // {name: "提醒设置", key: 9},
        // {name: "轮胎设置", key: 10},
        // {name: "客户资料设置", key: 11}
      ],
      activeName: "one"
    }
  },
  methods:{
    handleSelect(key){
      key = Number(key);
      this.menu_index = key;
    },
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.init();
          this.$refs.one.getSelect();
          break;
        }
        case "two":{
          this.$refs.two.init();
          this.$refs.two.getSelect();
          break;
        }
        case "three":{
          this.$refs.three.init();
          break;
        }
        case "four":{
          this.$refs.four.init();
          this.$refs.four.getSelect();
          break;
        }
        case "five":{
          this.$refs.five.tab_click();
          break;
        }
        case "six":{
          this.$refs.six.init();
          this.$refs.six.getSelect();
          break;
        }
        case "seven":{
          this.$refs.seven.init();
          break;
        }

      }
    }
  },
  mounted(){
    this.tab_click();
  }
}
</script>

<style scoped>
.el-menu{
  position: fixed;
  height: 100%;
}
.el-menu-vertical-demo{
  width: 100%;
  max-width: 10rem;
}
.el-tabs{
  margin: 1rem auto;
}
</style>
