import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/pages/index/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
