<template>
  <el-tree-select
    v-model="pvalue"
    :data="treeData"
    :multiple="computedConfig.multiple"
    :show-checkbox="computedConfig.multiple"
    :props="getTreeProps"
    :node-key="getNodekey"
  />
  <!-- <el-tree-select v-model="value" :data="data" multiple show-checkbox /> -->
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
        // emit("update:modelValue", val);
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

    const value = ref();

    const data = [
      {
        value: "1",
        label: "Level one 1",
        children: [
          {
            value: "1-1",
            label: "Level two 1-1",
            children: [
              {
                value: "1-1-1",
                label: "Level three 1-1-1",
              },
            ],
          },
        ],
      },
      {
        value: "2",
        label: "Level one 2",
        children: [
          {
            value: "2-1",
            label: "Level two 2-1",
            children: [
              {
                value: "2-1-1",
                label: "Level three 2-1-1",
              },
            ],
          },
          {
            value: "2-2",
            label: "Level two 2-2",
            children: [
              {
                value: "2-2-1",
                label: "Level three 2-2-1",
              },
            ],
          },
        ],
      },
      {
        value: "3",
        label: "Level one 3",
        children: [
          {
            value: "3-1",
            label: "Level two 3-1",
            children: [
              {
                value: "3-1-1",
                label: "Level three 3-1-1",
              },
            ],
          },
          {
            value: "3-2",
            label: "Level two 3-2",
            children: [
              {
                value: "3-2-1",
                label: "Level three 3-2-1",
              },
            ],
          },
        ],
      },
    ];
    return {
      value,
      data,
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
