<template>
  <div>
    <h3>Welcome to Sign-in page</h3>
    <div class="in">
      <center>
        <form @submit.prevent="signin">
          <table>
            <tr>
              <td>Mail :</td>
              <td><input type="email" v-model="user.mail" required></td>
            </tr>
            <tr>
              <td>Password:</td>
              <td><input type="password" v-model="user.pswd" required></td>
            </tr>
          </table>
          <br>
          <button type="submit">Sign in</button>
          <br><br>
          <router-link to="/forgetpswd">Forget Password</router-link>
        </form>
      </center>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'SignIn',
  data() {
    return {
      user: {
        mail: '',
        pswd: '',
      },
    };
  },
  methods: {
    async signin() {
        try {
            const url = `http://localhost:8081/mail/signin/${this.user.mail}/${this.user.pswd}`;
            const response = await axios.get(url);
            console.log(response);
           localStorage.setItem('Email',this.user.mailid);
                this.$router.push({
                    path: '/mail',
                });
            }
            catch (err) {
                console.log(err);
                // this.notMatched=true;
                // this.notMatchedResult=err.response.data;
            }
        },
    },
}
</script>

<style scoped>
.in {
  border: 2px solid black;
  margin-left: 25%;
  margin-right: 25%;
  padding-top: 45px;
  padding-bottom: 45px;
}
</style>