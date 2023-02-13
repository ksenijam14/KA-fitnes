<template>
  <div class="col day-of-appointments">
    <div class="hour dayHeader">
      <div v-t="oneDay.id"></div>
      <div>{{ oneDay.num }}</div>
    </div>
    <div class="dayBody">
      <div class="dayBackground">
        <div v-for="hour in hours" :key="hour" class="hour"></div>
      </div>
      <div class="dayForeground">
        <AppointmentCard v-for="appo in oneDay.appointments" :key="appo.id" :appointment="appo" />
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentCard from "@/components/AppointmentCard";

export default {
  name: "DayOfAppointments",
  props: {
    oneDay: Object,
    hourStart: Number,
    hourEnd: Number
  },
  components: {
    AppointmentCard
  },
  data() {
    return {
      hours: []
    };
  },
  created() {
    for (let i = this.hourStart; i < this.hourEnd; i++) {
      this.hours.push(i);
    }
  }
};
</script>

<style scoped>
.day-of-appointments {
  width: 100%;
  padding: 0;
}

.dayHeader {
  font-size: 1.3em;
}

.dayBody {
  position: relative;
}

.dayBackground {
  position: relative;
  display: block;
  width: 100%;
  background-color: rgba(98, 118, 207, 0.3);
}

.dayForeground {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
}
</style>