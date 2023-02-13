<template>
  <div id="carouselModal">
    <transition name="modal">
      <div class="modal-mask" v-if="showModal" @close="closeModal()">
        <div class="modal-wrapper" @click.self="closeModal()">
          <div class="modal-container">
            <div class="modal-body">
              <!-- CAROUSEL START -->
              <div id="imageCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li
                    v-for="image in images"
                    :key="image.index"
                    :class="image.index==startWith?'active':false"
                    data-target="#imageCarousel"
                    :data-slide-to="image.index"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div
                    v-for="image in images"
                    :key="image.index"
                    :class="image.index==startWith?'carousel-item active':'carousel-item'"
                  >
                    <img
                      class="d-block my-carousel-item"
                      :src="require('../../public/img/gallery/'+image.name)"
                    />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#imageCarousel"
                  role="button"
                  data-slide="prev"
                >
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#imageCarousel"
                  role="button"
                  data-slide="next"
                >
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>
              <!-- CAROUSEL END -->
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import allWorkouts from "@/data/workouts";

export default {
  name: "CarouselModal",
  data() {
    return {
      showModal: false,
      images: [],
      startWith: 0
    };
  },
  methods: {
    openModal(indexes) {
      let idGroup = indexes[0];
      let idSpec = indexes[1];
      let idImage = indexes[2];
      let workoutGroup = allWorkouts.options.find(e => e.id == idGroup);
      let specWorkout = workoutGroup.options.find(e => e.id == idSpec);
      let imgs = specWorkout.gallery;

      this.images = imgs;
      this.startWith = idImage;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
  mounted() {
    this.$root.$on("openCarouselModal", value => this.openModal(value));
  }
};
</script>

<style scoped>
.my-carousel-item {
  width: 80vw;
  height: 65vh;
  object-fit: contain;
  margin: 4px auto;
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
  margin: 0px auto;
  padding: 0px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 0;
  padding: 0;
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