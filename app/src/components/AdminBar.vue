<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <div class="top-nav" v-if="user_data.is_admin">
      <div>
        <router-link class="nav-link" to="/admindashboard"
          >ADMIN DASHBOARD</router-link
        >
      </div>
      <div>
        <router-link class="nav-link" to="/userdashboard"
          >USER DASHBOARD</router-link
        >
        </div>
      <div>
        <router-link class="nav-link" to="/hello">hello Dashboard</router-link>
      </div>
      <div>
        <router-link class="nav-link" to="/createTheatre"
          >CREATE THEATRE
        </router-link>
      </div>
      <div>
        <router-link class="nav-link" to="/createShow"
          >CREATE SHOW
        </router-link>
      </div>
      <div>
        <router-link class="nav-link" to="/export_csv"
          >EXPORT CSV
        </router-link>
      </div>
  
    </div>

    <div class="home-section">

    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  created() {
    fetch("http://127.0.0.1:5000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application",
        "x-access-token": localStorage.getItem("ticket_show_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.user = data.user;
      });
  },
  data() {
    return {
      user_data: {
        is_admin: true,
      },
    };
  },
  methods: {
    fetchUserData() {
      setTimeout(() => {
        this.user_data.is_admin = true;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #11101d;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 100;
}

.top-nav a {
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-weight: 500;
}

@media (max-width: 100px) {
  .top-nav {
    display: none;
  }
}
</style>
