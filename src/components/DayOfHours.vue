<template>
  <div class="col day-of-hours">
    <div class="hour"></div>
    <div class="dayBackground">
      <div v-for="hour in hours" :key="hour" class="hour">{{ drawHour(hour) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DayOfHours",
  props: {
    hourStart: Number,
    hourEnd: Number
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
  },
  methods: {
    drawHour(hour) {
      if (hour < 10) {
        return "0" + hour;
      }
      return hour;
    }
  }
};
</script>

<style scoped>
.day-of-hours {
  width: 100%;
  padding: 0;
}

.dayBackground {
  position: relative;
  display: block;
  width: 100%;
  background-color: rgba(76, 76, 197, 0.5);
}

.hour {
  font-size: 2em;
}
</style>