<template>
  <div class="breadcrumb">
    <ul>
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{ linked: !!breadcrumb.link }"
        v-t="breadcrumb.name"
      ></li>
    </ul>
  </div>
</template>

<script>
import allWorkouts from "@/data/workouts";

export default {
  name: "Breadcrumb",
  methods: {
    routeTo(pRouteTo) {
      let tmp = this.breadcrumbList;
      if (tmp[pRouteTo].link) this.$router.push(tmp[pRouteTo].link);
    },
  },
  computed: {
    breadcrumbList() {
      let breadcrumbs = JSON.parse(JSON.stringify(this.$route.meta.breadcrumb));

      // workout group fix link
      if (
        breadcrumbs.length == 4 &&
        breadcrumbs[3].name == "workout_details_key"
      ) {
        let idGroup = Number(this.$route.params.idGroup);
        const regex = /:id/;
        breadcrumbs[2].link = breadcrumbs[2].link.replace(regex, idGroup);
      }

      // specific names
      // for workout group
      if (breadcrumbs.length == 3 && breadcrumbs[2].name == "all_group_key") {
        let idGroup = Number(this.$route.params.id);
        let workoutGroup = allWorkouts.options.find(
          (group) => group.id == idGroup
        );
        breadcrumbs[2].name = workoutGroup.title;
      }
      // for workout details
      if (
        breadcrumbs.length == 4 &&
        breadcrumbs[3].name == "workout_details_key"
      ) {
        let idGroup = Number(this.$route.params.idGroup);
        let idSpec = Number(this.$route.params.idSpec);
        let workoutGroup = allWorkouts.options.find(
          (group) => group.id == idGroup
        );
        let selectedWorkout = workoutGroup.options.find((e) => e.id == idSpec);
        breadcrumbs[2].name = workoutGroup.title;
        breadcrumbs[3].name = selectedWorkout.title;
      }
      // for workout appointments
      if (breadcrumbs.length == 3 && breadcrumbs[2].name == "appointment_key") {
        let idGroup = Number(this.$route.params.idGroup);
        let idSpec = Number(this.$route.params.idSpec);
        let workoutGroup = allWorkouts.options.find(
          (group) => group.id == idGroup
        );
        let selectedWorkout = workoutGroup.options.find((e) => e.id == idSpec);
        breadcrumbs[2].name = selectedWorkout.title + "Appo";
      }

      return breadcrumbs;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  background-color: white;
}
ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul > li {
  display: flex;
  float: left;
  height: 10px;
  width: auto;
  color: rgb(53, 122, 145);
  font-weight: bold;
  font-size: 0.8em;
  cursor: default;
  align-items: center;
}
ul > li:not(:last-child)::after {
  content: "/";
  float: right;
  font-size: 0.8em;
  margin: 0 0.5em;
  color: rgb(53, 122, 145);
  cursor: default;
}
.linked {
  cursor: pointer;
  font-size: 1em;
  font-weight: normal;
}
</style>
