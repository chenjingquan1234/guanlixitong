<template>
  <div id="two">
    <!-- 商品分类 -->
    <div :key="is_state">
      <div class="pb-nav">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="modify1(null, 1)">添加</el-button>
        <el-input style="margin-left: 10px; width: 25rem;" size="mini" v-model="key_name">
          <template slot="prepend">关键字</template>
        </el-input>
        <!-- <el-select
          size="mini"
          v-model="store1_name"
          clearable
          placeholder="所属门店"
          @change="store1_change"
        >
          <el-option
            v-for="value in store_select"
            :key="value.sid"
            :label="value.store_name"
            :value="value.sid"
          ></el-option>
        </el-select>-->
        <el-button size="mini" type="primary" @click="search1()">查询</el-button>
      </div>
      <vxe-table
        size="mini"
        highlight-hover-row
        border
        :data="tableData1"
        :tree-config="{children: 'children', label: 'classify_name', expandAll: true, }"
        :checkbox-config="{checkStrictly: true, reserve: true, trigger: 'row'}"
        ref="table1"
      >
        <vxe-table-column type="radio" width="50"></vxe-table-column>
        <vxe-table-column field="classify_name" title="分类名称" tree-node></vxe-table-column>
        <vxe-table-column field="create_time" title="创建时间" min-width="200"></vxe-table-column>
        <vxe-table-column title="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="modify1(scope, 2)">修改</el-button>
            <el-button style="color: red;" size="mini" type="text" @click="del1(scope)">删除</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 商品分类弹出框 -->
    <el-dialog title="商品分类" :visible.sync="dialogVisable" :close-on-click-modal="false">
      <el-input size="mini" v-model="d1.a">
        <label slot="prepend" style="color: red;">分类名称</label>
      </el-input>
      <el-input size="mini" v-model="d1.b">
        <label slot="prepend">排序&#12288&#12288</label>
      </el-input>
      <el-select size="mini" style="width: 100%;" v-model="dialog1_b" placeholder="所属分类" clearable>
        <label style="color: red; line-height: 32px;" slot="prefix">*</label>
        <el-option :value="dialog1_b" :label="dialog1_b" class="tree-select">
          <el-tree
            :data="type_select"
            :props="{children: 'children', label: 'classify_name'}"
            @node-click="dialog1_b_node_click"
          ></el-tree>
        </el-option>
      </el-select>
      <el-input size="mini" v-model="d1.c" type="textarea" placeholder="备注"></el-input>
      <!-- <el-switch v-model="d1.d" inactive-text="共享"></el-switch> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1_enter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mytable from "../../mytable";
