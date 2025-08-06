<!-- eslint-disable prettier/prettier -->
<template>
  <section class="home-section">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <span class="text-xl font-semibold">Ticket Show Application</span>
      <div class="w-full bg-white rounded-lg shadow p-6 mt-6">
        <h1 class="text-lg font-semibold mb-4">Sign in to your account</h1>
        <form class="space-y-4">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium"
              >Username</label
            >
            <input
              type="text"
              name="username"
              id="username"
              v-model="username"
              class="input-field"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              class="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            @click.prevent="admin_login"
            class="btn-primary"
          >
            Admin Login
          </button>
          <p class="text-sm font-light text-gray-500">
            Are you a user? <a href="/login" class="text-primary">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdminLoginView",
  data() {
    return {
      username: "",
      password: "",
      message: "",
      message_type: "alert-warning",
    };
  },
  methods: {
    admin_login() {
      fetch("http://127.0.0.1:5000/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == "success") {
            localStorage.setItem("ticket_show_token", data.token);
            this.$store.commit("setUser", data.user_data);
            this.message = "Welcome " + data.user_data.name;
            this.message_type = "alert-success";
            this.$router.push("/admindashboard");
          } else {
            alert(data.message);
          }
        });
    },
  },
  computed: {
    show_message() {
      return this.message != "";
    },
  },
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
        if (data.status == "success") {
          this.$router.push("/admindashboard");
        }
      });
  },
};
</script>

<style>
.home-section {
  background: #e4e9f7;
  min-height: 100vh;
}

.text-xl {
  font-size: 1.25rem;
}

.input-field {
  border: 1px solid #ccc;
  padding: 0.625rem;
  width: 100%;
  border-radius: 0.375rem;
}

.btn-primary {
  background-color: #1e4e8c;
  color: #fff;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background-color: #153c6a;
}

.text-primary {
  color: #1e4e8c;
}
</style>
