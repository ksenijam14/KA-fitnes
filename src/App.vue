<template>
  <v-app>
    <div id="app">
      <Nav />
      <div class="breadcrumbs">
        <breadcrumbs />
      </div>
      <div id="page-content">
        <router-view />
        <Footer></Footer>
      </div>
      <CarouselModal />
      <AppointmentModal />
    </div>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Nav from "@/components/Nav";
import CarouselModal from "@/components/CarouselModal";
import AppointmentModal from "@/components/AppointmentModal";
//import Footer from "@/components/Footer"
import allWorkouts from "@/data/workouts";
import commentPermissions from "@/data/commentPermissions";
import allAppointments from "@/data/appointments";
import myAppointments from "@/data/myAppointments";
import { setCookie } from "@/scripts/cookies";

export default {
  name: "App",
  components: {
    Nav,
    CarouselModal,
    AppointmentModal,
    Footer,
    Breadcrumbs
  },
  created() {
    // put data into cookies to fake a database change //
    //comments
    let allComments = [];
    allWorkouts.options.forEach(group => {
      let groupComments = [];
      group.options.forEach(spec => {
        let specComments = spec.comments;
        groupComments.push(specComments);
      });
      allComments.push(groupComments);
    });
    setCookie("comments", allComments);
    //comment permissions
    setCookie("commentPermissions", commentPermissions);
    //user name
    setCookie("username", "Andrija");
    //appointments
    setCookie("appointments", allAppointments);
    //my appointments
    setCookie("myAppointments", myAppointments);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /*font-family: cursive ;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#page-content {
  z-index: 1;
  position: relative;
}
.breadcrumbs {
  padding-left: 90px;
}
@media (max-width: 800px) {
  .breadcrumbs {
    padding-left: 45px;
  }
}
</style>
