<template>
  <div id="appointmentModal">
    <transition name="modal">
      <div class="modal-mask" v-if="showModal" @close="closeModal()">
        <div class="modal-wrapper" @click.self="closeModal()">
          <div class="modal-container">
            <div class="modal-body">
              <div class="appointment-time">{{ time }}</div>
              <div>
                <span>{{ $t("workoutAppointmentAvailableSpots") }}</span>
                <span class="ml-1">{{ available }}</span>
              </div>
              <div v-if="canReserve">
                <button class="btn btn-primary reservationButton" @click="makeReservation()">{{ $t("appointmentActive")}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getCookie } from "@/scripts/cookies";
import { setCookie } from "@/scripts/cookies";

export default {
  name: "AppointmentModal",
  data() {
    return {
      showModal: false,
      time: "",
      available: -1,
      canReserve: false,
      id: ""
    };
  },
  methods: {
    openModal(appointment) {
      // console.log(appointment);
      let timeArray = [
        appointment.start.getHours(),
        appointment.start.getMinutes(),
        appointment.end.getHours(),
        appointment.end.getMinutes()
      ];
      for (let i = 0; i < timeArray.length; i++) {
        if (timeArray[i] < 10) {
          timeArray[i] = "0" + timeArray[i];
        }
      }

      this.time =
        timeArray[0] +
        ":" +
        timeArray[1] +
        " - " +
        timeArray[2] +
        ":" +
        timeArray[3];
      this.available = appointment.available;
      this.canReserve =
        appointment.available > 0 && appointment.iAmIncluded == false;
      this.id = appointment.id;

      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    makeReservation() {
      let appointments = getCookie("appointments");
      let myAppointments = getCookie("myAppointments");

      myAppointments.push(this.id);
      appointments.forEach(workoutGroup => {
          workoutGroup.forEach(workout => {
              workout.forEach(appo => {
                  if (appo.id == this.id) {
                      appo.available--;
                  }
              });
          });
      });

      // console.log("myAppointments = " + myAppointments);
      setCookie("appointments", appointments);
      setCookie("myAppointments", myAppointments);

      this.$root.$emit("appointmentReservationMade", this.id);
      this.closeModal();
    }
  },
  mounted() {
    this.$root.$on("openAppointmentModal", value => this.openModal(value));
  }
};
</script>

<style scoped>
.reservationButton {
  margin-top: 20px;
}

/* Modal classes */

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  margin: auto auto;
  padding: 0px;
  border-radius: 20px;
  color: black;
  background-color: rgba(153, 226, 124, 0.99);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 0;
  padding: 28px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>