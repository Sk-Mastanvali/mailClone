<template>
        <fieldset style="width:900px;">
            <div style="background-color: antiquewhite;">
            <h3>{{ this.mailResponse.subject }}</h3>
            <label class="label">From :</label><label>{{ this.mailResponse.senderId }}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label class="label">Date :</label><label>{{ this.mailResponse.date }}</label><br>
            <label class="label">To :</label><label>{{ this.receiversid}}</label><br>
            <label class="label">Message :</label><br>
            <div class="msg">{{ this.mailResponse.message }}</div>
            </div>
        </fieldset>
</template>
<script>
import axios from 'axios';
export default {
    name : 'FullMail',
    data() {
        return {
            mailResponse:{},
            receiversid:[],
        }
    },
    mounted() {
        this.getMail();
    },
    methods : {
        getMail() {
            const id=localStorage.getItem('id');
            axios.get(`http://localhost:8080/gmail/getmail/${id}`)
            .then(response => {
            console.log('Mail  :', response.data);
            // Update the user object with the fetched data
            this.mailResponse = response.data;
            this.receiversid=response.data.receiversId.join(", ");
            })
            .catch(error => {
            console.error('Error fetching user profile', error);
            });
            axios.put(`http://localhost:8080/gmail/setread/${id}`)
            .then(response => {
            console.log('Important setted  :', response.data);
            // Update the user object with the fetched data
            console.log(response.data);
            })
            .catch(error => {
            console.error('Error fetching user profile', error);
            });
        }
    }
}
</script>
<style>
.msg {
    width :500px;
    height:200px;
    border: 2px solid black;
    margin-left:70px;
    background-color: white;
}
.label {
    font-weight: bold;
}
</style>