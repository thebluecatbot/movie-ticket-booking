<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <NavBar></NavBar>
    <section class="home-section">
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div
            class="flex flex-wrap w-full mb-20 flex-col items-center text-center"
          >
            <h1
              class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            >
              Search shows by tag
            </h1>
            <div class="lg:w-1/2 w-full leading-relaxed text-gray-500">
              <div class="relative flex w-full flex-wrap items-stretch mb-3">
                <span
                  class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
                >
                  <i class="fas fa-search"></i>
                </span>
                <input
                  v-model="tag"
                  type="text"
                  placeholder="Search by tag"
                  v-on:keyup="update_username($event)"
                  class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                />
              </div>
            </div>
          </div>
          <div v-if="shows.length > 0">
            <div
              v-for="show in shows"
              :key="show.id"
              class="py-8 flex flex-wrap md:flex-nowrap bg-gray-100 rounded-lg px-8"
            >
            <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                {{ show.showname }} 
              </h2>
              <!-- Display show details here -->
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center">
            <h1 class="text-2xl font-medium text-gray-900 title-font mb-2">
              No shows found
            </h1>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "SearchshowsBytag",
  beforeCreate: function () {
    const token = localStorage.getItem("ticket_show_token");
    // make an api call to check if the token is valid
    fetch("http://127.0.0.1:5000/api/verify_token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "success") {
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  components: {
    NavBar,
  },
  data() {
    return {
      tag: "",
      shows: [],
    };
  },
  methods: {
    update_username(event) {
      this.tag = event.target.value;
      this.search();
    },
    search() {
      if (this.tag.trim() !== "") {
        fetch("http://127.0.0.1:5000/api/search_shows_by_tag", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("ticket_show_token"),
          },
          body: JSON.stringify({
            tag: event.target.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.shows = data.shows;
          });
      } else {
        this.shows = [];
      }
    },
  },
};
</script>

<style>
.home-section {
  position: relative;
  background: #e4e9f7;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
  transition: all 0.5s ease;
  z-index: 2;
}
.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}
.home-section .text {
  display: inline-block;
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}
.button-33 {
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
    rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
    rgba(44, 187, 99, 0.15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-33:hover {
  box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
    rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
    rgba(44, 187, 99, 0.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}
.button-77 {
  background-color: #fbc2c2;
  border-radius: 100px;
  box-shadow: rgba(187, 44, 44, 0.2) 0 -25px 18px -14px inset,
    rgba(187, 44, 44, 0.15) 0 1px 2px, rgba(187, 44, 44, 0.15) 0 2px 4px,
    rgba(187, 44, 44, 0.15) 0 4px 8px, rgba(187, 44, 44, 0.15) 0 8px 16px,
    rgba(187, 44, 44, 0.15) 0 16px 32px;
  color: rgb(128, 0, 0);
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-77:hover {
  box-shadow: rgba(187, 44, 44, 0.35) 0 -25px 18px -14px inset,
    rgba(187, 44, 44, 0.25) 0 1px 2px, rgba(187, 44, 44, 0.25) 0 2px 4px,
    rgba(187, 44, 44, 0.25) 0 4px 8px, rgba(187, 44, 44, 0.25) 0 8px 16px,
    rgba(187, 44, 44, 0.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}
</style>
