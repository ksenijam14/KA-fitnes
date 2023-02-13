<template>
  <div class="col-11 col-md-5 workout-card">
    <router-link :to="workoutItem.link" class="coolLink">
      <div class="card-body">
        <h5 class="card-title">{{ $t(workoutItem.title) }}</h5>
        <p class="card-text" v-t="workoutItem.description"></p>
      </div>
      <img class="workout-card-img" :src="require('../../public/img/' + workoutItem.image)" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "WorkoutCard",
  props: {
    workoutItem: Object
  }
};
</script>

<style scoped>
.workout-card {
  padding: 0;
  margin: 16px;
  border: solid gray 1px;
}

@media (min-width: 1904px) {
  .workout-card {
    height: 700px;
  }
}

@media (min-width: 1264px) and (max-width: 1903px) {
  .workout-card {
    height: 575px;
  }
}

@media (min-width: 960px) and (max-width: 1263px) {
  .workout-card {
    height: 545px;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .workout-card {
    height: 640px;
  }
}

@media (max-width: 767px) {
  .workout-card {
    height: 585px;
  }
}

.workout-card a {
  color: rgba(128, 128, 128, 1);
}

.workout-card:hover {
  box-shadow: 5px 10px 8px #888888;
}

.workout-card:hover a {
  text-decoration: none;
  color: black;
}

.workout-card:hover .card-img-bottom {
  opacity: 0.8;
}

.workout-card-img {
  width: 100%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>