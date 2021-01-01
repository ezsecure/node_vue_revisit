import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import About from "./views/About";
import About2 from "./views/About2";
import About3 from "./views/About3";
import HelloWorld from "./views/HelloWorld";

Vue.use(VueRouter);

const router = new VueRouter({
    mode : "history",
    routes : [
        {path : "/", component : Home},
        {path : "/about", component : About},
        {path : "/about2", component : About2},
        {path : "/about3", component : About3},
        {path : "/hello", component : HelloWorld},
    ]
});

export default router;
