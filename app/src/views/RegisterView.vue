<template>
  <section class="home-section">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <span class="text-xl font-semibold">BlogLite</span>
      <div class="w-full bg-white rounded-lg shadow p-6 mt-6">
        <h1 class="text-lg font-semibold mb-4">Create new account</h1>
        <form class="space-y-4">
          <div>
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              v-model="name"
              class="input-field"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label for="surname">Surname</label>
            <input
              type="text"
              name="surname"
              id="surname"
              v-model="surname"
              class="input-field"
              placeholder="Surname"
              required
            />
          </div>
          <div>
            <label for="username">Username</label>
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
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="input-field"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label for="password">Password</label>
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
          <div>
            <label for="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              v-model="confirm_password"
              class="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            @click.prevent="user_register"
            class="btn-primary"
          >
            Let's dive in
          </button>
          <p class="text-sm font-light">
            Already have an account ?
            <a href="/" class="text-primary">Sign in</a>
          </p>
          <p class="text-sm font-light">
            Admin? <a href="/adminlogin" class="text-primary">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      message: "",
      is_admin: false,
      message_type: "alert-warning",
    };
  },
  methods: {
    user_register() {
      if (this.match) {
        fetch("http://127.0.0.1:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            surname: this.surname,
            username: this.username,
            password: this.password,
            email: this.email,
            is_admin: false,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status == "success") {
              window.location.href = "/";
            }
            alert(data.message);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        this.message = "Password does not match";
      }
    },
  },
  computed: {
    match() {
      if (this.password == this.confirm_password && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
    show_message() {
      return this.message != "";
    },
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
