<template>
  <div id="jiancabaogao">
    <el-dialog title="检查报告" :visible.sync="jcbg_dialog" :close-on-click-modal="false" @close="jcbg_res()">
      <el-select size="mini" v-model="jcbg_type_name" style="width: 100%;" clearable filterable placeholder="检查类别"  @change="jcbg_type_change">
        <el-option v-for="value in jcbg_type_select" :key="value.check_type_id" :label="value.check_type_name" :value="value.check_type_id"></el-option>
      </el-select>
      <el-select size="mini" v-model="jcbg_service_name" style="width: 100%;" clearable filterable placeholder="检查人" @change="jcbg_service_change">
        <el-option v-for="value in jcbg_service_select" :key="value.eid" :label="value.name" :value="value.eid"></el-option>
      </el-select>
      <vxe-table size="mini" max-height="400" align="center" border highlight-hover-row :checkbox-config="{trigger: 'cell', showHeader: false}"
      :tree-config="{children: 'children', accordion: true}" :data="jcbg_tableData" ref="jcbg">
        <vxe-table-column width="200" title="状态" tree-node>
          <template slot-scope="scope" v-if="scope.row.caozuo">
            <el-radio-group v-model="scope.row.status" @change="isGood()">
              <el-radio :label="1">良好</el-radio>
              <el-radio :label="2">不合格</el-radio>
            </el-radio-group>
          </template>
        </vxe-table-column>
        <vxe-table-column field="check_even_name" title="检查项目名称"></vxe-table-column>
        <vxe-table-column field="qzxm" width="100" title="潜在项目">
          <template slot-scope="scope" v-if="scope.row.caozuo">
            <el-button :type="scope.row.button_type" round size="mini" @click="qz_show(scope)">{{scope.row.button_name}}</el-button>
            <!-- 内嵌潜在项目 -->
            <el-dialog title="设置潜在项目" :visible.sync="qz_dialog" width="30%" append-to-body :close-on-click-modal="false">
              <el-input size="mini" v-model="qz_name" disabled><template slot="prepend">项目名称</template></el-input>
              <el-input size="mini" v-model="qz_money"><template slot="prepend">报价&#12288&#12288</template></el-input>
              <el-select size="mini" v-model="qz_intention_name" style="width: 100%;" clearable filterable placeholder="意向度" @change="qz_change">
                <el-option v-for="value in qz_intention_select" :key="value.qz_intention_name" :label="value.qz_intention_name" :value="value.qz_intention_name"></el-option>
              </el-select>
              <el-date-picker size="mini" style="width: 100%;" v-model="qz_time" type="datetime" placeholder="预计消费" :picker-options="pickerOptions"></el-date-picker>
              <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="qz_cancel(scope)">取消登记</el-button>
                <el-button type="primary" @click="qz_enter(scope)">确认登记</el-button>
              </div>
            </el-dialog>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-input size="mini" v-model="jcbg_remark"><template slot="prepend">备注</template></el-input>
      <el-checkbox v-model="jcbg_send">是否发送至客户微信</el-checkbox>
      <div slot="footer" class="dialog-footer"><el-button type="primary" @click="jcbg_enter()">确 定</el-button></div>
    </el-dialog>
  </div>
</template>

<script>
export default{
	name: "jiancabaogao",
	data(){
		return{
      jcbg_type_name: "",
      jcbg_type_id: "",
      jcbg_service_name: "",
      jcbg_service_id: "",
      jcbg_tableData: [],
      jcbg_remark: "",
      jcbg_send: "",
      //潜在项目
      qz_dialog: false,
      qz_name: "",
      qz_id: "",
      qz_money: "",
      qz_intention_name: "",
      qz_intention_id: "",
      qz_intention_select: [
        {qz_intention_name: "高"},
        {qz_intention_name: "中"},
        {qz_intention_name: "低"}
      ],
      qz_time: "",
      dengjiList: []
		}
	},
  props:{
    "jcbg_dialog": {
      type: Boolean,
      default: false
    },
    "jcbg_member_id": {
      type: [String, Number],
      default: ""
    },
    "jcbg_type_select": {
      type: Array,
      default: ()=>{}
    },
    "jcbg_service_select": {
      type: Array,
      default: ()=>{}
    },
    "pickerOptions": {
      type: Object,
      default: ()=>{}
    },
  },
  methods:{
    jcbg_type_change(s){
      this.jcbg_type_id = s;
      this.$api.HttpPost("/StoreAdmin/Repair/getRepairCheckEventList", {check_type_id: this.jcbg_type_id})
      .then((data)=>{
        this.jcbg_tableData = data.data.data;
        for(let i in this.jcbg_tableData){
          for(let j in this.jcbg_tableData[i].children){
            this.jcbg_tableData[i].children[j].caozuo = true;
            this.jcbg_tableData[i].children[j].status = 0;
            this.jcbg_tableData[i].children[j].is_check = 0;
            this.jcbg_tableData[i].children[j].button_name = "添加潜在项目";
            this.jcbg_tableData[i].children[j].button_type = "info";
          }
          this.jcbg_tableData[i].caozuo = false;
        }
      })
    },
    jcbg_service_change(s){
      this.jcbg_service_id = s;
    },
    jcbg_enter(){
      this.$api.HttpPost("/StoreAdmin/Report/jianchaadd",
      {member_id: this.jcbg_member_id,
      leixing_id: this.jcbg_type_id,
      eid: this.jcbg_service_id,
      beizhu: this.jcbg_remark,
      need_send: this.jcbg_send,
      list: this.jcbg_tableData,
      dengjiList: this.dengjiList})
      .then((data)=>{
        if(data.data.code === 200){
          this.$emit("jcbg_ancel");
          this.$message.success(data.data.msg);
        }
        else{
          this.$message.error(data.data.msg);
        }
      })
    },
    isGood(){
      this.$forceUpdate();
    },
    jcbg_res(){
      Object.assign(this.$data, this.$options.data());
    },
    qz_change(s){
      this.qz_intention_id = s;
    },
    qz_show(row){
      this.qz_dialog = true;
      this.qz_name = row.row.check_even_name;
      this.qz_id = row.row.id;
      this.qz_money = "";
      this.qz_intention_name = "";
      this.qz_time = "";
    },
    qz_cancel(row){
      for(let i in this.dengjiList){
        if(this.dengjiList[i].check_even_id === this.qz_id){
          this.dengjiList.splice(i, 1);
        }
      }
      for(let i in row.items){
        if(this.qz_id === row.items[i].id){
          row.items[i].button_name = "添加潜在项目";
          row.items[i].button_type = "info";
          row.items[i].is_check = 0;
        }
      }
      this.qz_dialog = false;
    },
    qz_enter(row){
      if(this.qz_money === "" || this.qz_intention_name === "" || this.qz_time === ""){return this.$message.warning("请勿提交空数据")}
      this.dengjiList.push({check_even_id: this.qz_id, name: this.qz_name, price: this.qz_money, intention: this.qz_intention_name, expect_time: this.qz_time});
      let tag = {};
      this.dengjiList = this.dengjiList.reduce(function(item, next){
        tag[next.check_even_id] ? "" : tag[next.check_even_id] = true && item.push(next);//&&运算符,若前面不为true则会跳过后面运算
        return item;
      }, []);
      for(let i in row.items){
        if(this.qz_id === row.items[i].id){
          row.items[i].button_name = "已经设置潜在";
          row.items[i].button_type = "success";
          row.items[i].is_check = 1;
        }
      }
      this.qz_dialog = false;
    },
  }
}
</script>

<style scoped>
</style>
