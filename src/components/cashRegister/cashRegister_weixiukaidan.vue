<template>
  <div id="cashRegister_weixiukaidan">
    <el-tabs type="border-card" v-model="activeName" @tab-click="tab_click()">
      <el-tab-pane label="接车开单" name="one"><one v-if="is_show" @res="res" ref="tabsone"></one></el-tab-pane>
      <el-tab-pane label="待付款工单" name="two"><two :store_select="store_select" @settlement="settlement" ref="tabstwo"></two></el-tab-pane>
      <el-tab-pane label="已付款工单" name="three"><three :store_select="store_select" ref="tabsthree"></three></el-tab-pane>
      <el-tab-pane label="作废工单" name="four"><four :store_select="store_select"ref="tabsfour"></four></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./cashRegister_weixiukaidan/one"
import two from "./cashRegister_weixiukaidan/two"
import three from "./cashRegister_weixiukaidan/three"
import four from "./cashRegister_weixiukaidan/four"

export default{
  name: "cashRegister_weixiukaidan",
  data(){
    return{
      activeName: "one",
      store_select: [],
      is_show: true
    }
  },
  components:{
    one,
    two,
    three,
    four
  },
  methods:{
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.is_show = true;
          break;
        }
        case "two":{
          this.is_show = false;
          this.$refs.tabstwo.handlePageChange();
          break;
        }
        case "three":{
          this.is_show = false;
          this.$refs.tabsthree.handlePageChange();
          break;
        }
        case "four":{
          this.is_show = false;
          this.$refs.tabsfour.handlePageChange();
          break;
        }
      }
    },
    res(name){
      this.activeName = name;
      this.tab_click();
    },
    settlement(name, data){
      this.activeName = name;
      this.is_show = true;
      this.$nextTick(()=>{
        this.$refs.tabsone.gdh_cell_click(data);
      })
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {})
    .then((data)=>{
      this.store_select = data.data;
    })
  }
}
</script>

<style scoped>

</style>
