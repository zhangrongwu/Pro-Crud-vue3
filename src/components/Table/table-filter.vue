<template>
  <el-pro-table :params="params"></el-pro-table>
</template>
<script setup lang="ts">
import ElProTable from "../../pro-table/pro-table.vue";
const params = {
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
        productStatus: "开发中",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
        productStatus: "测试中",
      },
      {
        productId: "pid3",
        productName: "产品C",
        productManager: "张腾",
        productStatus: "运营中",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManager: "赵才",
        productStatus: "测试中",
      },
    ],
  },
  columnList: [
    {
      label: "产品id",
      prop: "productId",
      cellProps: {
        width: 100,
      },
    },
    {
      label: "产品名称",
      prop: "productName",
    },
    {
      label: "产品负责人",
      prop: "productManager",
    },
    {
      label: "产品状态",
      prop: "productStatus",
      filters: [
        {
          text: "开发中",
          value: "开发中",
        },
        {
          text: "测试中",
          value: "测试中",
        },
        {
          text: "运营中",
          value: "运营中",
        },
      ],
    },
  ],
};
</script>
