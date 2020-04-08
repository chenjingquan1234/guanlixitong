<template>
  <div id="three">
    <!-- 操作功能 -->
    <div class="row" style="padding-bottom: 10px; width: 100%; box-shadow: 5px 5px 20px #dcdfe6">
    	<el-select size="mini" v-model="value" placeholder="所属门店">
    	<el-option v-for="value in store" :key="value.name" :label="value.name" :value="value.name"></el-option>
    	</el-select>
    	<el-button size="mini" type="primary" @click="search()">查询</el-button>
    </div>
    <!-- left table -->
    <mytable class="left" :tableData="tableData" :tableTitle="tableTitle" :url="url" :number="number" :paging="paging" :operation="operation" @modify="modify"></mytable>
    <div class="right">
      <div v-for="(value, key) in setCheckContent" :key="value.title">
        <div style="margin-top: 10px;">{{value.title}}</div>
        <el-checkbox-group v-model="value.setCheck">
          <el-checkbox v-for="(content, key) in value.content" :label="content" :key="key">{{content}}</el-checkbox>
        </el-checkbox-group><hr>
      </div>
    </div>
  </div>
</template>

<script>
import mytable from "./../../mytable.vue"

const one = ["隐藏导出功能", "禁止修改客户资料", "微信解绑"];
const two = ["显示会员套餐修改", "赠送优惠券", "赠送摇奖", "设置活动", "显示中奖设置"];
const three = ["修改订单号", "待结算删除", "开通免密码"];
const four = ["隐藏办卡时间,消费时间"];
const five = ["隐藏成本", "设置调价表", "修改调价表"];
const six = ["修改收支", "收支作废", "审核"];
const seven = ["新增服务项目", "开通反结和作废", "开通B单", "是否可优惠", "是否可修改时间"];
const eight = ["不算计次卡扣", "隐藏成本,毛利"];
const nine = ["查看消息记录"];
const ten = ["异店消费设置"];
const eleven = ["隐藏手机号码", "方案显示"];
export default{
  name: "three",
  components:{
    mytable
  },
  data(){
    return{
      value: "",
      store: [],
      setCheckTitle: "",
      isIndeterminate: false,
      setCheckContent: {
        one: {title: "客户资料", content: one, setCheck: [], state: false},
        two: {title: "会员管理", content: two, setCheck: [], state: false},
        three: {title: "收银开单", content: three, setCheck: [], state: false},
        four: {title: "基础设置", content: four, setCheck: [], state: false},
        five: {title: "库存管理", content: five, setCheck: [], state: false},
        six: {title: "收支管理", content: six, setCheck: [], state: false},
        seven: {title: "收银", content: seven, setCheck: [], state: false},
        eight: {title: "财务", content: eight, setCheck: [], state: false},
        nine: {title: "员工管理", content: nine, setCheck: [], state: false},
        ten: {title: "员工分红", content: ten, setCheck: [], state: false},
        eleven: {title: "其他", content: eleven, setCheck: [], state: false},
      },
      //事件
      modify_key: false,
      //mytable子组件数据
      tableTitle: [
        {key: "id", title: "角色名称", width: "400"},
      ],
      tableData: [

      ],
      url: "",
      number: false,
      paging: false,
      operation: false
    }
  },
  methods:{

  },
  created(){

  }
}
</script>

<style scoped>
#three{
  margin: 1rem 5rem;
}
.left{
  float: left;
  width: 33%;
}
.right{
  float: right;
  width: 65%;
}
hr{
  margin-top: 10px;
  color: #c0c0c0;
}
.el-checkbox{
  margin-top: 10px;
}
</style>
