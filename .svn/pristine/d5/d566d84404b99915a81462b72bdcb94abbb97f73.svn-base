<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabChange">
      <el-tab-pane label="欠账图表" name="one">
        <One :store_select="store_select" ref="one"
      /></el-tab-pane>
      <el-tab-pane label="财务汇总" name="two"
        ><Two :store_select="store_select" :supplie_select="supplie_select" ref="two"
      /></el-tab-pane>
      <el-tab-pane label="财务明细" name="three"
        ><Three :store_select="store_select" :supplie_select="supplie_select" ref="three"
      /></el-tab-pane>
      <el-tab-pane label="销账记录" name="four"
        ><Four :store_select="store_select" :supplie_select="supplie_select" ref="four"
      /></el-tab-pane>
      <el-tab-pane label="作废列表" name="five"
        ><Five :store_select="store_select" :supplie_select="supplie_select" ref="five"
      /></el-tab-pane>
      <!-- <el-tab-pane label="视频帮助" name="vvv"><One/></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import One from "./Finance_caigouyingfu/one";
import Two from "./Finance_caigouyingfu/two";
import Three from "./Finance_caigouyingfu/three";
import Four from "./Finance_caigouyingfu/four";
import Five from "./Finance_caigouyingfu/five";

export default {
  name: "Finance_caigouyingfu",
  components: {
    One,
    Two,
    Three,
    Four,
    Five
  },
  data() {
    return {
      activeName: "one",
      store_select: [],
      supplie_select: []
    };
  },
  mounted() {
    // 获取门店列表
    this.$api.HttpPost("/StoreAdmin/Common/getStoreSelect").then(v => {
      this.store_select = v.data;
    });

    this.$api.HttpPost("/StoreAdmin/Statistics/getSupplierSelect").then(v => {
      this.supplie_select = v.data.data;
    });
  },
  methods: {
    handleTabChange(val) {
      switch (val.name) {
        case "one":
            this.$refs.one.handleStore()
          break;
        case "two":
            this.$refs.two.search()
          break;
        case "three":
            this.$refs.three.search()
          break;
        case "four":
            this.$refs.four.search()
          break;
        case "five":
            this.$refs.five.search()
          break;
      }
    }
  }
};
</script>

<style scoped></style>
