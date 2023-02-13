import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AllWorkouts from "@/views/AllWorkouts";
import WorkoutGroup from "@/views/WorkoutGroup";
import WorkoutDetails from "@/views/WorkoutDetails";
import About from "@/views/About";
import Nutritionist from "@/views/Nutritionist";
import Massage from "@/views/Massage";
import WorkoutPicker from "@/views/WorkoutPicker";
import WorkoutAppointments from "@/views/WorkoutAppointments";
import MyAccount from "@/views/MyAccount";
import Test from "@/views/Test";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      breadcrumb: [{ name: "home_key" }],
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      breadcrumb: [{ name: "home_key", link: "/" }, { name: "about_key" }],
    },
  },
  {
    path: "/workouts",
    name: "AllWorkouts",
    component: AllWorkouts,
    meta: {
      breadcrumb: [
        { name: "home_key", link: "/" },
        { name: "all_workouts_key" },
      ],
    },
  },
  {
    path: "/workouts/:id",
    name: "WorkoutGroup",
    component: WorkoutGroup,
    meta: {
      breadcrumb: [
        { name: "home_key", link: "/" },
        { name: "all_workouts_key", link: "/workouts" },
        { name: "all_group_key" },
      ],
    },
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/workout_details/:idGroup/:idSpec",
    name: "WorkoutDetails",
    component: WorkoutDetails,
    meta: {
      breadcrumb: [
        { name: "home_key", link: "/" },
        { name: "all_workouts_key", link: "/workouts" },
        { name: "all_group_key", link: "/workouts/:id" },
        { name: "workout_details_key" },
      ],
    },
  },
  {
    path: "/nutritionist",
    name: "Nutritionist",
    component: Nutritionist,
    meta: {
      breadcrumb: [
        { name: "home_key", link: "/" },
        { name: "nutritionist_key" },
      ],
    },
  },
  {
    path: "/massage",
    name: "Massage",
    component: Massage,
    meta: {
      breadcrumb: [{ name: "home_key", link: "/" }, { name: "massage_key" }],
    },
  },
  {
    path: "/picker",
    name: "WorkoutPicker",
    component: WorkoutPicker,
    meta: {
      breadcrumb: [{ name: "home_key", link: "/" }, { name: "picker_key" }],
    },
  },
  {
    path: "/appointments/:idGroup/:idSpec",
    name: "WorkoutAppointments",
    component: WorkoutAppointments,
    meta: {
      breadcrumb: [
        { name: "home_key", link: "/" },
        { name: "picker_key", link: "/picker" },
        { name: "appointment_key" },
      ],
    },
  },
  {
    path: "/account",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      breadcrumb: [{ name: "home_key", link: "/" }, {name: "nav.myAccount"}]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
