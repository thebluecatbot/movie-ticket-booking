<template>
  <div>
    <NavBar></NavBar>
    <AdminBar></AdminBar>
    <section class="home-section">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
          >
            Edit Show: {{ show.showname }}
          </h1>
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
                @click="editShow"
                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import AdminBar from "../components/AdminBar.vue";
export default {
  name: "EditShowView",
  beforeCreate: function () {
    console.log("Before Create: Fetching token");
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
        console.log("Token Verification Response:", data);
        if (data.status !== "success") {
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log("Before Create: Fetching show data");
    fetch("http://127.0.0.1:5000/api/fetch_show/" + this.$route.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch Show Data Response:", data);
        if (data.status === "success") {
          this.show.showname = data.showname;
          this.show.time = data.time;
          this.show.rating = data.rating;
          this.show.price = data.price;
          this.show.tag = data.tag;
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
    verifyToken() {
      const token = localStorage.getItem("ticket_show_token");
      console.log("Verifying Token:", token);

      fetch("http://127.0.0.1:5000/api/verify_token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Token Verification Response:", data);
          if (data.status !== "success") {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    editShow() {
      console.log("Edit Show: Button clicked");
      const token = localStorage.getItem("ticket_show_token");
      const editedShow = {
        show_id: this.$route.params.id,
        showname: this.show.showname,
        location: this.show.location,
        capacity: this.show.capacity,
        theatres: JSON.stringify(this.selectedTheatres),
      };
      console.log("Edited Show Data:", editedShow);

      fetch("http://127.0.0.1:5000/api/edit_show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(editedShow),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Edit Show Response:", data);
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
      console.log("Fetching Theatres with Token:", token);

      fetch("http://127.0.0.1:5000/api/theatres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetch Theatres Response:", data);
          if (data.status === "success") {
            this.theatres = data.theatres;
            console.log("Theatres Data:", this.theatres);
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
