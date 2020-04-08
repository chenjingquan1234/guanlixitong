<!--  -->
<template>
  <div>
    <div class="query-box">
      <el-button type="primary" plain size="mini" @click="search(1)">今日</el-button>
      <el-button type="primary" plain size="mini" @click="search(2)">本月</el-button>
      <el-button type="primary" plain size="mini" @click="search(3)">本年</el-button>
      
      <el-select
        style="margin:0 7px"
        v-model="store_value"
        clearable
        size="mini"
        placeholder="请选择所属门店"
      >
        <el-option
          v-for="(item, index) in store_select"
          :key="index"
          :label="item.store_name"
          :value="item.sid"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini" style="margin-left:10px" @click="search(0)"
        >查询</el-button
      >
    </div>
    <div id="bar" class="bar"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        store_value: 1,
        time:1,
    };
  },
  props: {
    store_select:{
        type:Array,
        default:()=>{[]}
    }
  },
  mounted() {
    //   this.$api.HttpPost("")
  },
  methods: {
      search(val) {
          val ? this.time = val : ""
          let sid = this.store_value
          let time = this.time
          this.$api.HttpPost("/storeadmin/financial/maolifenxi",{sid, time})
          .then(v => {
              let data = v.data.data.list
              let x = [],
              y = []
              console.log(this)
              data.forEach(item => {
                  x.push(item.date)
                  y.push(item.maoli)
              })
          this.$api.bar_chart("毛利统计", "bar", x, null, y)
          })
      }
  }
};
</script>

<style scoped>
.bar{
    width: 80%;
    height: 600px;
    margin: 0 auto;
    margin-top:50px
}
.query-box {
  width: 100%;
  padding: 0 5%;
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 10px auto;
}
.content {
  /* width: 100%; */
  padding: 10px 10rem;
  margin: 0 auto;
}
.date {
  margin: 10px;
  height: 200px;
  background-color: #6699ff;
}
.el-divider {
  float: left;
  margin: 20px auto;
  height: 160px;
}
.mt {
  margin-top: 20px;
  color: #666;
}
</style>
