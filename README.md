# Pro-Crud

vue3版本快速构建管理端页面
```
<el-pro-form
      :option="options"
      :config="formConfig"
      :data="formData"
      :miniShow="3"
      ref="defProform"
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
```