export default {
  name: "shangpinfenlei",
  components: {
    mytable
  },
  data() {
    return {
      // 显隐变量
      dialogVisable: false,
      // 商品分类弹出框
      d1: {
        a: "",
        b: "",
        c: "",
        d: true
      },
      card_img: "",
      jsz_list: [],
      is_state: 0,
      //配置
      tableData: [],
      tableData1: [],
      operation_: true,
      dialog: false,
      dialog1: false,
      dialog2: false,
      //数据
      key_name: "",
      state_name: 1,
      state_select: [
        { label: "启用", id: 1 },
        { label: "停用", id: 0 }
      ],
      type_name: "",
      type_id: "",
      type_select: [],
      store_name: JSON.parse(localStorage.date).data.sid,
      store1_name: JSON.parse(localStorage.date).data.sid,
      store_select: [],

      d: {
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "",
        i: true,
        j: ""
      },
      dialog_id: "",
      dialog_a: "",
      dialog_a_select: [],
      dialog_b: "",
      dialog_b_select: [],
      dialog_c: "",
      dialog_c_id: "",
      dialog_d: "",
      dialog_d_id: "",
      dialog_d_select: [],
      dialog_img: "",
      add_type: "",

      dialog1_a: "",
      dialog1_a_id: "",
      dialog1_a_select: [],
      dialog1_b: "",
      dialog1_b_id: ""
    };
  },
  methods: {
    before_upload(file) {
      this.$api.img_before_upload(file);
    },
    search() {
      this.handlePageChange({
        search: this.key_name,
        status: this.state_name,
        classify_id: this.type_id,
        sid: this.store_name
      });
    },
    search1() {
      this.commodity();
    },
    commodity() {
    //   this.is_state = 1;
      this.$axios
        .all([
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Inventory/getRecordSelect",
            {},
            { withCredentials: true }
          ),
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Inventory/getProductClassifyList",
            { sid: this.store1_name },
            { withCredentials: true }
          )
        ])
        .then(data => {
          this.dialog1_a_select = data[0].data.data;
          this.tableData1 = data[1].data.data;
        })
        .catch(data => {
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        });
    },
    node_click(row) {
      this.type_name = row.classify_name;
      this.type_id = row.id;
    },
    store1_change(s) {
      this.store1_name = s;
    },
    dialog1_b_node_click(row) {
      this.dialog1_b = row.classify_name;
      this.dialog1_b_id = row.id;
    },
    del(row) {
      this.$axios
        .post(
          this.$store.state.domainName_http +
            "/StoreAdmin/Inventory/deleteProduct",
          { id: row.row.id },
          { withCredentials: true }
        )
        .then(data => {
          if (data.data.code === 200) {
            this.handlePageChange();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(data => {
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        });
    },
    operat(row) {
      this.$axios
        .post(
          this.$store.state.domainName_http +
            "/StoreAdmin/Inventory/changeProductStatus",
          { id: row.row.id },
          { withCredentials: true }
        )
        .then(data => {
          if (data.data.code === 200) {
            this.handlePageChange();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(data => {
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        });
    },
    modify1(row, key) {
      this.dialogVisable = true;
      this.init();
      this.add_type = key;
      this.dialog_id = "";
      this.d1 = { a: "", b: "", c: "", d: "" };
      this.dialog1_a = "";
      this.dialog1_b = "";
      if (key == 2) {
        this.dialog_id = row.row.id;
        this.d1.a = row.row.classify_name;
        this.d1.b = row.row.sort;
        this.d1.c = row.row.remark;
        this.d1.d = row.row.is_share;
        this.dialog1_a = row.row.record_id;
        this.dialog1_b = row.row.pid;
      }
    },
    del1(row) {
      this.$axios
        .post(
          this.$store.state.domainName_http +
            "/StoreAdmin/Inventory/deleteProductClassify",
          { id: row.row.id },
          { withCredentials: true }
        )
        .then(data => {
          if (data.data.code === 200) {
            this.commodity();
            this.$message.success(data.data.msg);
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(data => {
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        });
    },
    dialog1_enter() {
      this.$axios
        .post(
          this.$store.state.domainName_http +
            "/StoreAdmin/Inventory/addOrUpdateProductClassify",
          {
            add_type: this.add_type,
            id: this.dialog_id,
            classify_name: this.d1.a,
            pid: this.dialog1_b_id,
            sid: this.store1_name,
            record_id: this.dialog1_a_id,
            sort: this.d1.b,
            is_share: this.d1.d,
            remark: this.d1.c
          },
          { withCredentials: true }
        )
        .then(data => {
          if (data.data.code === 200) {
            this.commodity();
            this.$message.success(data.data.msg);
            this.dialog1 = false;
          } else {
            this.$message.error(data.data.msg);
          }
        })
        .catch(data => {
          this.$message.error("抱歉网络错误,请检查网络后重试！");
        });
    },
    handlePageChange(data ={}) {
      this.$refs.mytable.findList(
        this.$store.state.domainName_http +
          "/StoreAdmin/Inventory/getProductList",
        data
      );
    },
    init() {
      this.$axios
        .all([
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Common/getStoreSelect",
            {},
            { withCredentials: true }
          ),
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Inventory/getProductClassifySelect",
            {},
            { withCredentials: true }
          ),
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Inventory/getRepertorySelect",
            {},
            { withCredentials: true }
          ),
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Inventory/getUnitSelect",
            {},
            { withCredentials: true }
          ),
          this.$axios.post(
            this.$store.state.domainName_http +
              "/StoreAdmin/Inventory/getAccessorySelect",
            {},
            { withCredentials: true }
          )
        ])
        .then(data => {
          console.log(data);
          this.store_select = data[0].data;
          this.type_select = data[1].data.data;
        });
    }
  },
  created() {
    this.init();
    this.$nextTick(() => {
      this.handlePageChange();
    });
  }
};
</script>

<style scoped>
#two {
  margin: 1rem 5rem;
}
.tree-select {
  height: 200px;
  overflow: auto;
  background-color: #ffffff;
}
</style>
