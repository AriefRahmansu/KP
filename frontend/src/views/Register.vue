<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign up with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div> -->
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign up with credentials - {{message}}</small>
          </div>
          <form role="form" @submit.prevent="handleRegister">
            <base-input
              formClasses="input-group-alternative"
              placeholder="Username"
              addon-left-icon="ni ni-hat-3"
              v-model="user.username"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="user.email"
              focused
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="user.password"
            >
            </base-input>

            <div class="text-muted font-italic">
              <small
                >password strength:
                <span class="text-success font-weight-700">strong</span></small
              >
            </div>

            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted"
                    >I agree with the <a href="#!">Privacy Policy</a></span
                  >
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" native-type="submit"
                >Create account</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account {{ user.username }}</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from '../models/user';

export default {
  name: "register",
  data() {
    return {
      // model: {
      //   name: "",
      //   email: "",
      //   password: "",
      // },
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      console.log("Register: ", this.user.username);
      // this.$validator.validate.then(isValid => {
        // if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message = 
                (error.response && error.response.data) ||
                error.message || error.toString();
              this.successful = false;
              console.log(this.message);
            }
          )
        // }
      // });
    }
  }
};
</script>
<style></style>
