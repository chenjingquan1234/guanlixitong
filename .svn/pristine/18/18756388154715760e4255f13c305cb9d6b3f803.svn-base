<template>
  <div id="Achievements_gongzibaobiao">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click">
      <el-tab-pane label="工资报表" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="当月工资" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <!-- <el-tab-pane label="历史工资表" name="three"><three></three></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import one from "./Achievements_gongzibaobiao/one"
import two from "./Achievements_gongzibaobiao/two"
import three from "./Achievements_gongzibaobiao/three"
export default{
  name: "Achievements_gongzibaobiao",
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
