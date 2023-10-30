<template>
    <!-- <div>{{ this.inboxResponse }}</div> -->
    <div v-if="inboxResponse && inboxResponse.length >0 " class="content">
        <table v-for="each in this.inboxResponse" :key="each.id">
            <div style="background-color:antiquewhite;">
            <tr :id="each.id" :class="{ 'true': each.read, 'false': !each.read }">
                <td><input type="checkbox" v-model="selectedIds" :value="each.id"/></td>
                <td><button @click="setImportant(each)" class="iconbutton">
                <i class="fa-regular fa-star" style="font-size: 20px;" v-if="each.isImportant===false"></i>
                <i class="fa-solid fa-star" style="color: #fbf304;font-size: 20px;" v-if="each.isImportant===true"></i></button></td>
                <td>from :{{ each.senderId }}</td>
                <td>Subject :{{ each.subject }}</td>
                <td>Date :{{ formatDate(each.date) }}</td>
                <td>Time :{{ each.time }}</td>
                <td><button @click="mailClicked(each.id)">View</button></td>
            </tr>
            </div>
        </table>
        <button @click="deleteMails(this.selectedIds)" class="iconbutton"><i class="fa-solid fa-trash-can" style="color: #000000;font-size: 20px;"></i></button>
    </div>
    <div v-else>
        <center><h4 style="color:red;">{{ this.failedResponse }}</h4></center>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "InBox",
    data() {
        return {
            inboxResponse:null,   //stores reponse from inbox method
            mailid:null,
            isimportant:false,
            failedResponse:null,
            selectedIds:[],
        }
    },
    mounted() {
        this.getinboxMails();
    },
    methods : {
        getinboxMails() {
            const mailid=localStorage.getItem("Email");
            axios.get(`http://localhost:8080/gmail/getreceivedmails/inbox/${mailid}`)
            .then(response => {
            console.log('inbox mails  :', response.data);
            // Update the user object with the fetched data
            this.inboxResponse = response.data;
            })
            .catch(error => {
            console.error('Error fetching user profile', error);
            this.failedResponse=error.response.data;
            });
        },
        formatDate(rawDate) {
            const date = new Date(rawDate);
            // Create an options object for the date formatting
            const options = { year: "numeric", month: "short", day: "numeric" };
            // Use the toLocaleDateString() method to format the date
            return date.toLocaleDateString("en-US", options);
        },
        mailClicked(id) {
            console.log("mail clicked.");
            console.log(id);
            localStorage.setItem('id',id);
            this.$router.push({ 
                path: '/fullmail',
            });
        },
        async setImportant(each) {
            console.log("This is mail before",each.isImportant);
            this.isimportant=each.isImportant;
            let currentIsImportant = !this.isimportant;
            console.log(currentIsImportant);
            console.log(each.id);
            const data=new FormData();
            data.append('important',currentIsImportant);
            data.append('id',each.id);
            try {
                const result = await axios.put(`http://localhost:8080/gmail/setimportant`, data ,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                });
                console.log(result);
                this.getinboxMails();
            }
            catch(err) {
                console.log(err);
            }
        },
        async deleteMails(selectedIds) {
            console.log("fghjk",selectedIds)
            const data=new FormData();
            data.append('ids',selectedIds);
            try {
                const result = await axios.put(`http://localhost:8080/gmail/deletemail`, data ,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                });
                console.log("Message" , result.data);
                this.inboxResponse = this.inboxResponse.filter((item) => !this.selectedIds.includes(item.id));
                this.selectedIds=[];
            }
            catch(err) {
                console.log("Error",err);
            }
        },
        // showIds(id) {
        //     this.selectedIds=this.selectedIds+id;
        //     console.log("SelectedIds",this.selectedIds);
        // }
    }
}
</script>
<style>
.rows {
  flex: 1;
  display: flex; /* Use flexbox for layout */
  /* align-items: center; Vertically align items */
  margin-bottom: 0.8px;
  width: 95%;
  margin-left: 30px;
  margin-right: 25px;
}
.to {
  flex: 1; /* Allow the 'to' label to expand and take up available space */
  font-weight: bold;
}
.sub {
  flex: 2;
  font-style: normal;
}
.date {
  flex: 3;
}
.content {
    margin:50px;
}
.false {
    font-weight: bold;
    background-color: cadetblue;
}
.iconbutton {
    background: none;
    border: none;
}
</style>