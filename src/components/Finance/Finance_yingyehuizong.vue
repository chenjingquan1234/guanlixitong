<template>
  <div id="Finance_yingyehuizong">
    <el-tabs type="card" v-model="activeName" @tab-click="tab_click">
      <el-tab-pane label="营业汇总" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="实收金额分析" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <el-tab-pane label="到店台次分析" name="three"><three :store_select="store_select" ref="three"></three></el-tab-pane>
      <el-tab-pane label="已结算单汇总" name="four"><four :store_select="store_select" ref="four"></four></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Finance_yingyehuizong/one.vue"
import two from "./Finance_yingyehuizong/two.vue"
import three from "./Finance_yingyehuizong/three.vue"
import four from "./Finance_yingyehuizong/four.vue"
export default{
  name: "Finance_yingyehuizong",
  components:{
    one,
    two,
    three,
    four
  },
  data(){
    return{
      activeName: "one",
      store_select: []
    }
  },
  methods:{
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.tab_click();
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
      }
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
      this.store_select = data.data;
    })
    this.tab_click();
  }
}
</script>

<style scoped>
</style>
