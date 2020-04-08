<template>
  <div id="headerN">
    <el-menu :default-active="router" mode="horizontal"
    background-color="#f0f0f0" text-color="#315a6e" active-text-color="#3366ff">
      <el-menu-item class="logo" index="/"><img src="../assets/img/logo.png" alt="图片暂未找到"/></el-menu-item>
      <el-submenu v-for="(value, key) in nav_item" :key="key" :index="value.auth_name">
        <template slot="title"><div class="column">
          <img :src="value.img" alt="-">
          <label>{{value.auth_name}}</label>
        </div></template>
        <el-menu-item v-for="(values, keys) in nav_item[key].levelTwoAuth" :key="keys" :index="values.url" @click.native="creatTag(values.auth_name, values.url)">
          <img :src="values.img" alt="-">
          {{values.auth_name}}
          <el-button v-if="values.help_video !== ''" style="float: right; line-height: auto; color: #303030;" size="mini" type="text" @click.stop="help(values.help_video)">帮助</el-button>
        </el-menu-item>
      </el-submenu>
      <el-submenu class="exit" index="username">
        <template slot="title">{{username}}</template>
        <el-menu-item index="userExit" @click="userExit">退出登录</el-menu-item>
				<el-menu-item index="resPassword" @click="resPassword">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-tag size="small" :closable="true" effect="dark" v-for="(value, key) in tag" :key="key"
    @close="close(value)" @click="ct(value.name, value.path)" style="cursor: pointer;">{{value.name}}</el-tag>

    <el-drawer
      title="密码修改"
      :visible.sync="drawer"
      :withHeader="false"
      direction="btt">
      <center style="margin: 1rem auto;">
        <el-input style="width: 50%;" size="mini" v-model="drawer_new_pw" type="password"><label slot="prepend">新密码&#12288</label></el-input>
        <el-input style="width: 50%;" size="mini" v-model="drawer_enter_pw" type="password"><label slot="prepend">确认密码</label></el-input>
        <el-divider></el-divider>
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="enter">确 定</el-button>
      </center>
    </el-drawer>
  </div>
</template>

<script>
export default{
  name: "headerN",
  data(){
    return{
      username: "游客",
      nav_item: [],
      router: "/",
      tag: [
        {name: "首页", path: "/"}
      ],
      drawer: false,
      drawer_id_pw: "",
      drawer_new_pw: "",
      drawer_enter_pw: ""
    }
  },
  methods: {
    userExit(){
      const loading = this.$loading({text: "正在退出登录..."});
      this.$axios.post(this.$store.state.domainName_http+"/StoreAdmin/Login/logOut")
      .then((success)=>{
        loading.close();
        localStorage.clear();
        this.$router.push({path: "/enter"});
      })
    },
    resPassword() {
      this.drawer = true;
    },
    cancel(){
      this.drawer = false;
    },
    enter(){
      this.$api.HttpPost("/storeadmin/User/updatePwd",
      {id: this.drawer_id_pw,
      pwd: this.drawer_new_pw,
      rpwd: this.drawer_enter_pw})
      .then((data)=>{
        if(data.data.code === 200){
          this.drawer = false;
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    close(tag){
      if(tag.name == "首页"){
        return this.$message({showClose: true, message: "首页请勿删除"});
      }
      let index = this.tag.indexOf(tag);
      this.tag.splice(index, 1);
      this.$router.push({name: this.tag[index-1].path});
    },
    ct(name, path){
      this.$router.push({name: path});
    },
    creatTag(name, path){
      this.tag.push({name: name, path: path});
      var tag = {};
      this.tag = this.tag.reduce(function(item, next){
        tag[next.name] ? "" : tag[next.name] = true && item.push(next);//&&运算符,若前面不为true则会跳过后面运算
        return item;
      }, []);
      this.$router.push({name: path});
      this.router = path;
    },
    help(url){
      window.open(url);
    }
  },
  created(){
    this.$nextTick(()=>{
      let json = JSON.parse(localStorage.date);
      this.drawer_id_pw = json.data.id;
      this.username = json.data.username + "(" + json.data.role_name + ")";
      this.nav_item = json.data.auth;
    })
  },
  computed: {
    addTag() {
      return this.$store.state.add_tag
    }
  },
  watch: {
    addTag: {
      handler(val) {
       this.creatTag(val.name, val.path)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
#headerN{
  background-color: #f0f0f0;
}
.el-menu{
  display: flex;
  justify-content: center;
}
/deep/ .el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{
  display: none;
}
/deep/ .el-menu--horizontal>.el-submenu .el-submenu__title{
  line-height: 30px;
  padding-top: 0.5rem;
}
.el-menu-item:hover{
  color: #6699ff !important;
  border-radius: 5px !important;
}
.el-menu-item.is-active{
  color: #ffffff !important;
  background: #6699ff !important;
  border-radius: 5px !important;
}
.logo{
  padding: 0;
  position: absolute;
  left: 1rem;
}
.exit{
  position: absolute;
  right: 1rem;
}
img{
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
