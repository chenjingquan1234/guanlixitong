<template>
  <div id="Stock_kucuntongji">
    <el-tabs type="card" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="库存统计" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="库存查询" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
<!--      <el-tab-pane label="销售出库表" name="three" disabled><three></three></el-tab-pane>
      <el-tab-pane label="滞销商品排行" name="four" disabled><four></four></el-tab-pane>
      <el-tab-pane label="商品销售对比" name="five" disabled><five></five></el-tab-pane>
      <el-tab-pane label="商品收发明细表" name="six" disabled><six></six></el-tab-pane>
      <el-tab-pane label="商品收发汇总表" name="seven" disabled><seven></seven></el-tab-pane> -->
      <el-tab-pane label="库存预警" name="eight"><eight :store_select="store_select" ref="eight"></eight></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Stock_kucuntongji/one.vue"
import two from "./Stock_kucuntongji/two.vue"
import three from "./Stock_kucuntongji/three.vue"
import four from "./Stock_kucuntongji/four.vue"
import five from "./Stock_kucuntongji/five.vue"
import six from "./Stock_kucuntongji/six.vue"
import seven from "./Stock_kucuntongji/seven.vue"
import eight from "./Stock_kucuntongji/eight.vue"
export default{
  name: "Stock_kucuntongji",
  components:{
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight
  },
  data(){
    return{
      activeName: "one",
      store_select: []
    }
  },
  methods:{
    tabClick: function(s){
      switch(s.name){
        case "one":{
          this.$refs.one.search();
          break;
        }
        case "two":{
          this.$refs.two.handlePageChange();
          break;
        }
        case "eight":{
          this.$refs.eight.handlePageChange();
          break;
        }
      }
    },
  },
  mounted(){
    this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true})
    .then((data)=>{
      this.store_select = data.data;
    })
  }
}
</script>

<style scoped>
</style>
