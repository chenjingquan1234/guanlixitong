<template>
  <div id="Achievements_yejibaobiao">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click">
      <el-tab-pane label="业绩报表" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="业绩汇总" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <el-tab-pane label="商品销售业绩" name="three"><three :store_select="store_select" :people_select="people_select" :num="3" ref="three"></three></el-tab-pane>
      <el-tab-pane label="商品施工业绩" name="four"><three :store_select="store_select" :people_select="people_select" :num="4" ref="four"></three></el-tab-pane>
      <el-tab-pane label="服务销售业绩" name="five"><three :store_select="store_select" :people_select="people_select" :num="5" ref="five"></three></el-tab-pane>
      <el-tab-pane label="服务施工业绩" name="six"><three :store_select="store_select" :people_select="people_select" :num="6" ref="six"></three></el-tab-pane>
      <el-tab-pane label="会员卡业绩" name="seven"><three :store_select="store_select" :people_select="people_select" :num="7" ref="seven"></three></el-tab-pane>
      <el-tab-pane label="计次卡业绩" name="eight"><three :store_select="store_select" :people_select="people_select" :num="8" ref="eight"></three></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Achievements_yejibaobiao/one"
import two from "./Achievements_yejibaobiao/two"
import three from "./Achievements_yejibaobiao/three"
export default{
  name: "Achievements_yejibaobiao",
  components: {
    one,
    two,
    three
  },
  data(){
    return{
      activeName: "one",
      store_select: [],
      people_select: []
    }
  },
  methods:{
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.search();
          break;
        }
        case "two":{
          this.$refs.two.search();
          break;
        }
        case "three":{
          this.$refs.three.search();
          break;
        }
        case "four":{
          this.$refs.four.search();
          break;
        }
        case "five":{
          this.$refs.five.search();
          break;
        }
        case "six":{
          this.$refs.six.search();
          break;
        }
        case "seven":{
          this.$refs.seven.search();
          break;
        }
        case "eight":{
          this.$refs.eight.search();
          break;
        }
      }
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
    this.tab_click(this.activeName);
  }
}
</script>

<style scoped>

</style>
