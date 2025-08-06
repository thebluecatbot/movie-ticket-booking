<template>
  <NavBar></NavBar>
  <section class="home-section">
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
          >
            Edit Theatre: {{ theatre.theatrename }}
          </h1>
        </div>
        <div class="lg:w-2/3 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-full">
              <div class="relative">
                <label for="theatrename" class="leading-7 text-sm text-gray-600"
                  >Theatre Name</label
                >
                <input
                  type="text"
                  id="theatrename"
                  name="theatrename"
                  v-model="theatre.theatrename"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="location" class="leading-7 text-sm text-gray-600"
                  >Location</label
                >
                <input
                  type="text"
                  id="location"
                  name="location"
                  v-model="theatre.location"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <div class="relative">
                <label for="capacity" class="leading-7 text-sm text-gray-600"
                  >Capacity</label
                >
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  v-model="theatre.capacity"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button
                @click="edit_theatre()"
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Save
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
  name: "EditTheatreView",
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
        if (data.status !== "success") {
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch("http://127.0.0.1:5000/api/fetch_theatre/" + this.$route.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.theatre.theatrename = data.theatrename;
          this.theatre.location = data.location;
          this.theatre.capacity = data.capacity;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  data() {
    return {
      theatre: {
        theatrename: "",
        location: "",
        capacity: 0,
      },
    };
  },
  components: {
    NavBar,
  },
  methods: {
    verifyToken() {
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

    edit_theatre() {
      const token = localStorage.getItem("ticket_show_token");
      const editedTheatre = {
        theatre_id: this.$route.params.id,
        theatrename: this.theatre.theatrename,
        location: this.theatre.location,
        capacity: this.theatre.capacity,
      };
      fetch("http://127.0.0.1:5000/api/edit_theatre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(editedTheatre),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            this.$router.push("/admindashboard");
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
