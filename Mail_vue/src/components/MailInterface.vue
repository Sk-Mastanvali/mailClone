<template>
  <div>
    <div class="sidebar">
      <button class="btn" @click="handleClick('compose')">Compose</button>
      <br /><br />
      <button class="btn" @click="handleClick('inbox')">Inbox</button>
      <br /><br />
      <button class="btn" @click="handleClick('sentbox')">Sentbox</button>
      <br /><br />
      <button class="btn" @click="handleClick('starred')">Starred</button>
      <br /><br />
      <button class="btn" @click="handleClick('bin')">Bin</button>
      <br /><br />
      <button class="btn" @click="handleClick('profile')">Profile</button>
    </div>

    <h4 class="content">Welcome to User : {{ this.mail }}</h4>
    <div><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  name: 'MailInterface',
  data() {
    return {
      mail: "",
    };
  },
  created() {
    this.mail = localStorage.getItem("Email");
  },
  methods: {
    handleClick(tab) {
      this.stab = tab;
      // Call the corresponding method based on the tab clicked
      if (tab === "inbox") {
        this.$router.push({ path: "/inbox", name: "InBox" });
      } else if (tab === "sentbox") {
        this.$router.push({ path: "/sentbox", name: "SentBox" });
      } else if (tab === "starred") {
        this.$router.push({ path: "/starred", name: "StarredMes" });
      } else if (tab === "bin") {
        this.$router.push({ path: "/deleted", name: "DelBox" });
      } else if (tab === "profile") {
        this.$router.push({ path: '/user', name: 'UserProfile' });
      } else if (tab === "compose") {
        this.$router.push({ path: '/compose',name:'ComposeMail' });
      }
    }, 
  },
};
</script>

<style scoped>
/* Style for the sidebar column */
.sidebar {
  width: 250px;
  background-color: #957f7f;
  color: #fff;
  padding: 20px;
  position: fixed;
  height: 100%;
  overflow: auto;
}
/* Style for the main content */
.content {
  margin-left: 270px;
  padding: 20px;
  background-color: rgb(190, 101, 101);
  color: #fff;
}
.btn {
  width: 100%;
  height: 30px;
  border-radius: 10px;
}

</style>