<!--  -->
<template>
  <div>
    <el-tabs :tab-position="tabPosition" class="demo-tabs">
      <el-tab-pane label="Pro-Crud">
        <pro-crud></pro-crud>
      </el-tab-pane>
      <el-tab-pane label="基础表单">
        <basic-form></basic-form>
      </el-tab-pane>
      <el-tab-pane label="筛选">
        <query-filter></query-filter>
      </el-tab-pane>
      <el-tab-pane label="表格">
        <pro-table-demo></pro-table-demo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BasicForm from "./BasicForm.vue";
import QueryFilter from "./QueryFilter.vue";
import ProCrud from "./Crud.vue";
import ProTableDemo from "./Table.vue";

const tabPosition = ref("left");
</script>
<style lang="scss" scoped>
.table-wrap-title {
  text-align: left;
  widows: 100%;
  margin: 20px;
}
</style>
