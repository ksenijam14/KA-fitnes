<template>
  <div id="nav" class="container margin-auto-fixed">
    <nav class="navbar navbar-expand-xl navbar-light header">
      <!-- TOGGLER -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerTarget"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- LOGO -->
      <router-link class="navbar-brand" id="logo-wrapper" to="/">
        <img src="@/assets/GrubiLogo.png" id="logo" />
      </router-link>
      <!-- FIRST LEVEL OF NAVIGATION -->
      <div class="collapse navbar-collapse" id="navbarTogglerTarget">
        <ul class="navbar-nav navbar-nav-style">
          <li class="nav-item nav-entry-style" v-for="entry in navigation" :key="entry.path">
            <router-link
              :class="entry.hasChildren?'nav-link dropdown-toggle':'nav-link'"
              :data-toggle="entry.hasChildren?'dropdown':false"
              @click.native="updateChildren(entry.index)"
              :to="entry.link"
              v-t="'nav.'+entry.path"
            ></router-link>
            <!-- SECOND LEVEL OF NAVIGATION -->
            <transition name="slide-fade">
              <ul class="custom-drop-menu" v-if="entry.childrenOpen">
                <li
                  class="nav-nested-style"
                  v-for="subentry in entry.children"
                  :key="subentry.path"
                >
                  <router-link
                    :class="subentry.hasChildren?'dropdown-item dropdown-toggle':'dropdown-item'"
                    :data-toggle="subentry.hasChildren?'dropdown':false"
                    @click.native.prevent="updateChildren(subentry.index)"
                    :to="subentry.link"
                    v-t="'nav.'+subentry.path"
                  ></router-link>
                  <!-- THIRD LEVEL OF NAVIGATION -->
                  <transition name="slide-fade">
                    <ul class="custom-drop-menu" v-if="subentry.childrenOpen">
                      <li
                        class="nav-nested-style"
                        v-for="subsub in subentry.children"
                        :key="subsub.path"
                      >
                        <router-link
                          class="dropdown-item"
                          @click.native.prevent="updateChildren(subsub.index)"
                          :to="subsub.link"
                          v-t="'nav.'+subsub.path"
                        ></router-link>
                      </li>
                    </ul>
                  </transition>
                  <!-- END OF THIRD LEVEL -->
                </li>
              </ul>
            </transition>
            <!-- END OF SECOND LEVEL -->
          </li>
          <!-- LANGUAGE ICON -->
          <li class="nav-item nav-entry-style">
            <router-link class="nav-link" to="#" @click.native.prevent="changeLocale()">
              <img
                class="language-icon"
                :src="require(selectedLanguage==0?'../../public/img/uk_t.png':'../../public/img/srb_t.png')"
              />
              <div class="d-inline" id="language-text">{{ languages[(selectedLanguage+1)%2].title }}</div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- END OF FIRST LEVEL -->
    </nav>
  </div>
</template>

<script>
import i18n from "@/i18n";
import { setCookie } from "@/scripts/cookies";
import { getCookie } from "@/scripts/cookies";

