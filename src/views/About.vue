<template>
  <v-app>
    <div>
      <v-img src="../assets/women-workout.jpeg" max-height="650px"></v-img>
    </div>
    <div id="about" class="container">
      <div class="row m-3 component-background">
        <h2 class="col-12 mt-3 mb-5" id="heading">{{ $t("about") }}</h2>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{ $t("beginings") }}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{ $t("storyParaf1") }}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{ $t("storyParaf2") }}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{ $t("storyParaf3") }}</p>
        </div>
      </div>
      <iframe
        :src="getMapUrl()"
        class="col-12 col-sm-11"
        width="1140"
        height="500"
        frameborder="0"
        style="border:0;"
        allowfullscreen
        aria-hidden="false"
        tabindex="0"
      ></iframe>
      <br />
      <div>
        <h4 id="parafLok">{{ $t("lokacije") }}</h4>
        <div class="table-responsive">
          <table id="tabela" class="col-12 col-lg-12 col-sm-12">
            <tbody>
              <tr>
                <td>
                  <v-icon color="red">mdi-map-marker</v-icon>
                  {{ $t("lokacija1") }}
                </td>
                <td>
                  <v-icon color="red">mdi-map-marker</v-icon>
                  {{ $t("lokacija2") }}
                </td>
                <td>
                  <v-icon color="red">mdi-map-marker</v-icon>
                  {{ $t("lokacija3") }}
                </td>
              </tr>
              <tr>
                <td>
                  <v-icon color="deep-orange lighten-1">mdi-phone-classic</v-icon>
                  {{ $t("lok1 tel") }}
                </td>
                <td>
                  <v-icon color="deep-orange lighten-1">mdi-phone-classic</v-icon>
                  {{ $t("lok2 tel") }}
                </td>
                <td>
                  <v-icon color="deep-orange lighten-1">mdi-phone-classic</v-icon>
                  {{ $t("lok3 tel") }}
                </td>
              </tr>
              <tr>
                <td>
                  <v-icon color="blue">mdi-email</v-icon>
                  {{ $t("lok1 email") }}
                </td>
                <td>
                  <v-icon color="blue">mdi-email</v-icon>
                  {{ $t("lok2 email") }}
                </td>
                <td>
                  <v-icon color="blue">mdi-email</v-icon>
                  {{ $t("lok3 email") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "About",
  title: "nav.about",
  data() {
    return {};
  },
  components: {},
  methods: {
    getMapUrl() {
      return this.$i18n.t("gmap");
    }
  }
};
</script>

<style scoped>
/*.about{
  text-align: left;
}*/
#heading {
  text-align: center;
  text-decoration-line: underline;
  text-decoration-color: rgb(123, 204, 231);
  /*text-decoration-color:rgb(40, 122, 170);
  /*color:rgb(70, 167, 70);*/
}
.paraf1 {
  text-align: left;
  padding-left: 10px;
  margin-left: 40px;
}
@media (max-width: 400px) {
  .paraf1 {
    text-align: center;
    margin-left: 0px;
  }
}
#parafLok {
  text-align: center;
}
.component-background {
  background-color: rgba(119, 136, 153, 0.2);
  border-radius: 16px;
}
.star {
  width: 20px;
  height: auto;
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
#tabela {
  text-align: center;
}
tr,
td {
  width: 400px;
  text-align: center;
  padding: 5px;
}
</style>
