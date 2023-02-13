<template>
  <div id="workoutDetails" class="container">
    <!-- BASIC INFO -->
    <div class="row justify-content-center m-3 component-background">
      <h2 class="col-12 mt-3 mb-5" v-t="title"></h2>
      <div class="col-10 col-sm-5">
        <p v-t="description"></p>
      </div>
      <div class="col-10 col-sm-5">
        <div class="mb-3">
          <h4>{{ $t("duration") }}:</h4>
          <span>{{ minutes }}</span>
          <span>&nbsp;{{ $t("minutes") }}</span>
        </div>
        <div>
          <h4>{{ $t("intensity") }}:</h4>
          <img
            class="d-inline star"
            v-for="index in 5"
            :key="index"
            :src="require(index<=level?'../../public/img/star_full.png':'../../public/img/star_empty.png')"
          />
        </div>
      </div>
      <div class="col-12 m-2">
        <router-link :to="'/appointments/' + idGroup + '/' + idSpec">
          <button class="btn btn-primary">{{ $t("checkoutAppointments") }}</button>
        </router-link>
      </div>
    </div>
    <!-- GALLERY -->
    <div class="row justify-content-center m-3 component-background">
      <h3 class="col-12 m-4">{{ $t("gallery") }}</h3>
      <div class="col-5 col-sm-4 col-md-3 col-lg-2 p-0" v-for="image in gallery" :key="image.index">
        <router-link to="#">
          <img
            class="one-image"
            :src="require('../../public/img/gallery/'+image.name)"
            @click="openModal(image.index)"
          />
        </router-link>
      </div>
    </div>
    <!-- VIDEOS -->
    <div class="row justify-content-center m-3 component-background">
      <h3 class="col-12 m-4">{{ $t("instructionalVideos") }}</h3>
      <div id="youtubeCarousel" class="col-12 carousel" data-interval="false">
        <div class="carousel-inner">
          <div
            v-for="video in videos"
            :key="video.index"
            :class="video.index==0?'carousel-item active':'carousel-item'"
          >
            <div class="embed-responsive embed-responsive-16by9 m-3">
              <iframe class="embed-responsive-item" :src="video.url" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev reduce-height"
          href="#youtubeCarousel"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a
          class="carousel-control-next reduce-height"
          href="#youtubeCarousel"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
    <!-- YOUR COMMENT -->
    <form class="needs-validation" v-if="allowedToPost" @submit="postComment()">
      <div class="row justify-content-center m-5 component-background">
        <h3 class="col-10 m-4">{{ $t("leaveComment") }}:</h3>
        <div class="col-10 col-md-3">
          <h5>{{ $t("rateWorkout") }}:</h5>
          <div id="ratingSelector">
            <input
              type="checkbox"
              class="form-control d-inline hidden-input"
              v-model="ratingSelected"
              required
              @click.prevent
              :oninvalid="mySelectedRating==0?'this.setCustomValidity(\'Please select a rating\')':'this.setCustomValidity(\'\')'"
            />
            <img
              v-for="index in 5"
              :key="index"
              :class="getRatingStarClass(index)"
              src="../../public/img/star_red.png"
              @click="selectRating(index)"
              @mouseenter="hoverRating(index)"
              @mouseleave="clearHoverRating()"
            />
          </div>
        </div>
        <div class="col-10 col-md-7">
          <textarea
            class="form-control"
            v-model="commentText"
            rows="6"
            cols="60"
            required
            minlength="30"
          />
        </div>
        <div class="col-10 mt-5 m-4">
          <button type="submit" class="btn btn-primary">{{ $t("postComment") }}</button>
        </div>
      </div>
    </form>
    <!-- COMMENTS -->
    <div class="row justify-content-center m-5">
      <h3 class="col-5 m-4">{{ $t("comments") }}</h3>
      <div v-if="comments.length>0" class="col-5 avg-rating">
        <h4>{{ $t("averageRating") }}:</h4>
        <span class="mr-2">
          <img
            class="d-inline star"
            v-for="index in 5"
            :key="index"
            :src="require(index<=averageRating?'../../public/img/star_red.png':'../../public/img/star_empty.png')"
          />
        </span>
        <span>{{ averageRating }}</span>
      </div>

      <div class="col-12 col-lg-10 comment" v-for="comment in comments" :key="comment.id">
        <hr v-if="comment.id==0" />
        <div class="row justify-content-center m-1">
          <div class="col-3 col-md-2">
            <h5>{{ comment.user }}</h5>
          </div>
          <div class="col-9 col-md-8">
            <span class="mr-2">
              <img
                class="d-inline star"
                v-for="index in 5"
                :key="index"
                :src="require(index<=comment.rating?'../../public/img/star_red.png':'../../public/img/star_empty.png')"
              />
            </span>
            <span>{{ comment.date }}</span>
            <p class="comment-text">{{ comment.text }}</p>
          </div>
        </div>
        <hr />
      </div>
      <div v-if="comments.length==0" class="col-12 col-lg-10 no-comments">{{ $t("noComments") }}</div>
    </div>
  </div>
</template>

<script>
import allWorkouts from "@/data/workouts";
import { getCookie } from "@/scripts/cookies";
import { setCookie } from "@/scripts/cookies";

