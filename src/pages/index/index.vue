<template>
  <view class="index w-screen h-screen flex flex-col justify-center items-center">
    <text class="text-2xl font-bold">{{ msg }}</text>

    <view class="mt-40">
      <nut-button type="primary">开始吧！</nut-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import "./index.less";

const msg = ref<string>("Let's start to code!");
</script>
