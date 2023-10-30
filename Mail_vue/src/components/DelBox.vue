<template>
    <div v-if="this.binResponse && this.binResponse.length >0 " class="content">
        <table v-for="each in this.binResponse" :key="each.id">
            <div style="background-color: beige;">
            <tr :id="each.id">
                <td><input type="checkbox" v-model="Ids" :value="each.id"/></td>
                <td>from :{{ each.senderId }}</td>
                <td>Subject :{{ each.subject }}</td>
                <td>Date :{{ formatDate(each.date) }}</td>
                <td>Time :{{ each.time }}</td>
                <td><button @click="mailClicked(each.id)">View</button></td>
            </tr>
            </div>
        </table>
        <button @click="deleteMails(this.Ids)" class="iconbutton"><i class="fa-solid fa-trash-can" style="color: #000000;font-size: 20px;"></i></button>
    </div>
    <div v-else >
        <center><h4 style="color:red;">{{ this.failedResponse }}</h4></center>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name : 'DelBox',
    data() {
        return {
            binResponse:null,
            failedResponse:null,
            Ids:[],
        }
    },
    mounted() {
        this.getBinMails();
    },
    methods : {
        getBinMails() {
            const mailid=localStorage.getItem("Email");
            axios.get(`http://localhost:8080/gmail/getbinmails/deleted/${mailid}`)
            .then(response => {
            console.log('Bin mails  :', response.data);
            // Update the user object with the fetched data
            this.binResponse = response.data;
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
                name: 'Fullmail',
            });
        },
        async deleteMails(Ids) {
            console.log("fghjk",Ids)
            // const data=new FormData();
            // data.append('id',Ids);
            try {
                const result = await axios.delete(`http://localhost:8080/gmail/deletepermanently/${Ids}`,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                });
                console.log("Message" , result.data);
                this.binResponse = this.binResponse.filter((item) => !this.Ids.includes(item.id));
                this.selectedIds=[];
                this.getBinMails();
            }
            catch(err) {
                console.log("Error",err);
            }
        }
    }
}
</script>
<style>
</style>