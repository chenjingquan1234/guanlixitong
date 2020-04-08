<template>
  <div id="youhuiquan">
    <el-tabs type="card" v-model="activeName" tabPosition="left" @tab-click="tabClick">
      <el-tab-pane label="优惠券列表" name="one"><one :store_select="store_select" ref="one"></one></el-tab-pane>
      <el-tab-pane label="优惠券赠送" name="two"><two :store_select="store_select" ref="two"></two></el-tab-pane>
      <el-tab-pane label="优惠券发送记录" name="three"><three :store_select="store_select" :people_select="people_select" ref="three"></three></el-tab-pane>
      <el-tab-pane label="优惠券使用记录" name="four"><four :store_select="store_select" :people_select="people_select" ref="four"></four></el-tab-pane>
      <el-tab-pane label="优惠券发送统计" name="five"><five :store_select="store_select" :people_select="people_select" ref="five"></five></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import one from "./youhuiquan/one.vue"
import two from "./youhuiquan/two.vue"
import three from "./youhuiquan/three.vue"
import four from "./youhuiquan/four.vue"
import five from "./youhuiquan/five.vue"
export default{
	name: "youhuiquan",
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
      people_select: []
		}
	},
  methods:{
    tabClick: function(){
      switch(this.activeName){
        case "one":{
          this.$refs.one.handlePageChange();
          break;
        }
        case "two":{
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
          this.$refs.five.handlePageChange();
          break;
        }
      }
    }
  },
  mounted(){
    this.$axios.all([
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getStoreSelect", {}, {withCredentials: true}),
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Common/getEmployeeSelect", {}, {withCredentials: true})
    ])
    .then((data)=>{
      this.store_select = data[0].data;
      this.people_select = data[1].data;
    })
    .catch((data)=>{
      this.$message.error("抱歉网络错误,请检查网络后重试！");
    })
    this.tabClick();
  }
}
</script>

<style scoped>
#youhuiquan{
  margin: 1rem 5rem;
}
</style>
