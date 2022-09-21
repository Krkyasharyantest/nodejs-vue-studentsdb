
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/", 
        alias: "/home",
        name: "home",
        meta: { transition: 'slide-left' },
        component:  () => import("./components/my-home.vue")
    },
    {
        path: "/add-student",
        name: "add-student",
        meta: { transition: 'slide-right' },
        component: () => import("./components/add-student.vue")
    },
    {
        path: "/student-details/:id",
        name: "student-details",
        component: () => import("./components/student-details.vue")
    }
];

const router= createRouter({
    history: createWebHistory(),
    routes,
});

export default router;