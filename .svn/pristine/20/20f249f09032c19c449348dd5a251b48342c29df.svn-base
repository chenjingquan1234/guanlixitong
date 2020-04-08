<template>
  <div id="Achievements_maolibaobiao">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click">
      <el-tab-pane label="毛利报表" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="贡献毛利统计" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <!-- <el-tab-pane label="员工贡献毛利报表" name="three"><three></three></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import one from "./Achievements_maolibaobiao/one"
import two from "./Achievements_maolibaobiao/two"
import three from "./Achievements_maolibaobiao/three"
export default{
  name: "Achievements_maolibaobiao",
  components: {
    one,
    two,
    three
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
          this.$refs.one.search();
          break;
        }
        case "two":{
          this.$refs.two.search();
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
    this.tab_click(this.activeName);
  }
}
</script>

<style scoped>

</style>
