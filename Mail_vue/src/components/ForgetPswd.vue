<template>
  <div>
    <h3>Welcome to Forget Password page</h3>
    <div class="pwd">
      <center>
        <form @submit.prevent="pswdUpdate">
          <table>
            <tr>
              <td>Mail:</td>
              <td>
                <input
                  type="email"
                  placeholder="Enter the Mail Id"
                  required
                  v-model="mail"
                >
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="password"
                  placeholder="Enter the new Password"
                  required
                  v-model="user.pswd"
                >
              </td>
            </tr>
          </table>
          <br>
          <button type="submit">Update Password</button>
        </form>
      </center>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForgetPswd',
  data() {
    return {
      mail: '',
      user: {
        pswd: '',
      },
    };
  },
  methods: {
    async pswdUpdate() {
      try {
        const response = await axios.put(
          `http://localhost:8081/mail/pswdupdate/${this.mail}`,
          this.user
        );
        console.log(response);
        alert(response.data);
      } catch (err) {
        console.log("Error Err", err);
        alert(err.response.data);
      }
    },
  },
};
</script>
<style scoped>
.pwd {
  border: 2px solid black;
  margin-left: 25%;
  margin-right: 25%;
  padding-top: 45px;
  padding-bottom: 45px;
}
</style>