<template>
    <center>
        <fieldset style="width:600px;border-radius:20px;background-color:aquamarine;margin-top: 100px;">
            <form @submit.prevent="sendMail()">
                <table>
                    <tr>
                        <td>To :</td>
                        <td><input type="email" multiple v-model="this.receiversMails" /></td>
                    </tr>
                    <tr>
                        <td>From :</td>
                        <td><input readonly="true" v-model="this.mailid" /></td>
                    </tr>
                    <tr>
                        <td>Subject :</td>
                        <td><input v-model="mail.subject" /></td>
                    </tr>
                    <tr>
                        <td>Body :</td>
                        <td><textarea v-model="mail.message" style="width: 400px;height: 200px;"></textarea></td>
                    </tr>
                    <center><button type="submit">Send</button></center>
                </table>
            </form>
        </fieldset>
    </center>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ComposeMail',
    data() {
        return {
            mailid: localStorage.getItem('Email'),
            mail: {
                senderId:null ,
                receiversId: [],
                subject: null,
                message: null,
            },
            receiversMails:null,
        }
    },
    methods: {
        async sendMail() {
            this.mail.receiversId=this.receiversMails.split(',');
            this.mail.senderId=localStorage.getItem('Email');
            const data = new FormData();
            data.append("mail",JSON.stringify(this.mail));
            data.append("image",this.attachments);
            console.log(this.mail.senderId);
            try {
                const result = await axios.post(`http://localhost:8080/gmail/sendmail`,data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(result);
                window.alert("Mail sent successfully");
            }
            catch(err) {
                console.log(err);
                window.alert(err);
            }
        }
    }
};
</script>