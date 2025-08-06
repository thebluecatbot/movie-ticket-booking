<template>
  <NavBar></NavBar>
  <div class="container mx-auto mt-8 max-w-[50%]">
    <div class="mb-3">
      <label for="theatreId" class="block text-gray-700 font-bold mb-2"
        >Theatre ID:</label
      >
      <input
        type="text"
        v-model="theatreId"
        id="theatreId"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div class="mb-4">
      <button
        @click.prevent="exportCSV"
        @click="exportCSV(theatreId)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Export CSV
      </button>
    </div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

export default {
  name: "TheatreCSVView",
  components: {
    NavBar,
  },
  data() {
    return {
      theatreId: "",
      errorMessage: "",
    };
  },
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
  methods: {
    exportCSV(theatreId) {
      const url = `http://127.0.0.1:5000/export_csv?theatreId=${theatreId}`;
      const token = localStorage.getItem("ticket_show_token");
      axios({
        url: url,
        method: "GET",
        responseType: "blob",
        headers: {
          "x-access-token": token,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            const file_name = `theatre_${this.theatreId}_details.csv`;
            link.href = url;
            link.setAttribute("download", file_name);
            document.body.appendChild(link);
            link.click();
            this.errorMessage = "";
          } else if (response.status === 404) {
            this.errorMessage = "Theatre not found";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>
