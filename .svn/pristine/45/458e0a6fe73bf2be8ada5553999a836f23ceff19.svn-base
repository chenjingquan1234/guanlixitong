<template>
  <div id="setUp_fuwuxiangmu">
    <el-tabs v-model="activeName" type="card" @tab-click="tab_click">
      <el-tab-pane label="服务项目" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="服务产品分类" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <el-tab-pane label="附加项目" name="three"><three :store_select="store_select" ref="three"></three></el-tab-pane>
      <el-tab-pane label="设置工时" name="four"><four :store_select="store_select" ref="four"></four></el-tab-pane>
      <el-tab-pane label="已停用项目" name="five"><five :store_select="store_select" ref="five"></five></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./setUp_fuwuxiangmu/one.vue"
import two from "./setUp_fuwuxiangmu/two.vue"
import three from "./setUp_fuwuxiangmu/three.vue"
import four from "./setUp_fuwuxiangmu/four.vue"
import five from "./setUp_fuwuxiangmu/five.vue"
export default{
	name: "setUp_fuwuxiangmu",
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
		}
	},
  methods:{
    tab_click(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.init();
          this.$refs.one.handlePageChange();
          break;
        }
        case "two":{
          this.$refs.two.init();
          this.$refs.two.handlePageChange();
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
          this.$refs.five.init();
          this.$refs.five.handlePageChange();
          break;
        }
      }
    }
  },
  mounted(){
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect")
    .then((data)=>{
      this.store_select = data.data;
    })
    this.tab_click(this.activeName);
  }
}
</script>

<style scoped>
#setUp_fuwuxiangmu{
  margin: 1rem 5rem;
}
</style>
