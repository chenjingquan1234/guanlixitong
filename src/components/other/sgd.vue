<template>
  <div id="sgd">
    <center>
      <el-button size="small" round plain @click="res()">返回</el-button>
      <el-button size="small" type="success" round plain @click="Print()">打印</el-button>
    </center>
		<div id="printcontent">
      <center>
        <div style="display: flex; flex-direction: row; align-content: center; align-items: center; justify-content: center;">
          <img v-if="list.logo !== ''" style="margin: 1rem; width: 5rem; height: 5rem;" :src="list.logo" alt="暂无图片">
          <h1>{{list.store_name}}</h1>
        </div>
        <h3>施工单</h3>
        <div style="width: 90%; border-top: 1px dotted #000000;"></div>
      </center>
      <!--  -->
      <div style="margin: 0 5%; font-size: 1rem; color: #000000;">
        <div style="padding: 10px 0;">工单号:&#160 {{list.store_name}}</div>
        <div style="padding: 10px 0;">打印时间:&#160 {{list.print_time}}</div>
        <div style="padding: 10px 0;">车牌:&#160 {{list.chepai}}</div>
        <div style="padding: 10px 0;">VIN:&#160 {{list.vin}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; font-size: 1rem; color: #000000;">
        <div style="padding: 10px 0;">描述:</div>
        <div style="padding: 10px 0;" v-for="(value, key) in list.describeList" :key="key">{{value.describe}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
        <div style="padding: 10px 0; width: 16%;">项目</div>
        <div style="padding: 10px 0; width: 16%;">数量</div>
        <div style="padding: 10px 0; width: 16%;">单价</div>
        <div style="padding: 10px 0; width: 16%;">折扣</div>
        <div style="padding: 10px 0; width: 16%;">总价</div>
        <div style="padding: 10px 0; width: 16%;">施工人</div>
      </div>
      <div v-for="(value, key) in list.serviceItemList" :key="value.key" style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
        <div style="padding: 10px 0; width: 16%;">{{value.item_name}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.quantity}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.price}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.discount}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.amount}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.name}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
        <div style="padding: 10px 0; width: 16%;">商品</div>
        <div style="padding: 10px 0; width: 64%;">数量</div>
        <div style="padding: 10px 0; width: 16%;">施工人</div>
      </div>
      <div v-for="(value, key) in list.productItemList" :key="value.key" style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
        <div style="padding: 10px 0; width: 16%;">{{value.item_name}}</div>
        <div style="padding: 10px 0; width: 64%;">{{value.quantity}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.name}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
        <div style="padding: 10px 0; width: 16%;">附加项目</div>
        <div style="padding: 10px 0; width: 64%;">数量</div>
        <div style="padding: 10px 0; width: 16%;">施工人</div>
      </div>
      <div v-for="(value, key) in list.additionalItemList" :key="value.key" style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
        <div style="padding: 10px 0; width: 16%;">{{value.item_name}}</div>
        <div style="padding: 10px 0; width: 64%;">{{value.quantity}}</div>
        <div style="padding: 10px 0; width: 16%;">{{value.name}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; font-size: 1rem; color: #000000;">
        <div style="padding: 10px 0;">预计交车时间:&#160 {{list.leave_factory_time}}</div>
        <div style="padding: 10px 0;">服务顾问:&#160 {{list.ename}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; font-size: 1rem; color: #000000;">
        <div style="padding: 10px 0;">备注:&#160 {{list.construction_remark}}</div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <!--  -->
      <div style="margin: 0 5%; font-size: 1rem; color: #000000;">
        <div style="padding: 10px 0;"></div>
        <div style="padding: 10px 0;">客户签字: </div>
        <div style="padding: 10px 0;"></div>
      </div>
      <center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
      <center><img v-if="list.qrcode !== ''" style="margin: 1rem; width: 5rem; height: 5rem;" :src="list.qrcode" alt="暂无图片"></center>
      <div style="margin: 0 5%; font-size: 1rem; color: #000000;">
        <center style="padding: 10px 0;">您的满意我的放心</center>
      </div>
		</div>
  </div>
</template>

<script>
export default{
	name: "sgd",
	data(){
		return{
      list: {}
		}
	},
  methods:{
    res(){
      this.$router.push({
        path: "/cashRegister_weixiukaidan",
      })
    },
    Print(){
      var iframe = document.getElementById("print-iframe");
      if(!iframe){
      var el = document.getElementById("printcontent");
      iframe = document.createElement('IFRAME');
      var doc = null;
      iframe.setAttribute("id", "print-iframe");
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      doc.write('<div style="zoom: 0.7;">' + el.innerHTML + '</div>');
      doc.close();
      iframe.contentWindow.focus();
      }
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
      if (navigator.userAgent.indexOf("MSIE") > 0){
        document.body.removeChild(iframe);
        this.$message.warning("部分浏览器不兼容 (建议)请使用谷歌浏览器!");
      }
    }
  },
  created(){
    this.$api.HttpPost("/storeadmin/order/printConstructionOrder", {id: this.$route.query.id})
    .then((success)=>{
      if(success.data.code === 200){
        this.list = success.data.data;
        this.$message.success(success.data.msg);
      }
      else{
        this.$message.error(success.data.msg);
      }
    })
  }
}
</script>

<style scoped>
</style>