export default {
  name: "Nav",
  data() {
    return {
      languages: [
        { language: "sr", title: "Srpski" },
        { language: "en", title: "English" }
      ],
      selectedLanguage: 0,
      navigation: [
        {
          index: [0],
          path: "home",
          link: "/"
        },
        {
          index: [1],
          path: "workouts",
          link: "#1",
          hasChildren: true,
          childrenOpen: true,
          children: [
            {
              index: [1, 0],
              path: "yoga",
              link: "#11",
              hasChildren: true,
              childrenOpen: true,
              children: [
                {
                  index: [-1],
                  path: "vinyasa",
                  link: "/workout_details/0/0"
                },
                {
                  index: [-1],
                  path: "bikram",
                  link: "/workout_details/0/1"
                },
                {
                  index: [-1],
                  path: "power",
                  link: "/workout_details/0/2"
                }
              ]
            },
            {
              index: [1, 1],
              path: "pilates",
              link: "#12",
              hasChildren: true,
              childrenOpen: true,
              children: [
                {
                  index: [-1],
                  path: "classic",
                  link: "/workout_details/1/0"
                },
                {
                  index: [-1],
                  path: "stott",
                  link: "/workout_details/1/1"
                },
                {
                  index: [-1],
                  path: "reformer",
                  link: "/workout_details/1/2"
                }
              ]
            },
            {
              index: [1, 2],
              path: "core",
              link: "#13",
              hasChildren: true,
              childrenOpen: true,
              children: [
                {
                  index: [-1],
                  path: "beginner",
                  link: "/workout_details/2/0"
                },
                {
                  index: [-1],
                  path: "intermediate",
                  link: "/workout_details/2/1"
                },
                {
                  index: [-1],
                  path: "advanced",
                  link: "/workout_details/2/2"
                }
              ]
            },
            {
              index: [1, 3],
              path: "cardio",
              link: "#14",
              hasChildren: true,
              childrenOpen: true,
              children: [
                {
                  index: [-1],
                  path: "4020Hiit",
                  link: "/workout_details/3/0"
                },
                {
                  index: [-1],
                  path: "tabata",
                  link: "/workout_details/3/1"
                },
                {
                  index: [-1],
                  path: "aerobic",
                  link: "/workout_details/3/2"
                }
              ]
            }
          ]
        },
        {
          index: [2],
          path: "nutritionist",
          link: "/nutritionist"
        },
        {
          index: [3],
          path: "massages",
          link: "/massage"
        },
        {
          index: [4],
          path: "scheduleWorkout",
          link: "/picker"
        },
        {
          index: [5],
          path: "myAccount",
          link: "/account"
        },
        {
          index: [6],
          path: "about",
          link: "/about"
        }
      ]
    };
  },
  methods: {
    openMyChildren(entry) {
      if (entry.hasChildren) {
        entry.childrenOpen = true;
      }
    },
    closeMyChildren(entry) {
      if (entry.hasChildren) {
        entry.childrenOpen = false;
        for (let i = 0; i < entry.children.length; i++) {
          this.closeMyChildren(entry.children[i]);
        }
      }
    },
    closeAllChildren() {
      for (let i = 0; i < this.navigation.length; i++) {
        this.closeMyChildren(this.navigation[i]);
      }
    },
    closeSomeChildren(entry, clickedInd) {
      if (entry.index[entry.index.length - 1] != clickedInd[0]) {
        this.closeMyChildren(entry);
      } else if (entry.hasChildren) {
        let newInd = clickedInd.slice(1, clickedInd.length);
        for (let i = 0; i < entry.children.length; i++) {
          this.closeSomeChildren(entry.children[i], newInd);
        }
      }
    },
    updateChildren(ind) {
      for (let i = 0; i < this.navigation.length; i++) {
        this.closeSomeChildren(this.navigation[i], ind);
      }
      if (ind[0] != -1) {
        let len = ind.length;
        let temp = this.navigation;
        for (let i = 0; i < len; i++) {
          if (len > i + 1) {
            this.openMyChildren(temp[ind[i]]);
            temp = temp[ind[i]].children;
          } else {
            if (temp[ind[i]].hasChildren) {
              temp[ind[i]].childrenOpen = !temp[ind[i]].childrenOpen;
            }
          }
        }
      }
      this.$forceUpdate();
    },
    changeLocale() {
      let lang = this.selectedLanguage;
      lang = (lang + 1) % 2;
      this.selectedLanguage = lang;
      let locale = this.languages[lang].language;
      i18n.locale = locale;
      // maybe change to cookies...
      //localStorage.setItem("language", JSON.stringify(locale));
      setCookie("language", locale);
      // change title
      // copied from titleMixin.js function updateTitle()
      let titleKey = getCookie("titleKey");
      let title = "KA fitnes";
      if (titleKey) {
        title += " | " + i18n.t(titleKey);
      }
      document.title = title;
    }
  },
  created() {
    // maybe change to cookies...
    //let locale = JSON.parse(localStorage.getItem("language"));
    let locale = getCookie("language");
    if (locale) {
      this.selectedLanguage = locale == this.languages[0].language ? 0 : 1;
      i18n.locale = locale;
    }
    this.closeAllChildren();
    this.$forceUpdate();
  }
};
</script>

<style>
#nav {
  padding: 30px;
  text-align: left;
  z-index: 10;
  position: relative;
}

@media (min-width: 1200px) {
  .navbar-nav-style {
    margin-left: 112px;
  }

  .margin-auto-fixed {
    /*width: 1285px !important;*/
    max-width: 1210px !important;
  }

  #navbarTogglerTarget {
    max-width: 1100px;
  }

  .header {
    max-width: 1150px;
  }
}

/*.header {
    background-color:  rgba(119, 136, 153, 0.2);
  }*/

.nav-entry-style {
  font-weight: 700;
}

.nav-nested-style a {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5) !important;
}

#nav a {
  background-color: rgb(255, 255, 255);
}

#nav a:hover {
  background-color: rgb(244, 244, 244);
}

#nav a.router-link-exact-active {
  color: rgb(123, 204, 231);
}

/* HORIZONTAL NAV-BAR FIXES */

@media (min-width: 1200px) {
  #logo-wrapper {
    position: absolute;
    top: 0;
  }

  .nav-entry-style {
    width: 120px;
    height: 64px;
  }

  .nav-nested-style {
    width: 150px;
    height: 32px;
  }
}

/* LANGUAGE AND LOGO */

#logo {
  height: 60px;
  width: auto;
}

.language-icon {
  height: 16px;
  width: 32px;
}

#language-text {
  padding-left: 4px;
}

/* DROPDOWN STYLINGS */

.custom-drop-menu {
  position: relative;
  top: 0;
  left: 0;
  margin-left: 40px;
  padding-left: 0 !important;
  list-style-type: none;
  background-color: white;
  border-color: black;
  border-width: 1px;
  border-radius: 4px;
}

@media (min-width: 1200px) {
  .custom-drop-menu {
    margin-left: 100px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>