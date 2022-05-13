# Pro-Crud

vue3版本快速构建管理端页面
```
<template>
    <el-pro-form
      :option="options"
      :config="config"
      :data="formData"
      form-type="filter"
    >
    </el-pro-form>
    <el-pro-table
      :params="params"
      @editbtn-click="handleEditBtnClick"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pro-table>
</ template>
```

