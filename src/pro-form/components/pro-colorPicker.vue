<template>
  <el-color-picker
    v-model="pvalue"
    :disabled="computedConfig.disabled"
    :size="computedConfig.size"
    :predefine="computedConfig.predefine"
    :show-alpha="computedConfig.showAlpha"
    :color-format="computedConfig.colorFormat"
    :popper-class="computedConfig.popperClass"
    @change="(e) => computeFunction(config.change, e)"
    @active-change="(e) => computeFunction(config.activeChange, e)"
  />
</template>
<script lang="ts">
import { computed, inject, defineComponent, ref, reactive, watch } from 'vue'
import { globalConfig } from '../config'

export default defineComponent({
  name: 'ELProColorPicker',
  props: ['config', 'modelValue'],
  emits: ['update:modelValue'],

  setup(props, { emit, slots }) {
    const config = props.config
    let pvalue = ref(props.config.value)
    const computedConfig = computed(() => {
      return { ...globalConfig.colorPicker, ...config }
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
      config,
      pvalue,
      computedConfig,
      computeFunction,
    }
  },
})
</script>
