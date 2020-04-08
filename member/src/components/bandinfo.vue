<template>
  <div id="bandinfo">

  </div>
</template>

<script>
export default{
	name: "bandinfo",
	data(){
		return{

		}
	},
  mounted(){
    this.$vux.alert.show({
      title: "提示",
      content: "您暂未绑定会员账号,请与相关门店人员联系!"
    })
  }
}
</script>

<style scoped>
</style>
