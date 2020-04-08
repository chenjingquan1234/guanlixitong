<template>
  <div>
    <div class="contation">
          <div class="query-box">
            <el-select v-model="store_value" clearable size="mini" placeholder="所属门店">
              <el-option
                v-for="(item,index) in store_select"
                :key="index"
                :label="item.store_name"
                :value="item.sid"
              ></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="handleStore" style="margin-left:10px">查询</el-button>
          </div>
          <div id="ArrearsEcharts" style="width:1200px;height:600px;margin: 30px auto"></div>
        </div>
  </div>
</template>

<script>
export default {
  name: "First",
  components: {},
  props: {
    store_select: {
      type: Array,
      default: ()=>{[]}
    }
  },
  data() {
    return {
      // 门店选项框属性
      store_value: null,
      // echarts配置
      option: {
        backgroundColor: "#315A6E", //背景色
        title: {
          text: "欠账图标",
          x: "center",
          y: "top",
          textAlign: "left",
          textStyle: {
            color: "#fff",
            lett: "center"
          }
        },
         grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
        dataZoom: [
          {
            type: "slider",
            show: true,
            //   lineStyle: {
            //       height:10
            //   },
            xAxisIndex: [0],
            height: 10,
            showDetail: false,
            left: "10%",
            bottom: 5,
            start: 0,
            end: 20 //初始化滚动条
          }
        ],
        tooltip: {
          show: true, // 是否显示提示框，默认为true
          trigger: "item", // 数据项图形触发
          axisPointer: {
            // 指示样式
            type: "shadow",
            axis: "auto"
          },
          padding: 5,
          textStyle: {
            // 提示框内容的样式
            color: "#fff"
          }
        },
        xAxis: {
          data: [],
          // axisLabel: {
          //   textStyle: {
          //     color: "#fff" //坐标值得具体的颜色
          //   }
          // }
        },
        yAxis: {
          //  max : 200,
          min: 0,
          splitNumber: 5,
          axisLabel: {
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          }
        },
        series: [{
      name:'营业额',
      type:'bar',
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: 'white',
          fontSize: 10
        }
      },
      data: [],//[21, 72, 142, 0, 354, 22, 220]
    }],
        color: ["#3398DB"]
      }
    };
  },
  mounted() {
    this.getBarData();
  },
  methods: {
    // 获取bar图表数据
    getBarData(id = 1) {
      this.$api
        .HttpPost("/StoreAdmin/Credit/getCreditChart", {
          sid: id
        })
        .then(
          res => {
            let result = res.data;
            if (result.code == 200) {
              let data = result.data;
              let nameArr = [],
                valueArr = [];
              data.forEach(item => {
                nameArr.push(item.unit_name);
                valueArr.push(item.rest_credit);
              });
              this.option.xAxis.data = nameArr;
              this.option.series[0].data = valueArr;
              //基于准备好的dom，初始化echarts实例
              var myChart = this.$echarts.init(
                document.getElementById("ArrearsEcharts")
              );

              // 绘制图表
              myChart.setOption(this.option);
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    handleStore() {
      const { store_value } = this;
      this.getBarData(store_value);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.query-box {
  width: 100%;
  padding: 0 5%;
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  margin: 10px auto;
}
</style>
