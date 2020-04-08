<template>
  <div id="Stock_lingliaochuku">
    <el-tabs type="card" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="领料统计" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="领料单" name="two"><two v-if="cgd" :store_select="store_select" :people_select="people_select" @reload_cgd="reload_cgd" ref="two"></two></el-tab-pane>
      <el-tab-pane label="领料单据" name="three"><three :store_select="store_select" :people_select="people_select" ref="three"></three></el-tab-pane>
      <el-tab-pane label="领料明细" name="four"><four :store_select="store_select" ref="four"></four></el-tab-pane>
      <el-tab-pane label="作废单据" name="five"><five :store_select="store_select" :people_select="people_select" ref="five"></five></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./Stock_lingliaochuku/one.vue"
import two from "./Stock_lingliaochuku/two.vue"
import three from "./Stock_lingliaochuku/three.vue"
import four from "./Stock_lingliaochuku/four.vue"
import five from "./Stock_lingliaochuku/five.vue"
export default{
  name: "Stock_lingliaochuku",
  components:{
    one,
    two,
    three,
    four,
    five
  },
  data(){
    return{
      activeName: "one",
      store_select: [],
      people_select: [],
      cgd: true
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
          this.reload_cgd();
          break;
        }
        case "three":{
          this.$refs.three.handlePageChange();
          break;
        }
        case "four":{
          this.$refs.four.handlePageChange();
          break;
        }
        case "five":{
          this.$refs.five.handlePageChange();
          break;
        }
      }
    },
    reload_cgd: function(){
      this.cgd = false;
      this.$nextTick(()=>{
        this.cgd = true
      })
    },
  },
  created(){
    this.$axios.all([
      this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect", {}),
      this.$api.HttpPost("/StoreAdmin/Common/getEmployeeSelect", {})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
  }
}
</script>

<style scoped>
</style>
