<template>
  <div class="workout-list-item">
    <router-link :to="workoutItem.link">
      <div class="card">
        <div class="card-body row">
          <div class="col-12 col-md-4 col-lg-7">
            <div class="row">
              <div class="col-12 col-lg-8">
                <h4 class="card-title">{{ justTranslate(workoutItem.title) }}</h4>
                <p class="card-text">{{ shortDescription(workoutItem.description) }}</p>
              </div>
              <div class="col-12 col-lg-4 mt-4">
                <div class="mb-3">
                  <h5>{{ $t("duration") }}:</h5>
                  <span>{{ workoutItem.minutes }}</span>
                  <span>&nbsp;{{ $t("minutes") }}</span>
                </div>
                <div>
                  <h5>{{ $t("intensity") }}:</h5>
                  <img
                    class="d-inline star"
                    v-for="index in 5"
                    :key="index"
                    :src="require(index<=workoutItem.intensity?'../../public/img/star_full.png':'../../public/img/star_empty.png')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-5 image-wrapper">
            <img class="workout-image" :src="require('../../public/img/' + workoutItem.image)" />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "WorkoutListItem",
  props: {
    workoutItem: Object
  },
  methods: {
    shortDescription(descriptionKey) {
      let short = "";
      let desc = this.$i18n.t(descriptionKey);
      if (desc.length > 120) {
        short = desc.substring(0, 117) + "...";
      } else {
        short = desc;
      }
      return short;
    },
    justTranslate(key) {
      return this.$i18n.t(key);
    }
  }
};
</script>

<style scoped>
.workout-list-item {
  margin: 16px;
}

.card {
  background-color: rgba(128, 32, 32, 0.2);
  text-decoration: none;
  color: #2c3e50;
}

.card:hover {
  box-shadow: 5px 10px 8px #888888;
  opacity: 0.8;
  color: #102030;
}

a:hover {
  text-decoration: none;
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