<template>
  <div class="user-dashboard">
    <NavBar></NavBar>
    <section class="home-section">
      <div class="container mx-auto py-20">
        <div class="lg:w-3/4 mx-auto">
          <div class="mt-10">
            <h1
              class="text-3xl font-medium title-font text-gray-900 text-center mb-10"
            >
              USER DASHBOARD
            </h1>
            <div v-for="theatre in theatres" :key="theatre.id" class="mb-8">
              <div
                class="bg-purple-500 text-white p-2 rounded-lg text-xl text-center"
              >
                {{ theatre.theatrename }}
              </div>
              <div class="mt-2">
                <p>Location: {{ theatre.location }}</p>
                <p>Capacity: {{ theatre.capacity }}</p>
              </div>
              <div
                v-for="show in theatre.shows"
                :key="show.id"
                class="show mb-4"
              >
                <h3 class="font-bold">{{ show.showname }}</h3>
                <p>Time: {{ show.time }}</p>
                <p>Rating: {{ show.rating }}</p>
                <p>Price: {{ show.price }}</p>
                <p>Tag: {{ show.tag }}</p>
                <p>AVAILABLE TICKETS: {{ show.available }}</p>
                <a
                  class="book-button"
                  role="button"
                  target="_blank"
                  :href="'/BookShow/' + show.showing_id"
                  >BOOK NOW</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "UserDashboardView",
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
      theatres: [],
    };
  },
  methods: {
    fetchTheatres() {
      fetch("http://127.0.0.1:5000/api/theatres")
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            const theatres = data.theatres;

            // For each theatre, fetch its associated shows
            const promises = theatres.map((theatre) => {
              return fetch(
                `http://127.0.0.1:5000/api/shows/theatre/${theatre.id}`
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.status === "success") {
                    theatre.shows = data.shows;
                  }
                })
                .catch((error) => {
                  console.error(
                    `Error fetching shows for theatre ${theatre.id}:`,
                    error
                  );
                });
            });

            // Wait for all promises to resolve
            Promise.all(promises).then(() => {
              this.theatres = theatres;
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching theatres:", error);
        });
    },
    bookTickets(showingId) {
      fetch("http://127.0.0.1:5000/api/book_show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("ticket_show_token"),
        },
        body: JSON.stringify({
          showing_id: showingId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            console.log("hi");
            alert(data["message"]);
            this.$router.go();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.fetchTheatres();
  },
};
</script>

<style scoped>
.home-section {
  background: #e4e9f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

.button {
  background-color: #fbc2fa;
  border-radius: 100px;
  color: rgb(128, 0, 126);
  cursor: pointer;
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

.button:hover {
  box-shadow: rgba(187, 44, 187, 0.35) 0 -25px 18px -14px inset,
    rgba(187, 44, 187, 0.35) 0 1px 2px, rgba(187, 44, 187, 0.35) 0 2px 4px,
    rgba(187, 44, 187, 0.35) 0 4px 8px, rgba(187, 44, 187, 0.35) 0 8px 16px,
    rgba(187, 44, 187, 0.35) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.show {
  margin-bottom: 1rem;
  border: 2px solid #ccc;
  padding: 1rem;
}

.show h3 {
  font-weight: bold;
  font-size: 1.2em;
}

.bg-purple {
  background-color: #6b46c1;
}

.text-white {
  color: #ffffff;
}

.text-center {
  text-align: center;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.px-10 {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.book-button {
  background-color: #6b46c1;
  border-radius: 10px;
  color: #ffffff;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 16px;
}
</style>
