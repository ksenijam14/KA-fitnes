<template>
  <v-footer color="rgba(119, 136, 153, 0.2)" class="font-weight-medium myFooter" paddless>
    <div class="col-sm-4 social">
      <v-row>
        <div>
          <h3 id="socialHeading">{{ $t("Social") }}</h3>
        </div>
      </v-row>
      <v-row>
        <div>
          <a class="link" href="https://www.instagram.com/?hl=sr">
            <v-btn class="btn" icon color="pink" x-large>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </a>
        </div>
        <div>
          <a class="link" href="https://twitter.com/explore">
            <v-btn class="btn" icon color="blue lighten-2" x-large>
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
          </a>
        </div>
        <div>
          <a class="link" href="https://www.facebook.com/">
            <v-btn class="btn" icon color="blue darken-3" x-large>
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </a>
        </div>
        <div>
          <a class="link" href="https://www.youtube.com/?gl=RS&hl=sr">
            <v-btn class="btn" icon color="red" x-large>
              <v-icon>mdi-youtube</v-icon>
            </v-btn>
          </a>
        </div>
      </v-row>
    </div>
    <div class="offset-sm-2 col-sm-6 friends-club">
      <v-row>
        <div>
          <h3 id="friendsHeading">{{ $t("Club friends") }}</h3>
        </div>
      </v-row>
      <v-row>
        <div>
          <!--<b-link href="https://www.nivea.rs/" target="_blank">
                <v-img src="../assets/nivea-logo.png"></v-img>
          </b-link>-->
          <a href="https://www.nivea.rs/">
            <img src="../assets/nivea-logo.png" alt="nivea" height="100px" width="100px" />
          </a>
        </div>
        <div>
          <a href="https://fitpass.rs/">
            <img src="../assets/fitpass-logo.jpg" alt="fitpass" height="100px" width="100px" />
          </a>
        </div>
        <div>
          <a href="https://www.nike.com/">
            <img src="../assets/nike-logo.png" alt="nike" height="100px" width="100px" />
          </a>
        </div>
        <div>
          <a href="https://www.rosa.co.rs/">
            <img src="../assets/rosa-logo.jpg" alt="rosa" height="100px" width="100px" />
          </a>
        </div>
        <div>
          <a href="http://www.beograd.rs/">
            <img src="../assets/bg_grb.gif" alt="bg-grb" height="100px" width="100px" />
          </a>
        </div>
        <!--<div class="offset-sm-7 col-sm-4">
            <router-link to="/">
              <img
                src="@/assets/GrubiLogo.png"
                id="logo"
                alt="logo-ka-fitnes"
                height="300px"
                width="300px"
              />
            </router-link>
        </div>-->
      </v-row>
    </div>
    <v-col class="blue-grey lighten-3 text-center white--text copyright" cols="12">
      <p>
        {{ $t("Copyright1") }}
        <v-icon>mdi-copyright</v-icon>
        {{ $t("Copyright2") }}
      </p>
    </v-col>
    <!-- <div class="col-12 col-sm-12 copyright" icon="mdi-copyright">
      <p>
        {{ $t("Copyright1") }}
        <v-icon>mdi-copyright</v-icon>
        {{ $t("Copyright2") }}
      </p>
    </div>-->
  </v-footer>
  <!--<div id="nmForm" class="container">
      <div class="row m-3 component-background">Footer</div>
  </div>-->
</template>

<script>
export default {
  name: "Footer"
};
</script>
<style scoped>
.myFooter {
  min-height: 0 !important;
}

.component-background {
  background-color: rgba(119, 136, 153, 0.2);
  border-radius: 16px;
}
.social {
  text-align: center;
  float: center;
}
#socialHeading {
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
  padding-right: 20px;
  color: rgb(34, 164, 224);
  font-weight: bolder;
}
#friendsHeading {
  text-align: center;
  padding-left: 20px;
  text-transform: uppercase;
  font-size: 25px;
  color: rgb(34, 164, 224);
  font-weight: bolder;
}
img {
  margin-right: 10px;
  margin-left: 20px;
  margin-top: 20px;
}
#logo {
  margin-bottom: 100px;
}
.link {
  text-decoration: none;
}
.btn {
  text-decoration: none;
}
.copyright {
  text-align: center;
  /* background-color: blue; */
  /* color: rgb(34, 164, 224); */
}
</style>
