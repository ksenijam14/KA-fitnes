<template>
  <v-app>
    <div id="imgHead">
      <v-img
        class="col-sm-12"
        src="../assets/girl-workout2.jpeg"
        max-height="750px"
        min-width="360px"
      >
        <div class="col-sm-6">
          <h2 class="col-lg-11 col-sm-8" id="heading">{{ $t("messageHello") }}</h2>
          <p class="col-lg-11 col-sm-9" id="paraf1">{{ $t("textHello") }}</p>
          <router-link to="/workouts" class="link">
            <v-btn class="btnFindMore" color="blue lighten-1">
              {{
              $t("FindMore")
              }}
            </v-btn>
          </router-link>
        </div>
      </v-img>
    </div>
    <div id="home">
      <div class="col-sm-12">
        <h2 id="topWorkout">{{ $t("top workout") }}</h2>
      </div>
      <v-row>
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="370">
              <v-img height="200" src="../assets/reformerPilates.jpg"></v-img>

              <v-card-title>{{ $t("topTitle1") }}</v-card-title>
              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating :value="4" color="amber" dense half-increments readonly size="14"></v-rating>

                  <div class="grey--text ml-4">4 (389)</div>
                </v-row>
              </v-card-text>
              <v-card-text>
                <div>{{ $t("topText1") }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-text>
                <div>{{ $t("topText12") }}</div>
              </v-card-text>
              <v-card-actions>
                <v-col cols="12">
                  <router-link to="/workout_details/1/2#" class="link">
                    <v-btn
                      align="center"
                      color="blue lighten-1"
                      class="btnFindMore"
                    >{{ $t("takeALook") }}</v-btn>
                  </router-link>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>

        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="370">
              <v-img height="200" src="../assets/cardioTabata03.jpg"></v-img>

              <v-card-title>{{ $t("topTitle2") }}</v-card-title>
              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating :value="5" color="amber" dense half-increments readonly size="14"></v-rating>

                  <div class="grey--text ml-4">5 (454)</div>
                </v-row>
              </v-card-text>
              <v-card-text>
                <div>{{ $t("topText2") }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-text>
                <div>{{ $t("topText12") }}</div>
              </v-card-text>
              <v-card-actions>
                <v-col cols="12">
                  <router-link to="/workout_details/3/1" class="link">
                    <v-btn
                      align="center"
                      color="blue lighten-1"
                      class="btnFindMore"
                    >{{ $t("takeALook") }}</v-btn>
                  </router-link>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>

        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="370">
              <v-img height="200" src="../assets/coreIntermediate02.jpg"></v-img>

              <v-card-title>{{ $t("topTitle3") }}</v-card-title>
              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating :value="4" color="amber" dense half-increments readonly size="14"></v-rating>

                  <div class="grey--text ml-4">4 (481)</div>
                </v-row>
              </v-card-text>
              <v-card-text>
                <div>{{ $t("topText3") }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-text>
                <div>{{ $t("topText12") }}</div>
              </v-card-text>
              <v-card-actions>
                <v-col cols="12">
                  <router-link to="/workout_details/2/1" class="link">
                    <v-btn
                      align="center"
                      color="blue lighten-1"
                      class="btnFindMore"
                    >{{ $t("takeALook") }}</v-btn>
                  </router-link>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-row>
      <!--<div>
        <transition-group name="fade" tag="div">
          <div v-for="i in [currentIndex]" :key="i">
            <img :src="currentImg" />
          </div>
        </transition-group>
        <a class="prev" @click="prev" href="#">&#10094; Previous</a>
        <a class="next" @click="next" href="#">&#10095; Next</a>
      </div>-->
      <v-row>
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="370">
              <v-img height="200" src="../assets/cardHome.jpg"></v-img>

              <v-card-title>
                <v-col cols="12">{{ $t("reserveTitle") }}</v-col>
              </v-card-title>

              <v-card-text>
                <div>{{ $t("reserveText") }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-col cols="12">
                  <router-link to="/picker" class="link">
                    <v-btn
                      align="center"
                      color="blue lighten-1"
                      class="btnFindMore"
                    >{{ $t("reserve") }}</v-btn>
                  </router-link>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="370">
              <v-img height="200" src="../assets/nutritionist.png"></v-img>

              <v-card-title>
                <v-col cols="12">{{ $t("reserveTitleNutri") }}</v-col>
              </v-card-title>

              <v-card-text>
                <div>{{ $t("reserveTextNutri") }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-col cols="12">
                  <router-link to="/nutritionist" class="link">
                    <v-btn
                      align="center"
                      color="blue lighten-1"
                      class="btnFindMore"
                    >{{ $t("reserve") }}</v-btn>
                  </router-link>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>

        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="370">
              <v-img height="200" src="../assets/massage12.jpg"></v-img>

              <v-card-title>
                <v-col cols="12">{{ $t("reserveTitleMas") }}</v-col>
              </v-card-title>

              <v-card-text>
                <div>{{ $t("reserveTextMas") }}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-col cols="12">
                  <router-link to="/massage" class="link">
                    <v-btn
                      align="center"
                      color="blue lighten-1"
                      class="btnFindMore"
                    >{{ $t("reserve") }}</v-btn>
                  </router-link>
                </v-col>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  title: "nav.home",
  data() {
    return {
      images: [
        "https://cdn.pixabay.com/photo/2015/12/12/15/24/amsterdam-1089646_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/02/17/23/03/usa-1206240_1280.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/27/eiffel-tower-768501_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/12/04/19/30/berlin-cathedral-1882397_1280.jpg"
      ],
      timer: null,
      currentIndex: 0
    };
  },
  mounted: function() {
    this.startSlide();
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 4000);
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    }
  },

  computed: {
    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    }
  }
};
</script>

<style scoped>
#heading {
  color: rgb(34, 164, 224);
  font-size: 50px;
  font-weight: 700;
  /*line-height: 19px;*/
  text-decoration: none;
  text-transform: uppercase;
  padding-top: 180px;
  padding-left: 70px;
}

#topWorkout {
  text-align: center;
  color: rgb(34, 164, 224);
  font-size: 35px;
  text-transform: uppercase;
  padding-top: 40px;
}
#paraf1 {
  color: rgb(5, 72, 104);
  font-size: 20px;
  font-weight: 400;
  padding-left: 70px;
}
@media (max-width: 1050px) {
  #heading {
    font-size: 39px;
    font-weight: 700;
    text-decoration: none;
    padding-top: 70px;
    padding-left: 80px;
  }
  .btnFindMore {
    color: white;
    padding-right: 45px;
  }
  .link {
    color: white;
    text-decoration: none;
    padding-right: 45px;
  }
}
@media (max-width: 400px) {
  #heading {
    font-size: 30px;
    font-weight: 700;
    text-decoration: none;
    padding-top: 10px;
    padding-right: 80px;
  }
  #paraf1 {
    color: white;
    font-size: 15px;
    font-weight: 700;
    padding-right: 80px;
    content: "nesto";
  }
}
.btnFindMore {
  color: white;
}
.link {
  color: white;
  text-decoration: none;
}
#btnReserve {
  color: white;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

img {
  height: 600px;
  width: 100%;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
