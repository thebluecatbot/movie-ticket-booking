<!-- eslint-disable prettier/prettier -->
<template>
  <NavBar></NavBar>

  <div>
    <section class="text-gray-600 body-font">
      <div class="container py-20 mx-auto flex flex-col">
        <div class="flex flex-wrap w-full mb-10 flex-col items-center text-center">
          <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Your Bookings
          </h1>
        </div>
        <div v-if="bookedTickets.length > 0" class="mx-auto">
          <table class="min-w-full border-collapse block md:table">
            <thead class="block md:table-header-group">
              <tr class="bg-gray-200 text-gray-600 border-b">
                <th class="text-left p-2">Show Name</th>
                <th class="text-left p-2">Theatre Name</th>
                <th class="text-left p-2">Number of Tickets</th>
              </tr>
            </thead>
            <tbody class="block md:table-row-group">
              <tr v-for="ticket in bookedTickets" :key="ticket.id" class="bg-white border-b">
                <td class="text-left p-2">{{ ticket.show_details.showname }}</td>
                <td class="text-left p-2">{{ ticket.theatre_details.theatrename }}</td>
                <td class="text-left p-2">{{ ticket.num_seats }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center">
          <p class="text-2xl text-gray-900">No tickets booked yet.</p>
        </div>
      </div>
    </section>
  </div>
</template>




<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "AdminDashboard",
  components: {
    NavBar,
  },

  data() {
    return {
      bookedTickets: [],
    };
  },
  methods: {
    fetchUserBookings() {
      // Make an API request to fetch user's bookings
      fetch("http://127.0.0.1:5000/api/user_bookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("ticket_show_token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Add this line for debugging

          if (data.booked_tickets) {
            this.bookedTickets = data.booked_tickets;
          }
        })
        .catch((error) => {
          console.error("Error fetching user bookings:", error);
        });
    },
  },

  created() {
    this.fetchUserBookings();
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
