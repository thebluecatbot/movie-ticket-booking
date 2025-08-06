<template>
  <section class="bg-gray-50 dark:bg-gray-900 home-section">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <span
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        Welcome to Ticket Show App
      </span>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1>Get Started</h1>
          <div class="flex justify-center space-x-4">
            <button @click.prevent="goToUserRegister" class="btn-user-register">
              User Register
            </button>
            <button @click.prevent="goToUserLogin" class="btn-user-login">
              User Login
            </button>
            <button @click.prevent="goToAdminLogin" class="btn-admin-login">
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FirstPage",
  methods: {
    goToUserRegister() {
      this.$router.push("/signup");
    },
    goToUserLogin() {
      this.$router.push("/login");
    },
    goToAdminLogin() {
      this.$router.push("/adminlogin");
    },
  },
};
</script>

<style>
.home-section {
  position: relative;
  background: #e4e9f7;
  min-height: 100vh;
  top: 0;
  transition: all 0.5s ease;
  z-index: 2;
}
.home-section .text {
  display: inline-block;
  color: #11101d;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}

/* Add your custom styles for buttons here */
.btn-user-register,
.btn-user-login,
.btn-admin-login {
  background-color: #11101d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
