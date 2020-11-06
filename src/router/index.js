import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../components/layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/login/login.vue");
    }
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "product",
        name: "Product",
        component: function () {
          return import("../views/product/product.vue");
        }
      },
      {
        path: "productdetail",
        name: "productdetail",
        component: () => import("../views/product/productdetail.vue")
      },
      {
        path: "buycar",
        component: () => import("../views/buycar/buycar.vue")
      },
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
