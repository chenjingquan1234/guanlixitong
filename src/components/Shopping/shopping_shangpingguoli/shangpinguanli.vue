<template>
  <div>
    <div class="contation">
      <div class="query-box">
        <el-button type="primary" icon="el-icon-plus" size="mini" style="margin-right:10px" >新增</el-button>
         <el-input style="width:500px;margin-right:7px" placeholder="请输入关键字" size="mini" v-model="search_value">
          <template style="width:50px" slot="append">搜索</template>
        </el-input>
       <!-- <el-select style="margin-right:7px" v-model="supplie_value" clearable size="mini" placeholder="请选择供应商">
          <el-option
            v-for="(item,index) in supplie_select"
            :key="index"
            :label="item.supplier_name"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-select style="margin-right:7px"  v-model="store_value" clearable size="mini" placeholder="请选择所属门店">
          <el-option
            v-for="(item,index) in store_select"
            :key="index"
            :label="item.store_name"
            :value="item.sid"
          ></el-option>
        </el-select>
        
        <el-date-picker
          style="margin-right:7px"
          size="mini"
          value-format="timestamp"
          v-model="date_time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker> -->

        <!-- <el-button type="primary" size="mini" @click="search" st yle="margin-left:10px">查询</el-button> -->
      </div>
     <vxe-table
          border
          highlight-hover-row
          height="600"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="商品信息" >
            <template slot-scope="scope">
              <div class="shop-msg">
                <img src="../../../assets/img/member_type_set.png" alt="" class="shop-img">
                <div class="shop-right">
                  <div class="title">{{scope.row.title}}</div>
                  <div class="detail">{{scope.row.detail}}</div>
                </div>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="price" title="当前单价" sortable></vxe-table-column>
          <vxe-table-column field="store" title="库存" sortable></vxe-table-column>
          <vxe-table-column field="isshell" title="上下架" ></vxe-table-column>
          <vxe-table-column field="Model" title="商品型号"  :sort-by="['time', 'name']"></vxe-table-column>
          <vxe-table-column center title="操作" >
            <template slot-scope="scope">
              <el-button  size="mini" type="text" @click="modify(scope, 2)">编辑</el-button>
              <!-- <el-button style="color: #6A9955;" size="mini" type="text" @click="del(scope)">上架</el-button> -->
              <el-button style="color: red;" size="mini" type="text" @click="del(scope)">下架</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        
    </div>
  </div>
</template>

<script>
import mytable from "../../mytable";
export default {
  name: "three",
  components: {
    mytable
  },
  props: {
    store_select: {
      type: Array,
      default: () => {
        [];
      }
    },
    supplie_select: {
    type: Array,
    default: () => {
       [];
      }
    }
  },
  data() {
    return {
      search_value:'',
      tableTitle: [
        { key: "order_sn", title: "付款单号", min_width: "150" },
        { key: "amount", title: "实际付款", min_width: "100" },
        { key: "preferential_amount", title: "优惠金额", min_width: "100" },
        { key: "total_money", title: "销账金额", min_width: "100" },
        { key: "create_time", title: "付款时间", min_width: "100" },
        { key: "name", title: "操作人员", min_width: "100" },
        { key: "store_name", title: "门店", min_width: "100" },
        { key: "supplier_name", title: "供应商", min_width: "100" },
      ],
      tableData: [
        {name: '哈哈哈', price: 10, store: 100, isshell:'是', Model: 'sssdd', title: '有线鼠标男女生可爱笔记本台式电脑', detail: '28368675717'}
      ],
    
    };
  },
  mounted() {
  },
  methods: {
    cell_click(scope) {
    },
   
    modify() {

    },
    del(scoped) {
     
    }
  }
};
</script>

<style scoped>
.contation {
  width: 90%;
  margin: 10px auto;
}
.query-box {
  width: 100%;
  /* padding: 0 5%; */
  box-shadow: 5px 5px 20px #dcdfe6;
  padding-bottom: 13px;
  display: flex;
  margin: 10px auto;
}
.shop-msg {
  display: flex;
  width: 200px;
}
.shop-msg .shop-img{
  width: 50px;
  height: 50px;
}
.shop-msg .shop-right{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 5px;
}
.shop-msg .shop-right .title{
  font-size: 13px;
  line-height: 13px;
  /* font-weight: 500; */
}
.shop-msg .shop-right .detail {
  font-size: 12px;
  color:#FF9A41
}
</style>
