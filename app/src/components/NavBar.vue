<template>
  <div class="sidebar" ref="sidebar">
    <ul class="nav-list">
      <div>
        <li>
          <div>
            <router-link class="nav-link" to="/userdashboard">USER</router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link class="nav-link" to="/userdashboard"
              >DASHBOARD</router-link
            >
          </div>
        </li>
      </div>
      <li>
        <a href="/user_bookings">
          <span class="links_name">USER BOOKINGS</span>
        </a>
        <span class="tooltip">USER BOOKINGS</span>
      </li>

      <li>
        <a href="/userdashboard">
          <span class="links_name">USER DASHBOARD</span>
        </a>
        <span class="tooltip">USER DASHBOARD</span>
      </li>

      <li>
        <a href="/search_theatres_by_location">
          <span class="links_name">Search Location</span>
        </a>
        <span class="tooltip">Search Location</span>
      </li>
      <li>
        <a href="/search_shows_by_tag">
          <span class="links_name">Search Tag</span>
        </a>
        <span class="tooltip">Search Tag</span>
      </li>

      <li>
        <span id="log_out" @click="logout">Logout</span>
      </li>
    </ul>
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
      sidebar: false,
      user: {},
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("ticket_show_token");
      this.$router.push("/");
    },
  },
  computed: {
    //empty
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 150px;
  background: #11101d;
  padding: 10px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}
.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
}
.sidebar .logo-details .logo_name {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
}
.sidebar i {
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.sidebar li a {
  display: flex;
  height: 60px;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  background: #11101d;
}
.sidebar li a .links_name {
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 1;
  pointer-events: auto;
  transition: 0.4s;
}
.sidebar li i {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}
.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 150px;
  left: 0;
  bottom: 0;
  padding: 10px 14px;
  background: #1d1b31;
  transition: all 0.5s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.sidebar .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li.profile img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile .name,
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}
.sidebar li.profile .job {
  font-size: 12px;
}
.sidebar .profile #log_out {
  position: absolute;
  bottom: 10px;
  right: 14px;
  transform: translateY(0);
  background: #1d1b31;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar.open .profile #log_out {
  width: 40px;
  background: none;
}
.home-section {
  position: relative;
  background: #e4e9f7;
  min-height: 100vh;
  top: 0;
  left: 150px;
  width: calc(100% - 150px);
  transition: all 0.5s ease;
  z-index: 2;
}
.sidebar.open ~ .home-section {
  left: 250px;
  width: calc(100% - 250px);
}
@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}
</style>
