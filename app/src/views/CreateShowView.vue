<template>
  <NavBar></NavBar>
  <AdminBar></AdminBar>
  <section class="home-section">
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-6">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
          >
            New Show
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Create a new show to entertain your audience
          </p>
        </div>
        <div class="lg:w-2/3 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <!-- Show Name -->
            <div class="p-2 w-full">
              <div class="relative">
                <label for="showname" class="leading-7 text-sm text-gray-600"
                  >Show Name</label
                >
                <input
                  type="text"
                  id="showname"
                  name="showname"
                  v-model="show.showname"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Time -->
            <div class="p-2 w-full">
              <div class="relative">
                <label for="time" class="leading-7 text-sm text-gray-600"
                  >Time (HH:MM)</label
                >
                <input
                  type="text"
                  id="time"
                  name="time"
                  v-model="show.time"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Rating -->
            <div class="p-2 w-full">
              <div class="relative">
                <label for="rating" class="leading-7 text-sm text-gray-600"
                  >Rating</label
                >
                <input
                  type="number"
                  step="0.1"
                  id="rating"
                  name="rating"
                  v-model="show.rating"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Price -->
            <div class="p-2 w-full">
              <div class="relative">
                <label for="price" class="leading-7 text-sm text-gray-600"
                  >Price</label
                >
                <input
                  type="number"
                  id="price"
                  name="price"
                  v-model="show.price"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Tag -->
            <div class="p-2 w-full">
              <div class="relative">
                <label for="tag" class="leading-7 text-sm text-gray-600"
                  >Tag</label
                >
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  v-model="show.tag"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <!-- Theatres -->
            <div class="p-2 w-full">
              <div class="relative">
                <label class="leading-7 text-sm text-gray-600"
                  >Select Theatres</label
                >
                <select
                  v-model="selectedTheatres"
                  multiple
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-40 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option
                    v-for="theatre in theatres"
                    :key="theatre.id"
                    :value="theatre.id"
                  >
                    {{ theatre.theatrename }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Submit Button -->
            <div class="p-2 w-full">
              <button
                @click="createShow"
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Create Show
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

export default {
  name: "CreateShowView",
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
      show: {
        showname: "",
        time: "",
        rating: 0,
        price: 0,
        tag: "",
      },
      selectedTheatres: [],
      theatres: [], // Fetch this data from the server
    };
  },
  methods: {
    createShow() {
      const token = localStorage.getItem("ticket_show_token");
      if (
        !this.show.showname ||
        !this.show.time ||
        this.show.rating <= 0 ||
        this.show.price <= 0 ||
        !this.show.tag ||
        this.selectedTheatres.length === 0
      ) {
        alert("Please fill in all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("showname", this.show.showname);
      formData.append("time", this.show.time);
      formData.append("rating", this.show.rating);
      formData.append("price", this.show.price);
      formData.append("tag", this.show.tag);
      formData.append("theatres", JSON.stringify(this.selectedTheatres));

      fetch("http://127.0.0.1:5000/api/create_show", {
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
    fetchTheatres() {
      const token = localStorage.getItem("ticket_show_token");

      fetch("http://127.0.0.1:5000/api/theatres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            this.theatres = data.theatres;
            console.log("present");
          }
        })
        .catch((error) => {
          console.error("Error fetching theatres:", error);
        });
    },
  },
  created() {
    this.fetchTheatres();
  },
};
</script>

<style>
.home-section {
  position: relative;
  background: #e4e9f7;
  min-height: 10vh;
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
