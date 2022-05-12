<template>
  <div class="pro-table">
    <el-table
      v-bind="params.table"
      v-on="params.on"
      ref="tableRef"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-dblclick="handleCellDblclick"
      @cell-contextmenu="handleCellContextmenu"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDblclick"
      @row-contextmenu="handleRowContextmenu"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
    >
      <el-table-column v-if="params.radioShow" width="55">
        <template #default="scope">
          <el-radio
            v-model="params.radioValue"
            :label="scope.row[params.radioLabel]"
            @change="handleRadioChange($event, scope.row)"
          >
            {{ "" }}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-if="params.selectionShow"
        type="selection"
        :reserve-selection="params.reserveSelection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        v-for="(item, index) in params.columnList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :width="item.width"
        :align="item.align"
        :header-align="item.headerAlign"
        :min-width="item.minWidth"
        :filters="item.filters"
        :filter-method="item.filters ? filterHandler : null"
      >
        <!-- 多级表头 -->
        <template v-if="item.childColumn" #default="">
          <el-table-column
            v-for="(childColumnItem, childColumnIndex) in item.childColumn"
            :key="childColumnIndex"
            :prop="childColumnItem.prop"
            :label="childColumnItem.label"
            :width="childColumnItem.width"
            :min-width="childColumnItem.minWidth"
          >
            <template v-if="!childColumnItem.childColumn" #default="scope">
              <template
                v-if="returnType(scope.row[childColumnItem.prop]) === 'array'"
              >
                <div
                  :class="{ 'is-flex-column': childColumnItem.directionColumn }"
                >
                  <span
                    v-for="(textItem, textIndex) in scope.row[
                      childColumnItem.prop
                    ]"
                    :key="textIndex"
                    :style="{ color: childColumnItem.textColor }"
                    :class="{ 'is-cell-click': childColumnItem.isClick }"
                    @click="
                      handleColumnItemClick(
                        childColumnItem,
                        textItem,
                        scope.row
                      )
                    "
                  >
                    {{
                      childColumnItem.showValueKey
                        ? textItem[childColumnItem.showValueKey]
                        : textItem
                    }}
                    {{
                      symbol(
                        textIndex,
                        scope.row[childColumnItem.prop],
                        childColumnItem
                      )
                    }}
                  </span>
                </div>
              </template>
              <template
                v-if="returnType(scope.row[childColumnItem.prop]) === 'object'"
              >
                <span
                  :style="{ color: childColumnItem.textColor }"
                  :class="{ 'is-cell-click': childColumnItem.isClick }"
                  @click="
                    handleColumnItemClick(
                      childColumnItem,
                      scope.row[childColumnItem.prop],
                      scope.row
                    )
                  "
                >
                  {{
                    returnObjValue(
                      scope.row[childColumnItem.prop],
                      childColumnItem
                    )
                  }}
                </span>
              </template>
              <template
                v-if="
                  returnType(scope.row[childColumnItem.prop]) === 'string' ||
                  returnType(scope.row[childColumnItem.prop]) === 'number'
                "
              >
                <span
                  :style="{ color: childColumnItem.textColor }"
                  :class="{ 'is-cell-click': childColumnItem.isClick }"
                  @click="
                    handleColumnItemClick(
                      childColumnItem,
                      scope.row[childColumnItem.prop],
                      scope.row
                    )
                  "
                >
                  {{
                    scope.row[childColumnItem.prop]
                      ? scope.row[childColumnItem.prop]
                      : "-"
                  }}
                </span>
              </template>
            </template>
            <template v-if="childColumnItem.childColumn">
              <el-table-column
                v-for="(
                  lastColumnChild, lastColumnIndex
                ) in childColumnItem.childColumn"
                :key="lastColumnIndex"
                :prop="lastColumnChild.prop"
                :label="lastColumnChild.label"
                :width="lastColumnChild.width"
                :min-width="lastColumnChild.minWidth"
              >
                <template #default="scope">
                  <span>
                    <template
                      v-if="
                        returnType(scope.row[lastColumnChild.prop]) === 'array'
                      "
                    >
                      <div
                        :class="{
                          'is-flex-column': lastColumnChild.directionColumn,
                        }"
                      >
                        <span
                          v-for="(textItem, textIndex) in scope.row[
                            lastColumnChild.prop
                          ]"
                          :key="textIndex"
                          :style="{ color: lastColumnChild.textColor }"
                          :class="{ 'is-cell-click': lastColumnChild.isClick }"
                          @click="
                            handleColumnItemClick(
                              lastColumnChild,
                              textItem,
                              scope.row
                            )
                          "
                        >
                          {{
                            lastColumnChild.showValueKey
                              ? textItem[lastColumnChild.showValueKey]
                              : textItem
                          }}
                          {{
                            symbol(
                              textIndex,
                              scope.row[lastColumnChild.prop],
                              lastColumnChild
                            )
                          }}
                        </span>
                      </div>
                    </template>
                    <template
                      v-if="
                        returnType(scope.row[lastColumnChild.prop]) === 'object'
                      "
                    >
                      <span
                        :style="{ color: lastColumnChild.textColor }"
                        :class="{ 'is-cell-click': lastColumnChild.isClick }"
                        @click="
                          handleColumnItemClick(
                            lastColumnChild,
                            scope.row[lastColumnChild.prop],
                            scope.row
                          )
                        "
                      >
                        {{
                          returnObjValue(
                            scope.row[lastColumnChild.prop],
                            lastColumnChild
                          )
                        }}
                      </span>
                    </template>
                    <template
                      v-if="
                        returnType(scope.row[lastColumnChild.prop]) ===
                          'string' ||
                        returnType(scope.row[lastColumnChild.prop]) === 'number'
                      "
                    >
                      <span
                        :style="{ color: lastColumnChild.textColor }"
                        :class="{ 'is-cell-click': lastColumnChild.isClick }"
                        @click="
                          handleColumnItemClick(
                            lastColumnChild,
                            scope.row[lastColumnChild.prop],
                            scope.row
                          )
                        "
                      >
                        {{
                          scope.row[lastColumnChild.prop]
                            ? scope.row[lastColumnChild.prop]
                            : "-"
                        }}
                      </span>
                    </template>
                  </span>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </template>
        <template v-else #default="scope">
          <!-- 操作按钮 -->
          <div
            v-if="item.type === 'editBtns'"
            :class="{ 'is-flex-column': item.directionColumn }"
          >
            <el-button
              v-for="(editBtnItem, editBtnIndex) in scope.row[item.prop]"
              :key="editBtnIndex"
              size="small"
              style="margin-bottom: 5px; margin-top: 5px"
              @click="handleClickEditBtn(scope.row, editBtnItem)"
            >
              {{
                item.showValueKey ? editBtnItem[item.showValueKey] : editBtnItem
              }}
            </el-button>
          </div>

          <!-- 插槽：用于一些特殊展示内容 -->
          <slot
            v-else-if="item.type === 'diyRowData'"
            :name="item.slotName"
            :row="scope.row"
          ></slot>

          <!-- 普通展示类内容 -->
          <span v-else>
            <template v-if="returnType(scope.row[item.prop]) === 'array'">
              <div :class="{ 'is-flex-column': item.directionColumn }">
                <span
                  v-for="(textItem, textIndex) in scope.row[item.prop]"
                  :key="textIndex"
                  :style="{ color: item.textColor }"
                  :class="{ 'is-cell-click': item.isClick }"
                  @click="handleColumnItemClick(item, textItem, scope.row)"
                >
                  {{
                    item.showValueKey ? textItem[item.showValueKey] : textItem
                  }}
                  {{ symbol(textIndex, scope.row[item.prop], item) }}
                </span>
              </div>
            </template>
            <template v-if="returnType(scope.row[item.prop]) === 'object'">
              <span
                :style="{ color: item.textColor }"
                :class="{ 'is-cell-click': item.isClick }"
                @click="
                  handleColumnItemClick(item, scope.row[item.prop], scope.row)
                "
              >
                {{ returnObjValue(scope.row[item.prop], item) }}
              </span>
            </template>
            <template
              v-if="
                returnType(scope.row[item.prop]) === 'string' ||
                returnType(scope.row[item.prop]) === 'number'
              "
            >
              <span
                :style="{ color: item.textColor }"
                :class="{ 'is-cell-click': item.isClick }"
                @click="
                  handleColumnItemClick(item, scope.row[item.prop], scope.row)
                "
              >
                {{ scope.row[item.prop] ? scope.row[item.prop] : "-" }}
              </span>
            </template>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div
      v-if="params.paginationShow"
      style="text-align: right; margin-top: 10px"
    >
      <el-pagination
        v-model:current-page="currentPage"
        :page-sizes="tablePageSizes"
        :page-size="tablePageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, toRefs } from 'vue'

