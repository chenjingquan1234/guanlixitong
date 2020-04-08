<template>
  <div id="mytable">
    <!-- 表格 -->
    <vxe-table
      size="mini"
      align="center"
      :height="height"
      ref="xTable"
      highlight-hover-row
      highlight-current-row
      border
      :show-footer="isShowFooter"
      :footer-method="footerMethod"
      :class="{'mytable': class_mytable}"
      :data="tableData"
      :loading="loading"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :tree-config="{children: 'children', label: 'classify_name'}"
      :checkbox-config="{reserve: true, trigger: 'row'}"
      :radio-config="{labelField: '', trigger: 'row'}"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
      @cell-click="cell_click"
      @edit-actived="edit_actived"
      @edit-closed="edit_closed"
    >
      <vxe-table-column v-if="check_box" type="checkbox" width="50"></vxe-table-column>
      <vxe-table-column v-if="!check_box" type="radio" width="50"></vxe-table-column>
      <vxe-table-column v-if="number" type="seq" title="序号" width="50"></vxe-table-column>
      <vxe-table-column
        v-for="value in tableTitle"
        :key="value.key"
        :field="value.key"
        :title="value.title"
        :width="value.width"
        :min-width="value.min_width"
        :edit-render="value.edit"
        :tree-node="value.tree"
      ></vxe-table-column>

      <vxe-table-column v-if="operation" title="操作" min-width="150">
        <template slot-scope="scope">
          <!-- 其他 -->
          <el-button
            v-if="operation_other"
            size="mini"
            type="text"
            @click="modifyOther(scope, 2)"
          >{{operation_other_name}}</el-button>
          <el-button
            v-if="operation_mod"
            size="mini"
            type="text"
            @click="modify(scope, 2)"
          >{{operation_mod_name}}</el-button>
          <el-button
            v-if="operation_del"
            style="color: red;"
            size="mini"
            type="text"
            @click="del(scope)"
          >{{operation_del_name}}</el-button>
          <el-button
            v-if="operation_"
            class="operation"
            size="mini"
            type="text"
            @click="operat(scope)"
          >{{operation_name}}</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页器 -->
    <vxe-pager
      v-if="paging"
      size="mini"
      perfect
      :loading="loading"
      :pager-count="5"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    ></vxe-pager>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  data() {
    return {
      tablePage: {
        currentPage: 1, //当前页
        pageSize: 20, //当前页数据
        totalResult: 0 //总数据
      },
      loading: false
    };
  },
  props: {
    height: {
      type: Number,
      default: 600
    },
    tableData: {
      type: Array,
      default: () => {}
    },
    tableTitle: {
      type: Array,
      default: () => {}
    },
    class_mytable: {
      type: Boolean,
      default: true
    },
    number: {
      type: Boolean,
      default: true
    },
    check_box: {
      type: Boolean,
      default: true
    },
    operation: {
      type: Boolean,
      default: true
    },
    operation_mod: {
      type: Boolean,
      default: true
    },
    operation_mod_name: {
      type: String,
      default: "修改"
    },
    operation_del: {
      type: Boolean,
      default: true
    },
    operation_del_name: {
      type: String,
      default: "删除"
    },
    operation_: {
      type: Boolean,
      default: false
    },
    operation_name: {
      type: String,
      default: ""
    },
    paging: {
      type: Boolean,
      default: true
    },
    rstyle: {
      type: Function,
      default: ({ row, rowIndex, column, columnIndex }) => {}
    },
    cstyle: {
      type: Function,
      default: ({ row, rowIndex, column, columnIndex }) => {}
    },
    isShowFooter: {
      type: Boolean,
      default: false
    },
    footerMethod: {
      type: Function,
      default: ({ columns, data }) => {[]}
    },
    operation_other: {
      type: Boolean,
      default: false
    },
    operation_other_name: {
      type: String,
      default: "打印"
    }
  },
  methods: {
    modify(scope) {
      this.$emit("modify", scope, 2);
    },
    modifyOther(scope) {
      this.$emit("modify-other", scope, 2);
    },
    del(scope) {
      this.$confirm("确认要执行操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("del", scope);
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    operat(scope) {
      this.$emit("operat", scope);
    },
    cell_click(row, column) {
      this.$emit("cell_click", row, column);
    },
    edit_actived(row, column) {
      this.$emit("edit_actived", row, column);
    },
    edit_closed(row, column) {
      this.$emit("edit_closed", row, column);
    },
    rowStyle({ row, rowIndex, column, columnIndex }) {
      return this.rstyle({ row, rowIndex, column, columnIndex });
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      return this.cstyle({ row, rowIndex, column, columnIndex });
    },
    //分页
    findList(url, ...search) {
      this.loading = true;
      search[0].page = this.tablePage.currentPage;
      search[0].quantity = this.tablePage.pageSize;
      this.$axios
        .post(url, search[0], { withCredentials: true })
        .then(data => {
          if (data.data.code === 200) {
            if (search[0].is_tree === true) {
              this.$emit("resData", data.data.data);
            } else {
              this.$emit("resData", data.data.data.data);
            }
            this.tablePage.totalResult = data.data.data.total;
          } else {
            this.$message.error(data.data.msg);
          }
          this.loading = false;
        })
        .catch(data => {
          this.loading = false;
        });
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.$emit("handlePageChange");
    }
   
  }
};
</script>

<style scoped>
.mytable {
  margin-top: 10px;
  width: 100%;
  box-shadow: 5px 5px 20px #dcdfe6;
}
.operation {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
