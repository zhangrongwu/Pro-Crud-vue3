<template>
  <el-input-number
    v-model="pvalue"
    :min="computedConfig.min"
    :max="computedConfig.max"
    :step="computedConfig.step"
    :step-strictly="computedConfig.stepStrictly"
    :precision="computedConfig.precision"
    :size="computedConfig.size"
    :disabled="computedConfig.disabled"
    :controls="computedConfig.controls"
    :controls-position="computedConfig.controlsPosition"
    :name="computedConfig.name"
    :label="computedConfig.label"
    :placeholde="computedConfig.placeholde"
    @change="
      (currentValue, oldValue) =>
        computeFunction(config.change, currentValue, oldValue)
    "
    @blur="(e) => computeFunction(config.blur, e)"
    @focus="(e) => computeFunction(config.focus, e)"
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
} from "vue";
import { globalConfig } from "../config";

export default defineComponent({
  name: "ELProInpuNumber",
  props: ["config", "modelValue"],
  emits: ["update:modelValue"],

  setup(props, { emit, slots }) {
    const config = props.config;
    const pvalue = ref(props.modelValue);
    const computedConfig = computed(() => {
      return { ...globalConfig.inputNumber, ...config };
    });
    const computeFunction = (fun, ...data) => {
      if (fun) {
        fun(...data);
      } else {
        return false;
      }
    };
    watch(
      () => pvalue.value,
      (val) => {
        emit("update:modelValue", val);
      }
    );
    return {
      props,
      config,
      computedConfig,
      pvalue,
      computeFunction,
    };
  },
});
</script>