export default {
  name: "WorkoutDetails",
  title() {
    let idGroup = Number(this.$route.params.idGroup);
    let idSpec = Number(this.$route.params.idSpec);

    let workout = allWorkouts.options[idGroup].options[idSpec];
    let titleKey = workout.title;

    return titleKey;
  },
  data() {
    return {
      idGroup: -1,
      idSpec: -1,
      title: "",
      description: "",
      minutes: 30,
      level: 2,
      gallery: [],
      videos: [],
      comments: [],
      averageRating: 0,
      allowedToPost: true,
      mySelectedRating: 0,
      myHoveredRating: 0,
      commentText: "",
      ratingSelected: false
    };
  },
  methods: {
    selectRating(rating) {
      this.mySelectedRating = rating;
      this.ratingSelected = true;
    },
    hoverRating(rating) {
      this.myHoveredRating = rating;
    },
    clearHoverRating() {
      this.myHoveredRating = 0;
    },
    getRatingStarClass(index) {
      let relevantNumber = this.myHoveredRating;
      if (relevantNumber == 0) {
        relevantNumber = this.mySelectedRating;
      }
      let selectedClass = "d-inline star";
      let unselectedClass = "d-inline star unselected-star";
      let retClass = relevantNumber >= index ? selectedClass : unselectedClass;
      return retClass;
    },
    postComment() {
      //form new comment
      let allComments = getCookie("comments");
      let comments = allComments[this.idGroup][this.idSpec];
      let username = getCookie("username");
      let today = new Date();
      let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
      let month =
        today.getMonth() < 9
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1;
      let year = today.getFullYear();
      let todayReadable = day + "/" + month + "/" + year;
      let nextId = comments.length;
      let newComment = {
        id: nextId,
        user: username,
        rating: this.mySelectedRating,
        date: todayReadable,
        text: this.commentText
      };
      //update comments
      comments.push(newComment);
      allComments[this.idGroup][this.idSpec] = comments;
      setCookie("comments", allComments);
      this.comments = comments;
      //update comment permissions
      this.allowedToPost = false;
      let permissions = getCookie("commentPermissions");
      permissions[this.idGroup][this.idSpec] = false;
      setCookie("commentPermissions", permissions);
      //update average rating
      let sum = 0;
      let num = 0;
      comments.forEach(comment => {
        sum += comment.rating;
        num++;
      });
      let avgRating = sum / num;
      this.averageRating = avgRating.toFixed(2);
      //reset local form variables
      this.mySelectedRating = 0;
      this.myHoveredRating = 0;
      this.commentText = "";
      this.ratingSelected = false;
    },
    openModal(imageIndex) {
      let indexes = [this.idGroup, this.idSpec, imageIndex];
      this.$root.$emit("openCarouselModal", indexes);
    },
    refreshComponent(idGroup, idSpec) {
      this.idGroup = idGroup;
      this.idSpec = idSpec;
      let workoutGroup = allWorkouts.options.find(group => group.id == idGroup);
      let selectedWorkout = workoutGroup.options.find(e => e.id == idSpec);
      this.title = selectedWorkout.title;
      this.description = selectedWorkout.description;
      this.minutes = Number(selectedWorkout.minutes);
      this.level = Number(selectedWorkout.intensity);
      this.gallery = selectedWorkout.gallery;
      this.videos = selectedWorkout.videos;
      let allComments = getCookie("comments");
      this.comments = allComments[idGroup][idSpec];
      let sum = 0;
      let num = 0;
      this.comments.forEach(comment => {
        sum += comment.rating;
        num++;
      });
      let avgRating = sum / num;
      this.averageRating = avgRating.toFixed(2);
      let allPermissions = getCookie("commentPermissions");
      this.allowedToPost = allPermissions[idGroup][idSpec];
    }
  },
  created() {
    let idGroup = Number(this.$route.params.idGroup);
    let idSpec = Number(this.$route.params.idSpec);
    this.refreshComponent(idGroup, idSpec);
  },
  beforeRouteUpdate(to, from, next) {
    let idGroup = Number(to.params.idGroup);
    let idSpec = Number(to.params.idSpec);
    if (idGroup != this.idGroup || idSpec != this.idSpec) {
      this.refreshComponent(idGroup, idSpec);
    }
    next();
  }
};
</script>

<style scoped>
.star {
  width: 20px;
  height: auto;
}

.component-background {
  background-color: rgba(119, 136, 153, 0.2);
  border-radius: 16px;
}

/* GALLERY */

.one-image {
  object-fit: cover;
  border-radius: 4px;
}

@media (min-width: 1200px) {
  .one-image {
    margin: 8px;
    width: 160px;
    height: 90px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .one-image {
    margin: 8px;
    width: 128px;
    height: 72px;
  }
}

@media (max-width: 991px) {
  .one-image {
    margin: 4px;
    width: 144px;
    height: 81px;
  }
}

.one-image:hover {
  opacity: 0.5;
  border-radius: 4px;
}

/* VIDEOS */

.reduce-height {
  height: 25%;
  margin: auto 0;
}

/* LEAVE A COMMENT */

.unselected-star {
  opacity: 0.5;
}

.hidden-input {
  opacity: 0;
  width: 1px;
}

#ratingSelector {
  margin-bottom: 20px;
}

/* COMMENTS */

.comment-text {
  text-align: left;
  margin-top: 16px;
}

.no-comments {
  font-style: italic;
}
</style>