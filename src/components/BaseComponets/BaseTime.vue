<!-- 
使用： 父组件定义 v-model
  demo： 
    data: times: {}
    const {start_time, end_time} = this.times
 -->
<template>
  <div>
    <el-date-picker
      size="small"
      v-model="time"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd "
      value-format="timestamp"
      :picker-options="pickerOptions"
      @change="handleChange"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  model: {
    prop: "times",
    event: "change"
  },
  props: {
    times: {
      type: Object
    }
  },
  data() {
    return {
      time: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  //   mounted() {},
  methods: {
    handleChange() {
      const times = {};
      if(this.time) {
        times.start_time = (this.time[0] + "").substr(0, 10);
        times.end_time = (this.time[1] + "").substr(0, 10);
      } 
      this.$emit("change", times);
    }
  }
};
</script>

<style scoped>
</style>