export default defineComponent({
  name: 'ElTablePro',
  props: {
    params: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
    },
  },
  // props: tableProps,
  setup(props, ctx) {
    const tableRef = ref<HTMLElement | null>(null) as any

    // 当前页数
    const currentPage = ref(1)

    // 切换分页展示数量
    const handleSizeChange = (val) => {
      ctx.emit('size-change', val)
    }

    // 切换分页页数
    const handleCurrentChange = (val) => {
      ctx.emit('current-change', val)
    }

    // 多选清空已选项
    const clearSelection = () => {
      tableRef.value!.clearSelection()
    }

    ctx.expose({ clearSelection })

    const filterHandler = (value, row, column) => {
      const property = column['property']
      return row[property] === value
    }

    // 当单元格 hover 进入时会触发该事件
    const handleCellMouseEnter = (row, column, cell, event) => {
      ctx.emit('cell-mouse-enter', row, column, cell, event)
    }

    // 当单元格 hover 进入时会触发该事件
    const handleCellMouseLeave = (row, column, cell, event) => {
      ctx.emit('cell-mouse-leave', row, column, cell, event)
    }

    // 当某个单元格被点击时会触发该事件
    const handleCellClick = (row, column, cell, event) => {
      ctx.emit('cell-click', row, column, cell, event)
    }

    // 当某个单元格被双击击时会触发该事件
    const handleCellDblclick = (row, column, cell, event) => {
      ctx.emit('cell-dblclick', row, column, cell, event)
    }

    // 当某个单元格被鼠标右键点击时会触发该事件
    const handleCellContextmenu = (row, column, cell, event) => {
      ctx.emit('cell-contextmenu', row, column, cell, event)
    }

    // 当某一行被点击时会触发该事件
    const handleRowClick = (row, column, event) => {
      ctx.emit('row-click', row, column, event)
    }

    // 当某一行被双击时会触发该事件
    const handleRowDblclick = (row, column, event) => {
      ctx.emit('row-dblclick', row, column, event)
    }

    // 当某一行被鼠标右键点击时会触发该事件
    const handleRowContextmenu = (row, column, event) => {
      ctx.emit('row-contextmenu', row, column, event)
    }

    // 当某一列的表头被点击时会触发该事件
    const handleHeaderClick = (column, event) => {
      ctx.emit('header-click', column, event)
    }

    // 当某一列的表头被鼠标右键点击时触发该事件
    const handleHeaderContextmenu = (column, event) => {
      ctx.emit('header-contextmenu', column, event)
    }

    // 表头排序触发
    const handleSortChange = (sortObj) => {
      ctx.emit('sort-change', sortObj)
    }

    // 多选框发生变化
    const handleSelectionChange = (val) => {
      ctx.emit('selection-change', val)
    }

    // 单选框发生变化
    const handleRadioChange = (val, row) => {
      ctx.emit('radio-change', val, row)
    }

    // 点击操作按钮
    const handleClickEditBtn = (rowData, btnItem) => {
      ctx.emit('editbtn-click', rowData, btnItem)
    }

    // 点击表格中数据
    const handleColumnItemClick = (column, itemValue, row) => {
      if (column.isClick) {
        ctx.emit('current-cell-click', itemValue, row)
      }
    }

    const tablePageSizes = computed(() => {
      return props.params.pageSizes
        ? props.params.pageSizes
        : [10, 20, 30, 40]
    })

    const tablePageSize = computed(() => {
      return props.params.pageSize ? props.params.pageSize : 10
    })

    // 判断列内容数据类型
    const returnType = computed(() => {
      return (item) => {
        let type = ''
        if (Array.isArray(item)) {
          type = 'array'
        } else {
          type = typeof item
        }
        return type
      }
    })

    // 输出obj列内容的值
    const returnObjValue = computed(() => {
      return (obj, itemObj) => {
        let text = ''
        if (itemObj.showValueKey) {
          text = obj[itemObj.showValueKey]
        }
        text = text ? text : '-'
        return text
      }
    })

    // 输出符号
    const symbol = computed(() => {
      return (index, arr, column) => {
        if (!column.directionColumn) {
          if (index === arr.length - 1) {
            return ''
          } else {
            return '、'
          }
        } else {
          return ''
        }
      }
    })

    return {
      tableRef,
      handleSizeChange,
      handleCurrentChange,
      currentPage,
      tablePageSizes,
      tablePageSize,
      returnType,
      returnObjValue,
      symbol,
      handleClickEditBtn,
      handleColumnItemClick,
      handleRadioChange,
      handleSelectionChange,
      handleSortChange,
      handleCellMouseEnter,
      handleCellMouseLeave,
      handleCellClick,
      handleCellDblclick,
      handleCellContextmenu,
      handleRowClick,
      handleRowDblclick,
      handleRowContextmenu,
      handleHeaderClick,
      handleHeaderContextmenu,
      filterHandler,
    }
  },
})
</script>

<style scoped lang="scss">
.pro-table {
  .is-cell-click {
    cursor: pointer;
  }
  .is-flex-column {
    display: flex;
    flex-direction: column;
  }
}
</style>
