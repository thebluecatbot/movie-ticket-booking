<template>
  <NavBar></NavBar>
  <section class="home-section">
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
          >
            Book Tickets
          </h1>
          <h2 class="text-red-500 text-xl font-bold">{{ theatreName }}</h2>
          <h2 class="text-red-500 text-xl font-bold">{{ showName }}</h2>
          <h2 class="text-red-500 text-xl font-bold">{{ message }}</h2>
        </div>
        <div class="lg:w-2/3 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-full">
              <div class="relative">
                <label for="num_seats" class="leading-7 text-sm text-gray-600">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  id="num_seats"
                  name="num_seats"
                  v-model="showing.num_seats"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button
                @click="book_show()"
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                BOOK
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "BookView",
  beforeCreate: function () {
    const token = localStorage.getItem("ticket_show_token");
    fetch("http://127.0.0.1:5000/api/verify_token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "success") {
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  data() {
    return {
      showing: {
        num_seats: 0,
      },
      message: "",
      theatreName: "",
      showName: "",
    };
  },
  components: {
    NavBar,
  },
  methods: {
    book_show() {
      const token = localStorage.getItem("ticket_show_token");
      const editedTheatre = {
        showing_id: this.$route.params.showing_id,
        num_seats: this.showing.num_seats,
      };
      fetch("http://127.0.0.1:5000/api/book_show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(editedTheatre),
      })
        .then((response) => response.json())
        .then((data) => {
          this.message = data.message;
          if (data.theater_name && data.show_name) {
            this.message += `\nTheater: ${data.theater_name}, Show: ${data.show_name}`;
          }
          if (data.message === "Not enough seats available for this show.") {
            this.message = "Not enough seats available for this show.";
          }
          if (data.message === "House Full!") {
            this.message = "House Full!";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
</style>
