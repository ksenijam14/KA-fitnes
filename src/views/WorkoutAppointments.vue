<template>
  <div id="workoutAppointmentsDiv" class="container">
    <!-- HEADER -->
    <div class="row justify-content-center m-2">
      <h2 v-t="title"></h2>
    </div>
    <div class="col-12 mt-2 mb-2">
      <router-link :to="'/workout_details/' + idGroup + '/' + idSpec">
        <button class="btn btn-primary">{{ $t("checkoutDetails") }}</button>
      </router-link>
    </div>
    <div class="row justify-content-center mt-5">
      <h4>{{ $t("workoutAppointmentsHeader") }}</h4>
    </div>
    <div class="row justify-content-center mt-2">
      <p>{{ $t("workoutAppointmentsText") }}</p>
    </div>
    <!-- CALENDAR -->
    <div class="row justify-content-center calendar">
      <!-- CALENDAR CONTROLS -->
      <div class="col-12">
        <div class="row calendar-control-bar">
          <div>
            <button class="btn calendar-control-bar-arrow" @click="previousWeek()">
              <svg
                x="0px"
                y="0px"
                viewBox="42.5 151 289 492"
                style="enable-background:new 42.5 151 289 492;"
                xml:space="preserve"
              >
                <path
                  class="st0"
                  style="{fill: #ffffff;}"
                  d="M42.5,396.9c0,7.2,2.8,14,7.8,19.1l219.2,219.1c5.1,5.1,11.8,7.9,19,7.9s14-2.8,19-7.9l16.1-16.1 c5.1-5.1,7.9-11.8,7.9-19c0-7.2-2.8-14-7.9-19L139.6,396.9L323.5,213c10.5-10.5,10.5-27.6,0-38.1l-16.1-16.1 c-5.1-5.1-11.8-7.9-19-7.9s-14,2.8-19,7.9L50.3,377.8C45.3,382.9,42.5,389.7,42.5,396.9z"
                />
              </svg>
            </button>
            <button class="btn calendar-control-bar-arrow" @click="nextWeek()">
              <svg
                x="0px"
                y="0px"
                viewBox="42.5 151 289 492"
                style="enable-background:new 42.5 151 289 492;"
                xml:space="preserve"
              >
                <path
                  class="st1"
                  style="{fill: #ffffff;}"
                  d="M323.7,377.8L104.7,158.9c-5.1-5.1-11.8-7.9-19-7.9s-14,2.8-19,7.9L50.5,175c-10.5,10.5-10.5,27.6,0,38.1 l183.9,183.9L50.3,581c-5.1,5.1-7.9,11.8-7.9,19c0,7.2,2.8,14,7.9,19l16.1,16.1c5.1,5.1,11.8,7.9,19,7.9s14-2.8,19-7.9L323.7,416 c5.1-5.1,7.9-11.9,7.8-19.1C331.5,389.7,328.8,382.9,323.7,377.8z"
                />
              </svg>
            </button>
          </div>
          <div class="calendar-control-bar-text">
            <span id="monday-date">{{ getMondayText() }}</span>
            <span>&nbsp;-&nbsp;</span>
            <span id="sunday-date">{{ getSundayText() }}</span>
          </div>
          <div class="calendar-control-bar-text" id="current-year">{{ getYearText() }}</div>
        </div>
      </div>
      <div class="col-12 calendar-content">
        <div class="row justify-content-center">
          <!-- CALENDAR LEFT -->
          <DayOfHours :hourStart="hourStart" :hourEnd="hourEnd" />
          <!-- CALENDAR CONTENT -->
          <DayOfAppointments
            v-for="day in appointments"
            :key="day.id"
            :oneDay="day"
            :hourStart="hourStart"
            :hourEnd="hourEnd"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allWorkouts from "@/data/workouts";
import { getCookie } from "@/scripts/cookies";
import DayOfAppointments from "@/components/DayOfAppointments";
import DayOfHours from "@/components/DayOfHours";

