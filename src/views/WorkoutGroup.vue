<template>
  <div id="workoutGroupDiv" class="container">
    <!-- HEADER -->
    <div class="row justify-content-center">
      <h2 v-t="selectedWorkoutGroup.title"></h2>
    </div>
    <div class="row justify-content-center mt-2">
      <p v-t="selectedWorkoutGroup.description"></p>
    </div>
    <!-- CONTENT -->
    <div class="row justify-content-center my-row">
      <!-- SORTING OPTIONS -->
      <div class="col-10 col-md-2 sort-wrapper">
        <span>Name</span>
        <span class="sort-button" @click="sortByFunction(compareTitles)">&darr;</span>
        <span class="sort-button" @click="reverseSortByFunction(compareTitles)">&uarr;</span>
      </div>
      <div class="col-10 col-md-2 sort-wrapper">
        <span>Duration</span>
        <span class="sort-button" @click="sortByFunction(compareDurations)">&darr;</span>
        <span class="sort-button" @click="reverseSortByFunction(compareDurations)">&uarr;</span>
      </div>
      <div class="col-10 col-md-2 sort-wrapper">
        <span>Intensity</span>
        <span class="sort-button" @click="sortByFunction(compareIntensities)">&darr;</span>
        <span class="sort-button" @click="reverseSortByFunction(compareIntensities)">&uarr;</span>
      </div>
      <!-- WORKOUT LIST -->
      <div class="col-11" id="workout-flip-list">
        <transition-group name="flip-list" tag="ul" id="workout-item-list">
          <li v-for="item in selectedWorkoutGroup.options" :key="item.id">
            <WorkoutListItem :workoutItem="item" />
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutListItem from "@/components/WorkoutListItem";
import allWorkouts from "@/data/workouts";

export default {
  name: "Workouts",
  title() {
    let idGroup = Number(this.$route.params.id);

    let workoutGroup = allWorkouts.options[idGroup];
    let titleKey = workoutGroup.title;

    return titleKey;
  },
  components: {
    WorkoutListItem
  },
  data() {
    return {
      selectedWorkoutGroup: {}
    };
  },
  methods: {
    sortByFunction(func) {
      let items = this.selectedWorkoutGroup.options;
      items.sort(func);
      this.selectedWorkoutGroup.options = items;
    },
    reverseSortByFunction(func) {
      let items = this.selectedWorkoutGroup.options;
      items.sort(func);
      items.reverse();
      this.selectedWorkoutGroup.options = items;
    },
    simpleCompare(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    },
    compareTitles(a, b) {
      let aVal = this.$i18n.t(a.title);
      let bVal = this.$i18n.t(b.title);
      return this.simpleCompare(aVal, bVal);
    },
    compareDurations(a, b) {
      let aVal = a.minutes;
      let bVal = b.minutes;
      return this.simpleCompare(aVal, bVal);
    },
    compareIntensities(a, b) {
      let aVal = a.intensity;
      let bVal = b.intensity;
      return this.simpleCompare(aVal, bVal);
    }
  },
  created() {
    let id = Number(this.$route.params.id);
    let temp = allWorkouts.options.find(e => e.id == id);
    this.selectedWorkoutGroup = temp;
  }
};
</script>

<style scoped>
.my-row {
  margin-top: 80px;
  margin-bottom: 80px;
}

#workout-item-list {
  list-style-type: none;
}

#workout-flip-list {
  margin: 20px;
}

.flip-list-move {
  transition: transform 1s;
}

.sort-button {
  padding: 8px;
  margin-left: 4px;
  border-radius: 2px;
}

@media (max-width: 767px) {
  .sort-wrapper {
    margin-bottom: 16px;
  }
}

.sort-button:hover {
  background-color: rgb(244, 244, 244);
  cursor: pointer;
}
</style>