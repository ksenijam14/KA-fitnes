<template>
  <div :class="getMyClasses()" :style="myStyle" @click="openModal()">
    <div class="appointment-time" :style="timeStyle">{{ displayTime() }}</div>
    <!-- <div>
      <span>{{ $t("workoutAppointmentAvailableSpots") }}</span>
      <span class="ml-1">{{ appointment.available }}</span>
    </div>-->
    <!-- <div class="appointmentStatus mt-1" v-t="getMyStatus()"></div> -->
  </div>
</template>

<script>
export default {
  name: "AppointmentCard",
  props: {
    appointment: Object
  },
  data() {
    return {
      startHours: -1,
      startMinutes: -1,
      endHours: -1,
      endMinutes: -1,
      oneHourHeight: -1,
      timeNumberOfLines: -1,
      myStyle: "",
      timeStyle: ""
    };
  },
  methods: {
    getMyStyle() {
      let oneHourHeight = this.oneHourHeight;
      let oneMinuteHeight = oneHourHeight / 60;
      let top =
        (this.startHours - 8) * oneHourHeight +
        (this.startMinutes - (this.startMinutes % 5)) * oneMinuteHeight;
      let height =
        (this.endHours - this.startHours) * oneHourHeight +
        (this.endMinutes - this.startMinutes) * oneMinuteHeight;
      top = Math.floor(top);
      height = Math.floor(height);
      let style = "top: " + top + "px;height: " + height + "px;";
      this.myStyle = style;
    },
    getMyClasses() {
      let classes = "appointment-card";
      if (this.appointment.iAmIncluded) {
        classes += " appointment-booked";
      } else if (this.appointment.available > 0) {
        classes += " appointment-active";
      } else {
        classes += " appointment-full";
      }

      return classes;
    },
    getTimeStyle() {
      let oneHourHeight = this.oneHourHeight / this.timeNumberOfLines;
      let oneMinuteHeight = oneHourHeight / 60;
      let height =
        (this.endHours - this.startHours) * oneHourHeight +
        (this.endMinutes - this.startMinutes) * oneMinuteHeight;
      height = Math.floor(height);
      let style = "line-height: " + height + "px;";
      this.timeStyle = style;
    },
    displayTime() {
      let timeArray = [
        this.startHours,
        this.startMinutes,
        this.endHours,
        this.endMinutes
      ];

      for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i] < 10) {
          timeArray[i] = "0" + timeArray[i];
        }
      }

      return (
        timeArray[0] +
        ":" +
        timeArray[1] +
        " - " +
        timeArray[2] +
        ":" +
        timeArray[3]
      );
    },
    getMyStatus() {
      let status = "";
      if (this.appointment.iAmIncluded) {
        status += "appointmentBooked";
      } else if (this.appointment.available > 0) {
        status += "appointmentActive";
      } else {
        status += "appointmentFull";
      }

      return status;
    },
    onResize() {
      let smallScreen = window.matchMedia("(max-width: 959px)");

      let targetHeight = 80;
      let numOfLines = 1;
      if (smallScreen.matches) {
        targetHeight = 160;
        numOfLines = 2;
      }

      if (this.oneHourHeight != targetHeight) {
        this.oneHourHeight = targetHeight;
        this.timeNumberOfLines = numOfLines;
        this.getMyStyle();
        this.getTimeStyle();
      }
    },
    openModal() {
      if (
        this.appointment.available > 0 &&
        this.appointment.iAmIncluded == false
      ) {
        this.$root.$emit("openAppointmentModal", this.appointment);
      }
    }
  },
  created() {
    let startTime = this.appointment.start;
    let endTime = this.appointment.end;

    this.startHours = startTime.getHours();
    this.startMinutes = startTime.getMinutes();
    this.endHours = endTime.getHours();
    this.endMinutes = endTime.getMinutes();

    this.onResize();
    window.addEventListener("resize", this.onResize);
  }
};
</script>

<style scoped>
.appointment-card {
  position: absolute;
  left: 0;
  width: 80%;
  margin: 1px 10%;
  font-size: 0.8em;
  border-radius: 8px;
}

.appointment-active {
  cursor: pointer;
  background-color: rgba(153, 226, 124, 0.99);
}

.appointment-active:hover {
  background-color: rgba(170, 229, 147, 0.99);
  box-shadow: 2px 4px 4px #888888;
  opacity: 0.8;
  color: #102030;
}

.appointment-booked {
  cursor: default;
  background-color: rgba(235, 140, 51, 0.99);
}

.appointment-full {
  cursor: default;
  background-color: rgba(238, 78, 78, 0.99);
}
</style>