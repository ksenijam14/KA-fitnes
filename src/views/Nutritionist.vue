<template>
  <v-app>
    <div id="nutritionist">
      <h2>{{ $t("nutritionHeading") }}</h2>
      <div>
        <v-img src="../assets/healthy-food.jpeg" max-height="500px"></v-img>
      </div>
    </div>
    <div id="nmForm" class="container">
      <div class="row m-3 component-background">
        <h2 class="col-12 mt-3 mb-5" id="heading">{{ $t("nutritionHeading2") }}</h2>
        <div class="col-12 paraf1">
          <p>{{$t("nutritionAboutp1")}}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{$t("nutritionAboutp2")}}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{$t("nutritionAboutp3")}}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{$t("nutritionAboutp4")}}</p>
        </div>
        <div class="col-12 col-sm-11 paraf1">
          <p>{{$t("nutritionAboutp5")}}</p>
        </div>
      </div>
      <NMForm></NMForm>
    </div>
  </v-app>
</template>

/*<script>
import NMForm from "@/components/NMForm";
export default {
  name: "Nutritionist",
  title: "nav.nutritionist",
  components: { NMForm }
};
</script>

<style>
.component-background {
  background-color: rgba(119, 136, 153, 0.2);
  border-radius: 16px;
  height: 500;
  widows: 700;
}
#nutritionist {
  color: rgb(123, 204, 231);
  font-family: "Bevan", cursive;
}
#heading {
  text-align: center;
  text-decoration-line: underline;
  text-decoration-color: rgb(123, 204, 231);
  /*text-decoration-color:rgb(40, 122, 170);
  /*color:rgb(70, 167, 70);*/
}
</style>
 