<template>
  <div id="enter">
    <el-card class="box-card">
      <div slot="header"><center><h3>恒富宝汽修美容管理系统</h3></center></div>
      <el-input type="text" v-model="username" clearable><template slot="prepend">账&#8195号</template></el-input>
      <el-input type="password" v-model="password" clearable><template slot="prepend">密&#8195码</template></el-input>
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="12"><el-input type="text" v-model="key" clearable maxlength="5" onKeyUp="value=value.replace(/[\W]/g,'')"><template slot="prepend">验证码</template></el-input></el-col>
        <el-col :span="12"><img class="img" :src="url" alt="尝试获取" onclick="javascript:this.src=this.src+'?time='+Math.random();"></el-col>
      </el-row>
      <center>
        <el-button type="text" disabled @click="msg()">注册账号</el-button>
        <el-button type="text" disabled @click="msg()">忘记密码？</el-button><br>
        <el-button style="width: 10rem; background: #8cabae; color: #ffffff;" type="primary" @click="enter" :loading="load">登录</el-button>
      </center>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'enter',
  data(){
    return{
      username: "",
      password: "",
      key: "",
      load: false,//登录按钮状态
      //验证码
      url: this.$api.yuming+"/StoreAdmin/Login/captcha"
    }
  },
  methods:{
    msg: function(){
      this.$message.warning({message: "该功能暂未对外开放,请联系开发商开通", showClose: true});
    },
    enter: function(){
      this.load = true
      this.$axios.post(this.$api.yuming+"/StoreAdmin/Login/dologin", {username: this.username, password: this.password, captcha: this.key}, {withCredentials: true},{withCredentials: true})
      .then((success)=>{
        if(success.data.code === 200){
          let json = JSON.stringify(success.data);
          localStorage.date = json;
          this.load = false;
          this.$message.success({message: success.data.msg, showClose: true});
          this.$router.push({
            path: "/",
            query: {}//路由传参数
          })
        }
        else{
          this.load = false;
          this.key = "";
          this.url = this.$api.yuming+"/StoreAdmin/Login/captcha?time="+Math.random();
          this.$message.error({message: success.data.msg, showClose: true});
        }
      })
      .catch((error)=>{
        this.load = false
        this.$message.error({message: "抱歉网络错误,请检查网络后重试！", showClose: true});
      })
    }
  },
  mounted(){
    var t = this;
    document.onkeydown = function(){
      var key = window.event.keyCode;
      if(key == 13){t.enter();}
    }
  }
}
</script>

<style scoped>
#enter{
  position: fixed;
  background: url("../assets/img/bg.jpg");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}
.box-card{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
}
.el-card{
  padding: 0;
  background: #fffbf0;
  color: #688d96;
}
.elrow{
  position: fixed;
  top: 10rem;
}
.img{
  margin: 10px 0;
  width: 100%;
  height: 40px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
}
.el-input{
  margin: 10px 0;
}
</style>
