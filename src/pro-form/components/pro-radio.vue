<template>
  <el-radio-group
    v-model="pvalue"
    :disabled="computedConfig.disabled"
    :size="computedConfig.size"
    :text-color="computedConfig.textColor"
    :fill="computedConfig.fill"
    @change="(data) => computeFunction(config.change, data)"
  >
    <el-radio
      v-for="(item, itemIndex) in config.props.options"
      :key="itemIndex"
      :disabled="item.disabled"
      :label="item.value"
      :border="computedConfig.border"
      >{{ item.label }}</el-radio
    >
  </el-radio-group>
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
  name: 'ELProRadio',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      console.log('====================================')
      console.log(config)
      console.log('====================================')
      return { ...globalConfig.radio, ...config }
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
