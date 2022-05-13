<template>
  <el-select
    ref="treeSelect"
    v-model="pvalue"
    :disabled="computedConfig.disabled"
    :multiple="computedConfig.multiple"
    :placeholder="computedConfig.placeholder"
    :clearable="true"
    :collapse-tags="computedConfig.collapseTags"
    filterable
    :size="computedConfig.size"
    @visible-change="handleOptionHidden"
  >
    <el-option value="" style="display: none" />
    <el-option
      v-for="(item, itemIndex) in options"
      :key="itemIndex"
      style="display: none"
      :label="item[getTreeProps.label]"
      :value="item[getNodekey]"
    />
    <!--       :default-expand-all="computeBoolen(computedConfig.defaultExpandAll, false)"
 -->
    <el-tree
      ref="tree"
      :data="treeData"
      :node-key="getNodekey"
      :show-checkbox="computedConfig.multiple"
      :expand-on-click-node="false"
      :props="getTreeProps"
      :highlight-current="true"
      class="select-tree"
      @check="handleCheckChange"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }" class="tree-node">
        <span style="margin-left: 10px; font-size: 14px">
          {{ data[getTreeProps.label] }}</span
        >
      </template>
    </el-tree>
  </el-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { globalConfig } from "../config";

export default defineComponent({
  name: "ELProTree",
  props: ["config", "modelValue"],
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const treeSelect = ref(null) as any;
    const tree = ref(null) as any;
    let config = props.config;
    let pvalue = ref(config.value);
    let treeData: any = ref([]);
    const dic = config.props.data;
    if (dic instanceof Array) {
      treeData.value = dic;
    } else if (dic instanceof Object) {
      treeData.value = dic.data;
    }

    const computedConfig = computed(() => {
      return { ...{ ...globalConfig.tree, ...config }, ...config.props };
    });
    const getNodekey = computed(() => {
      if (computedConfig.value.defaultProps.value) {
        return computedConfig.value.defaultProps.value;
      }
      return "value";
    });

    const getTreeProps = computed(() => {
      const defaultProps = {
        children: "children",
        label: "label",
      };
      if (computedConfig.value.defaultProps.label)
        defaultProps.label = computedConfig.value.defaultProps.label;
      if (computedConfig.value.defaultProps.children)
        defaultProps.children = computedConfig.value.defaultProps.children;
      return defaultProps;
    });

    const options = computed(() => {
      const arr: any = [];
      function getList(source) {
        source.forEach((item) => {
          arr.push(item);
          if (item.children) getList(item.children);
        });
      }
      if (pvalue.value) {
        getList(treeData.value);
        return arr.filter((item) =>
          pvalue.value.includes(item[getNodekey.value])
        );
      }
      return [];
    });

    // 单选时
    const handleNodeClick = (data) => {
      if (!config.multiple) {
        pvalue.value = data[getNodekey.value];
        treeSelect.value.blur();
      }
    };
    // 多选时
    const handleCheckChange = (clickNode, status) => {
      if (config.multiple) {
        pvalue.value = status.checkedKeys;
      } else {
        pvalue.value = tree.value.getCheckedKeys()[0];
      }
    };

    const handleOptionHidden = (val) => {
      if (val) {
        const data = config.multiple ? pvalue.value : [pvalue.value];
        if (data.length > 0) {
          tree.value.setCheckedKeys(data);
        }
      }
    };

    watch(
      () => pvalue.value,
      (val) => {
        emit("update:modelValue", val);
      }
    );
    watch(
      () => props.modelValue,
      (val) => {
        const data = config.multiple ? val : [val];
        if (val !== null && val !== undefined && val !== "" && data.length) {
          tree.value.setCheckedKeys(data);
        } else {
          tree.value.setCheckedKeys([]);
          pvalue.value = [];
        }
      }
    );

    watch(
      () => props.config,
      (val) => {
        const dic = val.props.data;
        if (dic instanceof Array) {
          treeData.value = dic;
        } else if (dic instanceof Object) {
          treeData.value = dic.data;
        }
      }
    );
    return {
      tree,
      pvalue,
      treeData,
      getNodekey,
      getTreeProps,
      options,
      treeSelect,
      computedConfig,
      handleCheckChange,
      handleNodeClick,
      handleOptionHidden,
    };
  },
});
</script>
<style lang="scss">
.select-tree .el-tree-node.is-current > .el-tree-node__content {
  background-color: #f5f7fa;
  font-weight: 700;
  color: #409eff;
}
</style>