export default {
  name: "Appointments",
  title() {
    let idGroup = Number(this.$route.params.idGroup);
    let idSpec = Number(this.$route.params.idSpec);

    let workout = allWorkouts.options[idGroup].options[idSpec];
    let titleKey = workout.title + "Appo";

    return titleKey;
  },
  components: {
    DayOfAppointments,
    DayOfHours
  },
  data() {
    return {
      idGroup: -1,
      idSpec: -1,
      title: "",
      preFilterAppos: [],
      duration: -1,
      appointments: [],
      mondayDate: null,
      sundayDate: null,
      hourStart: 8,
      hourEnd: 23
    };
  },
  methods: {
    refreshComponent(idGroup, idSpec) {
      this.idGroup = idGroup;
      this.idSpec = idSpec;

      // get appointments from cookies
      let allAppointments = getCookie("appointments");

      // get appointments for this workout
      let workoutGroup = allWorkouts.options.find(group => group.id == idGroup);
      let selectedWorkout = workoutGroup.options.find(e => e.id == idSpec);
      this.title = selectedWorkout.title;
      let duration = selectedWorkout.minutes;
      let selectedAppointments = allAppointments[idGroup][idSpec];

      this.duration = duration;
      this.preFilterAppos = selectedAppointments;

      // get beginning and end of the current week
      let nowMillis = Date.now();
      let nowDate = new Date(nowMillis);
      let monDate = new Date(nowMillis);
      monDate.setDate(
        nowDate.getDate() - nowDate.getDay() + (nowDate.getDay() == 0 ? -6 : 1)
      );
      monDate.setHours(0);
      monDate.setMinutes(0);
      monDate.setSeconds(0);
      let sunDate = new Date(nowMillis);
      sunDate.setDate(
        nowDate.getDate() - nowDate.getDay() + (nowDate.getDay() == 0 ? 0 : 7)
      );
      sunDate.setHours(23);
      sunDate.setMinutes(59);
      sunDate.setSeconds(59);
      this.mondayDate = monDate;
      this.sundayDate = sunDate;

      // load relevant appointments
      this.loadApposForThisWeek();
    },
    loadApposForThisWeek() {
      // get my appointments from cookies
      let myAppointments = getCookie("myAppointments");

      // setup appointment day objects
      let monday = {
        id: "mon",
        num: 0,
        appointments: []
      };
      let tuesday = {
        id: "tue",
        num: 1,
        appointments: []
      };
      let wednesday = {
        id: "wed",
        num: 2,
        appointments: []
      };
      let thursday = {
        id: "thu",
        num: 3,
        appointments: []
      };
      let friday = {
        id: "fri",
        num: 4,
        appointments: []
      };
      let saturday = {
        id: "sat",
        num: 5,
        appointments: []
      };
      let sunday = {
        id: "sun",
        num: 6,
        appointments: []
      };
      let appointmentsProcessed = [
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      ];

      appointmentsProcessed.forEach(day => {
        let oneDate = new Date(this.mondayDate);
        oneDate.setDate(oneDate.getDate() + day.num);
        day.num = oneDate.getDate();
      });

      // filter appointments by day
      this.preFilterAppos.forEach(appo => {
        let startTime = new Date(appo.start);
        if (startTime < this.mondayDate || startTime > this.sundayDate) {
          return;
        }

        let endTime = new Date(startTime.getTime() + this.duration * 60 * 1000); // x minutes = x * 60 * 1000 milliseconds
        let included = myAppointments.includes(appo.id);
        let appoProcessed = {
          id: appo.id,
          start: startTime,
          end: endTime,
          available: appo.available,
          iAmIncluded: included
        };

        let dayOfTheWeek = (startTime.getDay() + 6) % 7;
        appointmentsProcessed[dayOfTheWeek].appointments.push(appoProcessed);
      });

      this.appointments = appointmentsProcessed;
    },
    callLoadAppos(value) {
      console.log(value);
      this.loadApposForThisWeek();
    },
    nextWeek() {
      this.mondayDate.setDate(this.mondayDate.getDate() + 7);
      this.sundayDate.setDate(this.sundayDate.getDate() + 7);

      this.loadApposForThisWeek();
    },
    previousWeek() {
      this.mondayDate.setDate(this.mondayDate.getDate() - 7);
      this.sundayDate.setDate(this.sundayDate.getDate() - 7);

      this.loadApposForThisWeek();
    },
    getMondayText() {
      let txt = "" + this.mondayDate.getDate();

      if (this.mondayDate.getMonth() != this.sundayDate.getMonth()) {
        txt += " " + this.$i18n.t("month" + this.mondayDate.getMonth());
      }
      if (this.mondayDate.getYear() != this.sundayDate.getYear()) {
        txt += " " + ("" + this.mondayDate.getFullYear()).substring(2);
      }

      return txt;
    },
    getSundayText() {
      let txt = "" + this.sundayDate.getDate();

      txt += " " + this.$i18n.t("month" + this.sundayDate.getMonth());
      if (this.mondayDate.getYear() != this.sundayDate.getYear()) {
        txt += " " + ("" + this.sundayDate.getFullYear()).substring(2);
      }

      return txt;
    },
    getYearText() {
      let txt = "";

      if (this.mondayDate.getYear() == this.sundayDate.getYear()) {
        txt += this.mondayDate.getFullYear();
      }
      return txt;
    }
  },
  created() {
    let idGroup = Number(this.$route.params.idGroup);
    let idSpec = Number(this.$route.params.idSpec);
    this.refreshComponent(idGroup, idSpec);

    this.$root.$on("appointmentReservationMade", value =>
      this.callLoadAppos(value)
    );
  },
  beforeRouteUpdate(to, from, next) {
    let idGroup = Number(to.params.idGroup);
    let idSpec = Number(to.params.idSpec);
    if (idGroup != this.idGroup || idSpec != this.idSpec) {
      this.refreshComponent(idGroup, idSpec);
    }
    next();
  }
};
</script>

<style>
.calendar {
  margin: 40px 0;
}

.calendar-control-bar {
  background-color: rgba(31, 34, 58, 0.9);
  border-radius: 16px;
  padding: 50px;
  justify-content: space-between;
}

.calendar-control-bar-arrow {
  background-color: whitesmoke;
  border-radius: 30px;
  margin: 0 4px;
}

.calendar-control-bar-arrow > svg {
  height: 30px;
}

.calendar-control-bar-text {
  color: whitesmoke;
  font-size: 2em;
}

.calendar-content {
  padding: 1px 20px;
}

.hour {
  margin: 0;
  border: solid rgba(0, 0, 0, 0.2) 1px;
}

@media (min-width: 960px) {
  .hour {
    height: 80px;
  }
}

@media (max-width: 959px) {
  .hour {
    height: 160px;
  }
}
</style>