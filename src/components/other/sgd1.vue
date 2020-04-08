<template>
  <div id="jsd">
    <center>
      <el-button size="small" round plain @click="res()">返回</el-button>
      <el-button size="small" type="success" round plain @click="Print()">打印</el-button>
    </center>
		<div id="printcontent">
		<center>
      <div style="display: flex; flex-direction: row; align-content: center; align-items: center; justify-content: center;">
      <img v-if="sgdMsg.logo !== ''" style="margin: 1rem; width: 5rem; height: 5rem;" :src="sgdMsg.logo" alt="暂无图片">
      <h1>{{sgdMsg.store_name}}</h1>
      </div>
			<h3>施工单</h3>
		</center>
    <!--  -->
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin: 0 5%; font-size: 1rem; color: #000000;">
    	<div style="padding: 4px 0;">顾问:&#160 {{sgdMsg.ename}}</div>
    	<div style="padding: 4px 0;">门店电话:&#160 {{sgdMsg.store_tel}}</div>
    </div>
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin: 0 5%; font-size: 1rem; color: #000000;">
    	<div style="padding: 4px 0;">顾问电话:&#160 {{sgdMsg.tel}}</div>
    	<div style="padding: 4px 0;">门店地址:&#160 {{sgdMsg.store_address}}</div>
    </div>
		<!--  -->
		<div style="margin: 0 5%; font-size: 1rem; color: #000000;">
      <table border="1" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <tr style="text-align: center;">
          <td>工单号</td>
          <td>{{sgdMsg.order_sn}}</td>
          <td>打印时间</td>
          <td>{{sgdMsg.print_time}}</td>
        </tr>
        <tr style="text-align: center;">
          <td>车牌</td>
          <td>{{sgdMsg.chepai}}</td>
          <td>VIN</td>
          <td>{{sgdMsg.vin}}</td>
        </tr>
      </table>
		</div>
		<!--  -->
        <div  v-if="sgdMsg.serviceItemList && sgdMsg.serviceItemList.length? true : false">
    <h3 style="margin: 5px 5%; font-size: 1rem; color: #000000;">服务项目</h3>
		<div style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
      <table border="1" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <tr style="text-align: center;">
          <td>项目</td>
          <td>品质</td>
          <td>数量</td>
          <td>单位</td>
          <td>单价</td>
          <td>折扣</td>
          <td>金额</td>
        </tr>
        <tr v-for="(value, key) in sgdMsg.serviceItemList" :key="key" style="text-align: center;">
          <td>{{value.item_name}}</td>
          <td></td>
          <td>{{value.quantity}}</td>
          <td></td>
          <td>{{value.price}}</td>
          <td>{{value.discount}}</td>
          <td>{{value.amount}}</td>
        </tr>
      </table>
		</div>
        </div>
    <!--  -->
    <div v-if="sgdMsg.productItemList && sgdMsg.productItemList.length? true : false" >
    <h3 style="margin: 5px 5%; font-size: 1rem; color: #000000;">商品</h3>
    <div style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
      <table border="1" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <tr style="text-align: center;">
          <td>商品</td>
          <td>品质</td>
          <td>数量</td>
          <td>单位</td>
          <td>单价</td>
          <td>折扣</td>
          <td>金额</td>
        </tr>
        <tr v-for="(value, key) in sgdMsg.productItemList" :key="key" style="text-align: center;">
          <td>{{value.item_name}}</td>
          <td>{{value.accessory_name}}</td>
          <td>{{value.quantity}}</td>
          <td>{{value.unit_name}}</td>
          <td>{{value.price}}</td>
          <td>{{value.discount}}</td>
          <td>{{value.amount}}</td>
        </tr>
      </table>
    </div>
    </div>
    <!--  -->
    <div v-if="sgdMsg.additionalList && sgdMsg.additionalList.length? true : false">
    <h3 style="margin: 5px 5%; font-size: 1rem; color: #000000;">附加项目</h3>
    <div style="margin: 0 5%; display: flex; flex-direction: row; justify-content: flex-start; color: #000000;">
      <table border="1" style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <tr style="text-align: center;">
          <td>附加项目</td>
          <td>数量</td>
          <td>金额</td>
        </tr>
       <tr v-for="(value, key) in sgdMsg.additionalList" :key="key" style="text-align: center;">
          <td>{{value.item_name}}</td>
          <td>{{value.quantity}}</td>
          <td>{{value.amount}}</td>
        </tr>
      </table>
    </div>
    </div>
		<!--  -->
		<div style="display: flex; flex-direction: row; justify-content: space-between; margin: 0 5%; font-size: 1rem; color: #000000;">
      <div style="margin-bottom: 3rem; margin-top: 1rem;">结算员签字</div>
			<div style="margin-bottom: 3rem; margin-top: 1rem;">承修方(盖章)</div>
			<div style="margin-bottom: 3rem; margin-top: 1rem;">客户签字</div>
		</div>
		<center><div style="width: 90%; border-top: 1px dotted #000000;"></div></center>
    <center><img v-if="sgdMsg.print_img !== ''" style="margin: 1rem; width: 5rem; height: 5rem;" :src="sgdMsg.print_img" alt="暂无图片"></center>
		<div style="margin: 0 5%; font-size: 1rem; color: #000000;">
			<center style="padding: 4px 0;">您的满意我的放心</center>
		</div>
		</div>
  </div>
</template>

<script>
export default{
	name: "jsd",
	data(){
		return{
      sgdMsg: {
         
      }
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
  mounted(){
        this.$api.HttpPost("/storeadmin/order/printConstructionOrder", {id: this.$route.query.id})
        .then((success)=>{
          if(success.data.code === 200){
            this.sgdMsg = success.data.data;
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
