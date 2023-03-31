<!--
    图标提供器，由于小程序不支持SVG图标，所以需要
    通过svg转码base64后，再加载到图标，理论上支持
    所有的SVG图标库，但本项目是使用iconpark图标库
    ，需要提取iconpark的SVG之后，再转换成base64，
    加载到本组件的image视图内。
-->
<template>
  <image
    :src="iconBase64"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  />
</template>

<script setup lang="ts">
import { getIconBase64 } from "@/tools/icon";

import type { IIconProps } from "@icon-park/svg/lib/runtime";

// 组件props
const props = withDefaults(
  defineProps<{
    icon: string; //图标名称
    size?: IIconProps["size"]; //大小
    strokeWidth?: IIconProps["strokeWidth"]; //粗体粗细
    strokeLinecap?: IIconProps["strokeLinecap"]; //图标拐角样式
    strokeLinejoin?: IIconProps["strokeLinejoin"]; //图标端点样式
    theme?: IIconProps["theme"]; //图标样式
    fill?: IIconProps["fill"]; //图标填充颜色
  }>(),
  {}
);

// 图标base64变量
let iconBase64 = createIcon();

// 监听props变化，动态修改图标
watch(
  () => props,
  () => {
    iconBase64 = createIcon();
  }
);

// 根据参数生成图标的base64格式
function createIcon(): string {
  return getIconBase64({
    name: props.icon,
    props: {
      size: props.size,
      strokeWidth: props.strokeWidth,
      strokeLinecap: props.strokeLinecap,
      strokeLinejoin: props.strokeLinejoin,
      theme: props.theme,
      fill: props.fill,
    },
  });
}
</script>
