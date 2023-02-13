<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :elevation="hover ? 24 : 6" class="mx-auto my-12" max-width="380">
        <v-img height="200" :src="require('../../public/img/gallery/'+image.name)"></v-img>

        <!-- <div class="col-md-8 col-sm-8 col-xs-4"> -->
        <v-card-title v-t="title"></v-card-title>
        <!-- </div> -->
        <v-card-text>
          <span class="mr-2">
            <img
              class="d-inline star"
              v-for="index in 5"
              :key="index"
              :src="require(index<=averageRating?'../../public/img/star_red.png':'../../public/img/star_empty.png')"
            />
          </span>
          <span>{{ averageRating }}</span>
        </v-card-text>
        <v-card-text>
          <!-- <v-row align="center"> -->
          <div>
            <p v-t="description"></p>
          </div>
          <!-- </v-row> -->
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <div>{{ $t("topText12") }}</div>
        </v-card-text>
        <v-card-actions>
          <v-col cols="12">
            <router-link to="/workout_details/1/2#" class="link">
              <v-btn align="center" color="blue lighten-1" class="btnFindMore">{{ $t("reserve") }}</v-btn>
            </router-link>
          </v-col>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "HomeCard",
  data: function() {
    return {
      idGroup: -1,
      idSpec: -1,
      timeout: 2000,
      title: "",
      description: "",
      averageRating: 0
    };
  },
  methods: {}
};
</script>

<style scoped></style>
