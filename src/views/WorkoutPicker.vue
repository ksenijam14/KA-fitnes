<template>
  <div id="workoutPickerDiv" class="container">
    <!-- HEADER -->
    <div class="row justify-content-center">
      <h2>{{ $t("workoutPickerHeader") }}</h2>
    </div>
    <div class="row justify-content-center mt-2">
      <p>{{ $t("workoutPickerText") }}</p>
    </div>
    <!-- CONTENT -->
    <div class="row justify-content-center my-row">
      <!-- FILTER -->
      <div class="col-3 workout-filter">
        <!-- FILTER HEADER -->
        <div>
          <h4>{{ $t("workoutFilterHeader") }}</h4>
        </div>
        <!-- GROUP FILTER -->
        <hr />
        <div>
          <h5>{{ $t("workoutFilterGroups") }}</h5>
          <ul class="filter-list">
            <li v-for="item in allGroups" :key="item">
              <input
                type="checkbox"
                v-model="selectedGroups"
                @change="pullWorkouts()"
                :value="item"
              />
              <span class="filter-item-text" v-t="item"></span>
            </li>
          </ul>
        </div>
        <!-- INTENSITY FILTER -->
        <hr />
        <div>
          <h5>{{ $t("intensity") }}</h5>
          <ul class="filter-list">
            <li v-for="item in allIntensities" :key="item">
              <input
                type="checkbox"
                v-model="selectedIntensities"
                @change="pullWorkouts()"
                :value="item"
              />
              <span class="filter-item-text">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- WORKOUT LIST -->
      <div class="col-9" id="workout-complete-list">
        <transition-group name="animated-list" tag="ul" id="workout-item-list">
          <li v-for="item in workoutList" :key="item.title" class="animated-list-item">
            <WorkoutListItem :workoutItem="item" />
          </li>
        </transition-group>
        <div v-if="workoutList.length == 0" class="no-results">{{ $t("noResults") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutListItem from "@/components/WorkoutListItem";
import allWorkouts from "@/data/workouts";

export default {
  name: "Picker",
  title: "nav.scheduleWorkout",
  components: {
    WorkoutListItem
  },
  data() {
    return {
      workoutList: [],
      allGroups: [],
      selectedGroups: [],
      allIntensities: [1, 2, 3, 4, 5],
      selectedIntensities: []
    };
  },
  methods: {
    pullWorkouts() {
      let groupFilter =
        this.selectedGroups.length > 0 ? this.selectedGroups : this.allGroups;
      let intensityFilter =
        this.selectedIntensities.length > 0
          ? this.selectedIntensities
          : this.allIntensities;
      const regex = /workout_details/;

      this.workoutList = [];
      allWorkouts.options.forEach(workoutGroup => {
        if (groupFilter.includes(workoutGroup.title)) {
          workoutGroup.options.forEach(workout => {
            if (intensityFilter.includes(workout.intensity)) {
              let workoutCopy = JSON.parse(JSON.stringify(workout));
              workoutCopy.link = workoutCopy.link.replace(regex, "appointments");
              this.workoutList.push(workoutCopy);
            }
          });
        }
      });

      // console.log(this.workoutList);
      // console.log(intensityFilter);
    }
  },
  created() {
    allWorkouts.options.forEach(workoutGroup => {
      this.allGroups.push(workoutGroup.title);
    });
    this.pullWorkouts();
  }
};
</script>

<style scoped>
.my-row {
  margin-top: 80px;
  margin-bottom: 80px;
}

/* The filter */

.workout-filter {
  background-color: rgba(247, 243, 48, 0.4);
  margin-bottom: auto;
}

.filter-list {
  list-style-type: none;
  text-align: left;
}

.filter-item-text {
  margin-left: 1em;
}

/* Workout list */

#workout-item-list {
  list-style-type: none;
}

#workout-complete-list {
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

.animated-list-enter, .animated-list-leave-to {
  opacity: 0;
  transform: translateX(1800px);
}

.animated-list-leave-active {
  position: absolute;
}

</style>