import Vue from "vue";
import VueRouter,{ RouteConfig } from "vue-router";
import AppLogin from "./components/AppLogin.vue";
import Group from "./components/Group.vue";
import Nav from "./components/Nav.vue";

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
    name: "Nav",
    path: "/Nav",
    component: Nav,
  },
];

export const AppRouter = new VueRouter({ 
  routes: myRoutes, 
  mode: "history" 
});   
