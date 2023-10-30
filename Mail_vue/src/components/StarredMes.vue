<template>
    <div v-if="this.importantResponse  && this.importantResponse.length >0 ">
        <table v-for="each in this.importantResponse" :key="each.id">
            <div style="background-color: beige;">
                <tr :id="each.id">
                    <td>from :{{ each.senderId }}</td>
                    <td>Subject :{{ each.subject }}</td>
                    <td>Date :{{ formatDate(each.date) }}</td>
                    <td>Time :{{ each.time }}</td>
                    <td><button @click="mailClicked(each.id)">View</button></td>
                </tr>
            </div>
        </table>
    </div>
    <div v-else>
        <center><h4 style="color:red;">{{ this.failedResponse }}</h4></center>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name : 'StarredMes',
    data() {
        return {
            importantResponse:null,   //stores reponse from inbox method
            // type:null,           //it will change the type according to the method called
            mailid:null,
            there : false,
            resp:null,
            failedResponse:null,
        }
    },
    mounted() {
        this.getimportantMails();
    },
    methods : {
        getimportantMails() {
            const mailid=localStorage.getItem("Email");
            axios.get(`http://localhost:8080/gmail/getimportantmails/true/${mailid}`)
            .then(response => {
            console.log('important mails  :', response.data);
            // Update the user object with the fetched data
            this.importantResponse = response.data;
            })
            .catch(error => {
            console.error('Error fetching user profile', error);
            this.failedResponse = error.response.data;
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
                name: 'Fullmail',
            });
        },
    }
}
</script>