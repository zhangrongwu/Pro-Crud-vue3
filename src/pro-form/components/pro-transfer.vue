<template>
  <el-transfer
    v-model="pvalue"
    :data="computedConfig.data"
    :filterable="computedConfig.filterable"
    :titles="computedConfig.titles"
    :format="computedConfig.format"
    :props="computedConfig.props"
    :filter-placeholder="computedConfig.filterPlaceholder"
    :filter-method="computedConfig.filterMethod"
    :target-order="computedConfig.targetOrder"
    :button-texts="computedConfig.buttonTexts"
    :render-content="computedConfig.renderContent"
    :left-default-checked="computedConfig.leftDefaultChecked"
    :right-default-checked="computedConfig.rightDefaultChecked"
    @change="(a, b, c) => computeFunction(config.change, a, b, c)"
    @left-check-change="(a, b) => computeFunction(config.blur, a, b)"
    @right-check-change="(a, b) => computeFunction(config.blur, a, b)"
  />
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
  name: 'ELProTransfer',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.transfer, ...config }
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
    return {
      props,
      pvalue,
      config,
      computedConfig,
      computeFunction,
    }
  },
})
</script>
