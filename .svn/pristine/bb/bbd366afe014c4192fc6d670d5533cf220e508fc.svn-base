<template>
  <div id="cashRegister_gukeyuyue">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click()">
      <el-tab-pane label="顾客预约" name="one"><one :store_select="store_select" :people_select="people_select" :project_select="project_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="已处理预约" name="two"><two :store_select="store_select" :people_select="people_select" ref="two"></two></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./cashRegister_gukeyuyue/one.vue"
import two from "./cashRegister_gukeyuyue/two.vue"
export default{
  name: "cashRegister_gukeyuyue",
  components: {
    one,
    two
  },
  data(){
    return{
      activeName: "one",
      store_select: [],
      people_select: [],
      project_select: [],
    }
  },
  methods:{
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.handlePageChange();
          break;
        }
        case "two":{
          this.$refs.two.handlePageChange();
          break;
        }
      }
    }
  },
  mounted(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Client/getServiceItemSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
      this.project_select = data[2].data.data;
    })
    this.tab_click();
  }
}
</script>

<style scoped>

</style>
