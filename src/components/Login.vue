<template>
 <div class="container">
    <div class="row">
        <!-- <div class="col-sm-6 col-md-4 col-md-offset-4"> -->
            <!-- <h1 class="text-center login-title">Sign in to continue</h1> -->
            <div class="account-wall">
                <img class="profile-img" src="../assets/head_bob.gif"
                    alt="">
                    <!-- <h3>Welcome</h3> -->
                <form class="form-signin" v-on:submit.prevent="login()">
                <input v-model="account.username" type="text" class="form-control" placeholder="Email" required autofocus>
                <input v-model="account.password" type="password" class="form-control" placeholder="Password" required>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                    Sign in</button>
                <label class="checkbox pull-left">
                    <input type="checkbox" value="remember-me">
                    Remember me
                </label>
                <a href="#" class="pull-right need-help">Need help? </a><span class="clearfix"></span>
                </form>
            </div>
            <router-link to="/register"><a class="new-account"></a>Create an account</router-link>
        </div>
    <!-- </div> -->
</div>
</template>

<script>

import auth from '../services/auth-service';
import router from 'vue-router'

export default {
  name: 'login',
  data: function(){
      return {
    account: {
        username:'lucasmancan',
        password:'lucasmancan'
    }
    }
  },
  methods:{
  login(){
      auth.login(this.account).then(res => {

          if(res.success){
            localStorage.setItem("user-token", res.data);

            this.$router.push('/account')
          }else{
              localStorage.removeItem("user-token");
          }
      }).catch(error => {
          console.log("ERROR ", error)
      }) 
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-signin
{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox
{
    margin-bottom: 10px;
}
.form-signin .checkbox
{
    font-weight: normal;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input
{
    margin-bottom: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
/* .form-signin input[type="password"]
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
} */
.account-wall
{
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7; 
     -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3); 
}
.login-title
{
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
}
.profile-img
{
    /* max-width: 96px;
    height: 96px; */
    max-width: 60%;
    margin: 0 auto 10px;
    display: block;
    /* -moz-border-radius: 50%;
    -webkit-border-radius: 50%; */
    /* border-radius: 50%; */
}
.need-help
{
    margin-top: 10px;
}
.new-account
{
    display: block;
    margin-top: 10px;
}
</style>
