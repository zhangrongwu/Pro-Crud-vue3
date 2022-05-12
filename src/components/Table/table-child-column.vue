<template>
  <el-pro-table
    :params="params"
    @current-cell-click="handleColumnItemClick"
  ></el-pro-table>
</template>
<script setup lang="ts">
import ElProTable from "../../pro-table/pro-table.vue";

const handleColumnItemClick = (val, row) => {
  console.log(val, row);
};

const params = {
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
        productManagerId: "lidong",
        productManagerPhone: "1234567890",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
        productManagerId: "wangxin",
        productManagerPhone: "1234567890",
      },
      {
        productId: "pid3",
        productName: "产品C",
        productManager: "张腾",
        productManagerId: "zhangteng",
        productManagerPhone: "1234567890",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManager: "赵才",
        productManagerId: "zhaocai",
        productManagerPhone: "1234567890",
      },
    ],
  },
  columnList: [
    {
      label: "产品id",
      prop: "productId",
    },
    {
      label: "产品名称",
      prop: "productName",
    },
    {
      label: "产品负责人",
      childColumn: [
        {
          label: "人员信息",
          childColumn: [
            {
              label: "姓名",
              prop: "productManager",
            },
            {
              label: "电话",
              prop: "productManagerPhone",
              textColor: "#4068d4",
              isClick: true,
            },
          ],
        },
        {
          label: "itcode",
          prop: "productManagerId",
        },
      ],
    },
  ],
};
</script>
