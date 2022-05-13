<template>
  <el-checkbox-group
    v-model="pvalue"
    :size="computedConfig.size"
    :disabled="computedConfig.disabled"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :text-color="computedConfig.textColor"
    :fill="computedConfig.fill"
    @change="(data) => computeFunction(config.change, data)"
  >
    <el-checkbox
      v-for="(item, itemIndex) in getDic"
      :key="itemIndex"
      :label="item[valueName]"
      :true-label="item.trueLabel"
      :false-label="item.falseLabel"
      :disabled="item.disabled"
      :border="computedConfig.border"
      :checked="item.checked"
      :indeterminate="item.indeterminate"
      >{{ item[labelName] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script lang="ts">
import {
  computed,
  inject,
  defineComponent,
  Text,
  ref,
  reactive,
  watch,
} from 'vue'
import { globalConfig } from '../config'

export default defineComponent({
  name: 'ELProCheckbox',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.checkbox, ...config }
    })
    const getDic = computed(() => {
      const dic = config.props.options
      if (dic instanceof Array) {
        return dic
      } else if (dic.data instanceof Array) {
        return dic.data
      }
      return undefined
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

    const labelName = config.props.options.label
      ? config.props.options.label
      : 'label'
    const valueName = config.props.options.value
      ? config.props.options.value
      : 'value'

    return {
      props,
      config,
      computedConfig,
      getDic,
      labelName,
      valueName,
      pvalue,
      computeFunction,
    }
  },
})
</script>
