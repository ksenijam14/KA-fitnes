<template>
<v-app>
  <div  id="massage">
    <h2>{{ $t("massageHeading") }}</h2>
    <div>
      <v-img src="../assets/massage4.jpg" 
      max-height="700px"
      >
      </v-img>
    </div>
  </div>
  <div id="nmForm" class="container">
  <div class="row m-3 component-background">
  <h2 class="col-12 mt-3 mb-5" id="heading" >{{ $t("massageHeading2") }}</h2>
    <div class="col-12  paraf1">
        <p>{{$t("massageAboutp1")}}</p>
      </div>
      <div class="col-12 col-sm-11 paraf1">
        <p>{{$t("massageAboutp2")}}</p>
      </div>
      <div class="col-12 col-sm-11 paraf1">
        <p>{{$t("massageAboutp3")}}</p>
      </div>
      <div class="col-12 col-sm-11 paraf1">
        <p>{{$t("massageAboutp4")}}</p>
      </div>
      <div class="col-12 col-sm-11 paraf1">
        <p>{{$t("massageAboutp5")}}</p>
      </div>
  </div>
    <NMForm></NMForm>
  </div>
</v-app>
</template>

<script>
import NMForm from "@/components/NMForm";
export default {
  name: 'Massage',
  title: "nav.massages",
  components: {NMForm},
}
</script>

<style scoped>
.component-background {
  background-color: rgba(119, 136, 153, 0.2);
  border-radius: 16px;
  height: 500;
  widows: 700;
}
#massage{
  color:rgb(123, 204, 231);
  font-family: 'Bevan', cursive;
}
#heading{
  text-align:center;
  text-decoration-line: underline;
  text-decoration-color:rgb(123, 204, 231);
  /*text-decoration-color:rgb(40, 122, 170);
  /*color:rgb(70, 167, 70);*/
}
</style>