<template>
  <div id="Achievements_yuangongguanli">
    <el-tabs type="card" v-model="activeName" @tab-click="tab_click()">
      <el-tab-pane label="在职员工" name="one"><one ref="one"></one></el-tab-pane>
      <el-tab-pane label="班组管理" name="two"><two ref="two"></two></el-tab-pane>
      <el-tab-pane label="离职员工" name="three"><three ref="three"></three></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Achievements_yuangongguanli/one"
import two from "./Achievements_yuangongguanli/two"
import three from "./Achievements_yuangongguanli/three"
export default{
  name: "Achievements_yuangongguanli",
  components: {
    one,
    two,
    three
  },
  data(){
    return{
      activeName: "one"
    }
  },
  methods:{
    tab_click(){
       switch(this.activeName){
         case "one": {
           this.$refs.one.handlePageChange();
           break;
         }
         case "two": {
           this.$refs.two.findList();
           break;
         }
         case "three": {
           this.$refs.three.handlePageChange();
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

</style>
