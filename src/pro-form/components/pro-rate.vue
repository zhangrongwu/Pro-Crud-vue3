<template>
  <el-rate
    v-model="pvalue"
    :max="computedConfig.max"
    :disabled="computedConfig.disabled"
    :texts="computedConfig.texts"
    :colors="computedConfig.colors"
    :allow-half="computedConfig.allowHalf"
    :low-threshold="computedConfig.lowThreshold"
    :high-threshold="computedConfig.highThreshold"
    :void-color="computedConfig.voidColor"
    :icon-classes="computedConfig.iconClasses"
    :show-text="computedConfig.showText"
    :show-score="computedConfig.showScore"
    :text-color="computedConfig.textColor"
    :score-template="computedConfig.scoreTemplate"
    :disabled-void-color="computedConfig.disabledVoidColor"
    :void-icon-class="computedConfig.voidIconClass"
    :disabled-void-icon-class="computedConfig.disabledVoidIconClass"
    @change="(e) => computeFunction(config.change, e)"
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
  name: "ELProRate",
  props: ["config", "modelValue"],
  emits: ["update:modelValue"],

  setup(props, { emit, slots }) {
    const config = props.config;
    let pvalue = ref(props.config.value);
    const computedConfig = computed(() => {
      return { ...{ ...globalConfig.rate, ...config }, ...config.props };
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
      pvalue,
      computedConfig,
      computeFunction,
    };
  },
});
</script>
