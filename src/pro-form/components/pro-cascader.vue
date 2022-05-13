<template>
  <el-cascader
    v-model="pvalue"
    :options="computedConfig.props.options"
    :props="computedConfig.props"
    :size="computedConfig.size"
    :placeholder="computedConfig.placeholder"
    :disabled="computedConfig.disabled"
    :clearable="computedConfig.clearable"
    :show-all-levels="computedConfig.showAllLevels"
    :collapse-tags="computedConfig.collapseTags"
    :separator="computedConfig.separator"
    :filterable="computedConfig.filterable"
    :filter-method="computedConfig.filterMethod"
    :debounce="computedConfig.debounce"
    :before-filter="computedConfig.beforeFilter"
    :popper-class="computedConfig.popperClass"
    @change="(e) => computeFunction(config.change, e)"
    @expand-change="(e) => computeFunction(config.expandChange, e)"
    @blur="(e) => computeFunction(config.blur, e)"
    @focus="(e) => computeFunction(config.focus, e)"
    @visible-change="(e) => computeFunction(config.visibleChange, e)"
    @remove-tag="(e) => computeFunction(config.removeTag, e)"
  />
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { globalConfig } from '../config'

export default defineComponent({
  name: 'ELProCascader',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.cascader, ...config }
    })
    const computeFunction = (fun, ...data) => {
      if (fun) {
        fun(...data)
      } else {
        return false
      }
    }
    watch(
      () => pvalue.value,
      (val) => {
        emit('update:modelValue', val)
      }
    )
    watch(
      () => props.modelValue,
      (val) => {
        pvalue.value = val;
      }
    );
    return {
      props,
      config,
      pvalue,
      computedConfig,
      computeFunction,
    }
  },
})
</script>
