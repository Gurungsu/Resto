import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import AppLogin from "./components/AppLogin.vue";
import Group from "./components/Group.vue";
import CreateGroup from "./components/CreateGroup.vue";
import RestoSearch from "./components/RestoSearch.vue";

Vue.use(VueRouter);
const myRoutes: Array<RouteConfig> = [
  {
    name: "Login",
    path: "/",
    component: AppLogin,
  },
  {
    name: "Groups",
    path: "/group",
    component: Group,
  },
  {
    name: "CreateGroup",
    path: "/CreateGroup",
    component: CreateGroup,
  },
  {
    name: "RestoSearch",
    path: "/restosearch",
    component: RestoSearch,
  }
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   
