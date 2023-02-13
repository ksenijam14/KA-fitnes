<template>
  <div id="workouts" class="container">
    <div class="row justify-content-center">
      <h2 v-t="selectedWorkoutGroup.title"></h2>
    </div>
    <div class="row justify-content-center mt-2">
      <p v-t="selectedWorkoutGroup.description"></p>
    </div>

    <div class="row justify-content-center my-row">
      <WorkoutCard v-for="item in selectedWorkoutGroup.options" :key="item.id" :workoutItem="item" />
    </div>
  </div>
</template>

<script>
import WorkoutCard from "@/components/WorkoutCard";
import allWorkouts from "@/data/workouts";

export default {
  name: "AllWorkouts",
  title: "nav.workouts",
  components: {
    WorkoutCard
  },
  data() {
    return {
      selectedWorkoutGroup: {}
    };
  },
  created() {
    this.selectedWorkoutGroup = allWorkouts;
  }
};
</script>

<style scoped>
#workouts {
  width: 100%;
}

.my-row {
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>