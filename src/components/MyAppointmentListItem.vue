<template>
  <div class="my-appointment-list-item">
    <div class="card">
      <!-- APPOINTMENT CARD BODY -->
      <div class="card-body row">
        <div class="col-12 col-md-4 col-lg-7">
          <div class="row">
            <!-- APPOINTMENT INFO -->
            <div class="col-12 col-lg-8">
              <h4 class="card-title">{{ justTranslate(appointment.title) }}</h4>
              <div class="card-text appointmentInfo">
                <div>{{ getTime() }}</div>
                <div>{{ getDate() }}</div>
              </div>
            </div>
            <!-- WORKOUT INFO -->
            <div class="col-12 col-lg-4 mt-4">
              <div class="mb-3">
                <h5>{{ $t("duration") }}:</h5>
                <span>{{ appointment.minutes }}</span>
                <span>&nbsp;{{ $t("minutes") }}</span>
              </div>
              <div>
                <h5>{{ $t("intensity") }}:</h5>
                <img
                  class="d-inline star"
                  v-for="index in 5"
                  :key="index"
                  :src="require(index<=appointment.intensity?'../../public/img/star_full.png':'../../public/img/star_empty.png')"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- WORKOUT IMAGE -->
        <div class="col-12 col-md-8 col-lg-5 image-wrapper">
          <img class="workout-image" :src="require('../../public/img/' + appointment.image)" />
        </div>
        <!-- APPOINTMENT CANCEL BUTTON -->
        <div v-if="appointment.cancelable" class="col-12">
          <button class="btn btn-danger" @click="cancelReservation()">{{ $t("cancelAppointment") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyAppointmentListItem",
  props: {
    appointment: Object
  },
  methods: {
    justTranslate(key) {
      return this.$i18n.t(key);
    },
    getTime() {
      let hours = this.appointment.time.getHours();
      let minutes = this.appointment.time.getMinutes();

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return hours + ":" + minutes;
    },
    getDate() {
      let day = this.appointment.time.getDate();
      let month = this.appointment.time.getMonth();
      let year = this.appointment.time.getFullYear();

      return day + " " + this.justTranslate("fullMonth" + month) + " " + year;
    },
    cancelReservation() {
      let cancelThreshold = new Date(Date.now());
      cancelThreshold.setMinutes(cancelThreshold.getMinutes() + 30);
      if (this.appointment.cancelable && this.appointment.time > cancelThreshold) {
        this.$emit("appointmentReservationCancel", this.appointment.id);
      } else {
          this.appointment.cancelable = false;
      }
    }
  }
};
</script>

<style scoped>
.my-appointment-list-item {
  margin: 16px;
}

.card {
  background-color: rgba(128, 32, 32, 0.2);
  text-decoration: none;
  color: #2c3e50;
}

.card:hover {
  box-shadow: 5px 10px 8px #888888;
  opacity: 0.95;
  color: #102030;
}

.appointmentInfo {
  font-size: 1.4em;
  font-weight: 600;
}

@media (min-width: 768px) {
  .image-wrapper {
    margin: auto 0;
  }
}

@media (max-width: 767px) {
  .image-wrapper {
    margin-top: 20px;
  }
}

.workout-image {
  width: 270px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
}

.star {
  width: 20px;
  height: auto;
}
</style>