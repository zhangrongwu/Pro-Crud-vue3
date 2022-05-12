<!--  -->
<template>
  <div>
    <div class="table-wrap-title">仅用来展示基础表格</div>
    <basic-table></basic-table>
    <div class="table-wrap-title">
      默认 prop 传入列内容为数组时，展示数据用 ”、“ 拼接，横向排列。配置 column
      的 directionColumn 参数，directionColumn: true 实现列表内容纵向排列。
    </div>
    <basic-table1></basic-table1>
    <div class="table-wrap-title">
      配置 column 的 type 参数值为：editBtns ，代表此列为：操作按钮列。 prop
      传入列内容类型为 Array，如数组为对象数组，配置 column showValueKey
      参数，代表展示指定 value 的 key 名。点击操作按钮触发 editbtn-click
      方法，返回参数：row, btnItem
    </div>
    <basic-table2></basic-table2>
    <div class="table-wrap-title">
      配置 column 的 type 参数值为：diyRowData ，代表此列为：定制内容列；
      必传参数 slotName: 插槽名
    </div>
    <basic-table3></basic-table3>
    <div class="table-wrap-title">
      配置 column 的 type 参数值为：editBtns ，代表此列为：操作按钮列。 prop
      传入列内容类型为 Array，如数组为对象数组，配置 column showValueKey
      参数，代表展示指定 value 的 key 名。点击操作按钮触发 editbtn-click
      方法，返回参数：row, btnItem
    </div>
    <basic-table4></basic-table4>
    <div class="table-wrap-title">
      配置 column 的 filters 参数，类型为 Array 即可开启该列的筛选。
    </div>
    <basic-table5></basic-table5>
    <div class="table-wrap-title">
      可用过 paginationShow 参数来配置表格分页功能， 必传参数 total
      数据总条数。pageSizes 选填参数：每页数据量选集（不传默认为[10, 20, 30,
      40]）；pageSize 选填参数：每页数据量（不传默认为10）。 切换页码会触发
      current-change 方法，切换每页条数会触发 size-change 方法
    </div>
    <basic-table6></basic-table6>
    <div class="table-wrap-title">
      params 配置 radioShow
      参数，来开启单选框功能，当单选框触发，回调方法为：radio-change，返回值：label,
      row。 params 配置 radioValue 参数为默认选中项
    </div>
    <basic-table7></basic-table7>
    <div class="table-wrap-title">
      params 配置 selectionShow 参数，来开启多选框功能
    </div>
    <basic-table8></basic-table8>
    <div class="table-wrap-title">
      如果想让表格内部滚动，params 配置 height 参数
    </div>
    <basic-table9></basic-table9>
    <div class="table-wrap-title">
      配置 column 的 childColumn 参数，类型为 Array
      可设置多级表头，最多可支持三级。
    </div>
    <basic-table10></basic-table10>
    <div class="table-wrap-title">
      配置 column 的 ​sortable 参数，​sortable: true
      即可实现以该列为基准的排序。如果需要后端排序，需设置 sortable: 'custom'
      ，同时在 Table 上监听 sort-change 事件
    </div>
    <basic-table11></basic-table11>
    <div class="table-wrap-title">
      配置 column 的 textColor 参数，可设置列内容颜色。
    </div>
    <basic-table12></basic-table12>
    <div class="table-wrap-title">仅用来展示基础表格</div>
    <basic-table13></basic-table13>
    <div class="table-wrap-title">
      配置 column 的 showValueKey 参数，代表展示指定 value 的 key 名。prop
      可直接传入数组或对象
    </div>
    <basic-table14></basic-table14>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BasicTable from "./Table/basic.vue";
import BasicTable1 from "./Table/table-child-column.vue";
import BasicTable2 from "./Table/table-column-click.vue";
import BasicTable3 from "./Table/table-diy-row.vue";
import BasicTable4 from "./Table/table-edit-btn.vue";
import BasicTable5 from "./Table/table-filter.vue";
import BasicTable6 from "./Table/table-pagination.vue";
import BasicTable7 from "./Table/table-radio.vue";
import BasicTable8 from "./Table/table-reserve-selection.vue";
import BasicTable9 from "./Table/table-scroll.vue";
import BasicTable10 from "./Table/table-selection.vue";
import BasicTable11 from "./Table/table-sort.vue";
import BasicTable12 from "./Table/table-text-color.vue";
import BasicTable13 from "./Table/table-value-direction.vue";
import BasicTable14 from "./Table/table-value-key.vue";

const tabPosition = ref("left");
</script>
<style lang="scss" scoped>
.table-wrap-title {
  text-align: left;
  widows: 100%;
  margin: 20px;
}
</style>
