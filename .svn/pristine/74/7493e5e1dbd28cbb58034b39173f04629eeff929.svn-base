import Vue from "vue"
import VueResource from 'vue-resource'
import axios from "axios"
import store from "./../vuex/store"
import router from "./../router/index"

let v = new Vue();

//域名
const yuming = "https://test.hfbsoftware.com";
//请求
let HttpGet = (url, data, other)=>{
  // data.token = sessionStorage.token;
  return new Promise((resolve, reject)=>{
    axios.get(yuming + url, data, {withCredentials: true})
    .then((success)=>{
      resolve(success)
    })
    .catch((error)=>{
      v.$message.error("抱歉网络错误,请检查网络后重试!");
      reject(error)
    })
  })
}

let HttpPost = (url, data, other)=>{
  // data.token = sessionStorage.token;
  return new Promise((resolve, reject)=>{
    axios.post(yuming + url, data, {withCredentials: true})
    .then((success)=>{
      resolve(success)
    })
    .catch((error)=>{
      if(error.response.status === 401){
        router.push({path: "/enter"});
        v.$message.warning("登录过期--请您重新登录");
        return;
      }
      v.$message.error("抱歉网络错误,请检查网络后重试!");
      reject(error)
    })
  })
}
//日期转换
const date_conversion = (date)=>{
  if(date === 0 && date === undefined){
    v.$message.warning('日期为空');
    return;
  }
  date = date * 1000;
  let year = new Date(date).getFullYear();
  let month = Number(new Date(date).getMonth() + 1);
  let day = new Date(date).getDate();
  if(month < 10){month = "0" + month}
  if(day < 10){day = "0" + day}
  let new_date = year + "-" + month + "-" + day;
  return new_date;
}
//数学运算
const mt_total = (quantity, price, discount, amount)=>{
  if(quantity === undefined || price === undefined || discount === undefined || amount === undefined){
    return;
  }
  amount = quantity * price * discount * 0.1;
  return amount;
}
const mt_discount = (discount)=>{
  if(discount === undefined){
    return;
  }
  if(discount < 0 || discount > 10){
    discount = 10;
    v.$message.warning("请选择1-10内的折扣");
    return discount;
  }
  else{
    return discount;
  }
}
//弹框
const message_box = (message, title, list)=>{
  v.$prompt(message, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
  .then(({value})=>{
    return value;
  })
  .catch(({value})=>{
    return value;
  })
}
//图片上传
const img_before_upload = (file)=>{
  let isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
  let isLtM = file.size / 1024 / 1024 < 2;
  if(!isJPG){
    v.$message.error('请上传JPG或PNG格式图片');
  }
  if(!isLtM){
    v.$message.error('请上传小于2M的图片');
  }
  return isJPG && isLtM;
}
const img_upload = (file)=>{
  let formData = new FormData();
  formData.append("file", file.file);
  return new Promise((resolve, reject)=>{
    axios.post(yuming + "/StoreAdmin/Common/uploadImg", formData, {withCredentials: true}, {headers: {"Content-Type": "multipart/form-data"}})
    .then((success)=>{
      resolve(success)
      v.$message.success("图片上传成功");
    })
    .catch((error)=>{
      reject(error)
    })
  })
}
//文件上传
const file_before_upload = (file)=>{
  let isCVS = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "application/vnd.ms-excel";
  if(!isCVS){
    v.$message.error('请上传CVS,XLS或XLSX格式文件');
  }
  return isCVS;
}
const file_upload = (file, url)=>{
  let formData = new FormData();
  formData.append("file", file.file);
  return new Promise((resolve, reject)=>{
    axios.post(yuming + url, formData, {withCredentials: true})
    .then((success)=>{
      resolve(success)
      v.$message.success("文件上传完毕");
    })
    .catch((error)=>{
      reject(error)
    })
  })
}
//图表
const bar_chart = (title, id, xData, yData, seriesData)=>{
  let bar = v.$echarts.init(document.getElementById(id));
  bar.setOption({
    title: {text: title, left: 'center', textStyle: {color: '#ffffff'}},
    textStyle: {color: '#ffffff'},
    backgroundColor: '#315a6e',
    color: '#3398DB',
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'}
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [{
      type : 'category',
      data : xData,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {alignWithLabel: true}
    }],
    yAxis: [{
      type : 'value'
    }],
    // dataZoom: [
    //   {
    //     start:0,//默认为0
    //     end: 100,//默认为100
    //     type: 'slider',
    //     show: true,
    //     xAxisIndex: [0],
    //     handleSize: 0,//滑动条的 左右2个滑动条的大小
    //     height: 5,//组件高度
    //     // left: '10%', //左边的距离
    //     // right: '10%',//右边的距离
    //     bottom: 25,//右边的距离
    //     borderColor: "#3398DB",
    //     fillerColor: '#f0f0f0',
    //     borderRadius: 5,
    //     backgroundColor: '#3398DB',//两边未选中的滑动条区域的颜色
    //     // showDataShadow: false,//是否显示数据阴影 默认auto
    //     showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
    //     realtime:true, //是否实时更新
    //     filterMode: 'filter',
    //   },
    //   {
    //     type: 'inside',
    //     show: true,
    //     xAxisIndex: [0],
    //     start: 0,//默认为1
    //     end: 100,//默认为100
    //   },
    // ],
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
      data: seriesData,//[21, 72, 142, 0, 354, 22, 220]
    }]
  });
}
const radar_chart = (title, id, radarIndicator, seriesData)=>{
  let bar = v.$echarts.init(document.getElementById(id));
  bar.setOption({
    title: {
      text: title
    },
    backgroundColor: '#ffffff',
    tooltip: {},
    radar: {
      name: {
        textStyle:{
          color: '#ffffff',
          backgroundColor: '#315a6e',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: radarIndicator,
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: ['#ccffff', '#c0c0c0', '#ffcccc']
        }
      }
    },
    series: [{
      name: '客户资料完整度',
      type: 'radar',
      data : seriesData
    }]
  });
}
const line_chart = (title, id, xData, yData, seriesData)=>{
  let line = v.$echarts.init(document.getElementById(id));
  line.setOption({
    title: {text: title, left: 'center', textStyle: {color: '#303030'}},
    textStyle: {color: '#303030'},
    backgroundColor: '#ffffff',
    color: '#315a6e',
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'}
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#315a6e',
          fontSize: 10
        }
      },
      data: seriesData,//[820, 932, 12, 934, 588, 1330, 15],
      type: 'line'
    }]
  });
}
const pie_chart = (title, id, legendData, legendStyle, seriesData)=>{
  let pie = v.$echarts.init(document.getElementById(id));
  pie.setOption({
    title: {text: title, left: 'center', textStyle: {color: '#303030'}},
    textStyle: {},
    backgroundColor: '#ffffff',
    color: legendStyle,//['#c0c0c0', '#3398DB', '#cc3333'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
      axisPointer: {type: 'shadow'}
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: legendData,//['流失', '存活', '即将流失'],
      textStyle: {color: legendStyle, fontSize: 10}//{color: ['#c0c0c0', '#3398DB', '#cc3333']}
    },
    series: [{
      type: 'pie',
      radius : '50%',
      center: ['40%', '50%'],
      selectedMode: 'single',
      data: seriesData//[{value: 315, name: '流失'}, {value: 5, name: '存活'}, {value: 2, name: '即将流失'}],
    }]
  });
}
const modify = async(key, val, url)=>{

}

const del = (key, val, url)=>{

}

export default {
  //变量
  yuming,
  //方法
  HttpGet,
  HttpPost,
  date_conversion,
  mt_total,
  mt_discount,
  message_box,
  img_before_upload,
  img_upload,
  file_before_upload,
  file_upload,
  bar_chart,
  radar_chart,
  line_chart,
  pie_chart,
  modify,
  del
};
