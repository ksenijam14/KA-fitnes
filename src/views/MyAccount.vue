<template>
  <div id="workoutGroupDiv" class="container">
    <!-- HEADER -->
    <div class="row justify-content-center headerBackground">
      <div class="col-10 accountHeaders">
        <h2>{{ username }}</h2>
        <h4>{{ $t("accountHeader") }}</h4>
      </div>
      <p class="col-9 accountText">{{ $t("accountText") }}</p>
    </div>
    <!-- APPOINTMENT LIST -->
    <div class="row justify-content-center my-row">
      <div class="col-9" id="my-appointments-complete-list">
        <transition-group name="animated-list" tag="ul" id="my-appointments-item-list">
          <li v-for="item in appointmentList" :key="item.id" class="animated-list-item">
            <MyAppointmentListItem
              :appointment="item"
              @appointmentReservationCancel="cancelReservation"
            />
          </li>
        </transition-group>
        <div v-if="appointmentList.length == 0" class="no-results">{{ $t("noResults") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAppointmentListItem from "@/components/MyAppointmentListItem";
import allWorkouts from "@/data/workouts";
import { getCookie } from "@/scripts/cookies";
import { setCookie } from "@/scripts/cookies";

export default {
  name: "MyAccount",
  title: "nav.myAccount",
  components: {
    MyAppointmentListItem
  },
  data() {
    return {
      username: "DefaultUsername",
      appointmentList: []
    };
  },
  methods: {
    simpleCompare(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    },
    compareDates(a, b) {
      let aVal = a.time;
      let bVal = b.time;
      return this.simpleCompare(aVal, bVal);
    },
    findIndexesForReservation(allAppointments, id) {
      let idGroup = 0;
      let idSpec = 0;
      let idAppo = 0;
      let found = false;

      // find appointment for each of my reservations, workout can be found using the same indexes
      while (idGroup < allAppointments.length) {
        idSpec = 0;
        while (idSpec < allAppointments[idGroup].length) {
          idAppo = 0;

          while (idAppo < allAppointments[idGroup][idSpec].length) {
            if (allAppointments[idGroup][idSpec][idAppo].id == id) {
              found = true;
              break;
            } else {
              idAppo++;
            }
          }

          if (found) {
            break;
          }
          idSpec++;
        }

        if (found) {
          break;
        }
        idGroup++;
      }

      // if any index is out of bounds -> skip this reservation
      if (
        found == false ||
        idGroup >= allAppointments.length ||
        idSpec >= allAppointments[idGroup].length ||
        idAppo >= allAppointments[idGroup][idSpec].length ||
        idGroup >= allWorkouts.options.length ||
        idSpec >= allWorkouts.options[idGroup].options.length
      ) {
        return false;
      }

      return {
        idGroup: idGroup,
        idSpec: idSpec,
        idAppo: idAppo
      };
    },
    cancelReservation(id) {
      // get appointments
      let myAppointments = getCookie("myAppointments");
      let allAppointments = getCookie("appointments");

      // find indexes for my reservation (indexes unlock the appointment as well as the workout)
      let searchRes = this.findIndexesForReservation(allAppointments, id);
      if (searchRes == false) {
        return;
      }

      let idGroup = searchRes.idGroup;
      let idSpec = searchRes.idSpec;
      let idAppo = searchRes.idAppo;

      // update appointments
      let canceledReservationIndex = myAppointments.indexOf(id);
      if (canceledReservationIndex == -1) {
        return;
      }

      myAppointments.splice(canceledReservationIndex, 1);
      allAppointments[idGroup][idSpec][idAppo].available++;

      setCookie("myAppointments", myAppointments);
      setCookie("appointments", allAppointments);

      this.refreshComponent();
    },
    refreshComponent() {
      // get username
      this.username = getCookie("username");

      // get appointments
      let myAppointments = getCookie("myAppointments");
      let allAppointments = getCookie("appointments");

      // parse my appointmenst for display
      let appoList = [];

      myAppointments.forEach(myAppo => {
        // find indexes for my reservation (indexes unlock the appointment as well as the workout)
        let searchRes = this.findIndexesForReservation(allAppointments, myAppo);
        if (searchRes == false) {
          return;
        }

        let idGroup = searchRes.idGroup;
        let idSpec = searchRes.idSpec;
        let idAppo = searchRes.idAppo;

        // parse the appointment so all important information can be displayed
        let startTime = new Date(
          allAppointments[idGroup][idSpec][idAppo].start
        );
        let cancelThreshold = new Date(Date.now());
        cancelThreshold.setMinutes(cancelThreshold.getMinutes() + 30);
        let oneAppo = {
          id: myAppo,
          title: allWorkouts.options[idGroup].options[idSpec].title,
          time: startTime,
          minutes: allWorkouts.options[idGroup].options[idSpec].minutes,
          intensity: allWorkouts.options[idGroup].options[idSpec].intensity,
          image: allWorkouts.options[idGroup].options[idSpec].image,
          cancelable: startTime > cancelThreshold
        };

        appoList.push(oneAppo);
      });

      appoList.sort(this.compareDates);
      this.appointmentList = appoList;
    }
  },
  created() {
    this.refreshComponent();
  }
};
</script>

<style scoped>
.headerBackground {
  background-color: rgba(119, 136, 153, 0.2);
  border-radius: 16px;
  padding: 16px;
}

.accountHeaders {
  text-align: left;
}

.accountText {
  margin-top: 32px;
  text-align: left;
}

.my-row {
  margin-top: 40px;
  margin-bottom: 120px;
}

/* Workout list */

#my-appointments-item-list {
  list-style-type: none;
}

#my-appointments-complete-list {
  margin-top: 20px;
}

.no-results {
  font-weight: 200;
  font-size: 1.2em;
  font-style: italic;
}

/* Workout list transitions */

.animated-list-move {
  transition: transform 1s;
}

.animated-list-item {
  transition: all 1s;
}

.animated-list-enter,
.animated-list-leave-to {
  opacity: 0;
  transform: translateX(1800px);
}

.animated-list-leave-active {
  position: absolute;
}
</style>