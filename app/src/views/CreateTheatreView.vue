<template>
  <NavBar></NavBar>
  <AdminBar></AdminBar>
  <section class="home-section">
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
          >
            New Theatre
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Create a new theatre to host shows and events
          </p>
        </div>
        <div class="lg:w-2/3 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <!-- Theatre Name -->
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
                  class="w-full rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Location -->
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
                  class="w-full rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Capacity -->
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
                  class="w-full rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Submit Button -->
            <div class="p-2 w-full">
              <button
                @click="createTheatre"
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Create Theatre
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
import AdminBar from "../components/AdminBar.vue";
// Add other necessary imports here

export default {
  name: "CreateTheatreView",
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
          this.$router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  components: {
    NavBar,
    AdminBar,
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
  methods: {
    createTheatre() {
      const token = localStorage.getItem("ticket_show_token");
      if (
        !this.theatre.theatrename ||
        !this.theatre.location ||
        this.theatre.capacity <= 0
      ) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("theatrename", this.theatre.theatrename);
      formData.append("location", this.theatre.location);
      formData.append("capacity", this.theatre.capacity);

      fetch("http://127.0.0.1:5000/api/create_theatre", {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formData,
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
  min-height: 5vh;
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
