<template>
  <el-pro-table
    :params="params"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pro-table>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ElProTable from "../../pro-table/pro-table.vue";
const total = 4;
const params = ref({
  table: {
    data: [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
      },
    ],
  },
  // 是否显示分页
  paginationShow: true,
  // 每页显示条数切换列表
  pageSizes: [2, 4],
  // 每页显示条数
  pageSize: 2,
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
      prop: "productManager",
    },
  ],
});

const handleSizeChange = (val) => {
  params.value.pageSize = val;
  if (val === 4) {
    params.value.table.data = [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
      },
      {
        productId: "pid3",
        productName: "产品C",
        productManager: "张腾",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManager: "赵才",
      },
    ];
  } else {
    params.value.table.data = [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
      },
    ];
  }
};

const handleCurrentChange = (val) => {
  if (val === 1) {
    params.value.table.data = [
      {
        productId: "pid1",
        productName: "产品A",
        productManager: "李东",
      },
      {
        productId: "pid2",
        productName: "产品B",
        productManager: "李斯",
      },
    ];
  } else {
    params.value.table.data = [
      {
        productId: "pid3",
        productName: "产品C",
        productManager: "张腾",
      },
      {
        productId: "pid4",
        productName: "产品D",
        productManager: "赵才",
      },
    ];
  }
};
</script>
