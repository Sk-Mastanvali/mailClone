<template>
    <center>
        <fieldset style="width:800px;border-radius: 35px;background-color:rgb(238, 234, 228);margin-top: 100px;">
            <center><label class="title">SignUp Form</label></center>
            <br>
            <br>
            <form @submit.prevent="signup()">
            <table>
                <tr>
                    <td><label>Enter your Mail id</label></td>
                    <td><input type="email" placeholder="Enter mailid/username" @blur="checkMail()" v-model="user.mailid" required ><br>
                        <label v-if="notMatched===true&&notMatchedResult!=null" style="color: red;">{{ this.notMatchedResult }}</label>
                        <label v-if="notMatched===true&&matchedResult!=null" style="color:green;">{{ this.matchedResult }}</label>
                    </td>
                    <td><label>Upload your photo</label></td>
                    <td><input type="file" accept="image/*" @change="pickImage($event)"></td>
                </tr>
                <tr>
                    <td><label>Enter your first name</label></td>
                    <td><input placeholder="Enter first name" type="text" v-model="user.firstName"  required></td>
                </tr>
                <tr>
                    <td><label>Enter your last name</label></td>
                    <td><input placeholder="(optional)" type="text" v-model="user.lastName" ></td>
                </tr>
                <tr>
                    <td><label>Choose your gender  </label></td>
                    <td><input type="radio" name="gender" value="Male" v-model="user.gender"><label>Male</label>
                    <input type="radio" name="gender" value="Female" v-model="user.gender"><label>Female</label>
                    <input type="radio" name="gender" value="Others" v-model="user.gender"><label>Others</label></td>
                </tr>
                <tr>
                    <td><label>Enter your Mobile Number</label></td>
                    <td><input type="tel" placeholder="Enter mobile number" pattern="[0-9]{10}" title="enter valid number" v-model="user.mobileNo" required/></td>
                </tr>
                <tr>
                    <td><label>Enter Your password</label></td>
                    <td><input type="password" placeholder="Enter password" v-model="user.password" pattern="[a-z]{1,}[A-Z]{1,}[0-9]{1,}[!@#$%&*]{1,}" 
                        title="password must be start with small letter followed by upper case followed by atleast one number followed by one special character(!@#$%&*) eg:-nK1!">
                    </td>
                </tr>
            </table>
            <br>
            <button type="submit">Signup</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="reset">Clear</button>
            </form>
        </fieldset>
        <div v-if="registered===true" style="background-color: burlywood;">
            <center>
                <h3 class="resp">{{ this.resp }}</h3>
                <label class="info">Please click the below link to signin</label>
                <br>
                <br>
                <label><RouterLink to="/signin">Signin</RouterLink></label>
            </center>
        </div>
    </center>
</template>
<script>
import axios from 'axios';
    export default {
        name : 'SignUp',
        data() {
            return {
                user : {
                    mailid : null,
                    firstName : null,
                    lastName : null,
                    gender : null,
                    mobileNo : null,
                    password : null,
                },
                profilePic:null,           //storing profile pic from user
                resp:null,                 //displaying signup status
                registered:false,          //displaying signup status div tag
                notMatched:false,          //checking user mailid already existed
                notMatchedResult:null,     //result for mailid checking
                matchedResult:null,
            }
        },
        methods : {
            async checkMail() {
                console.log("Entered",this.user.mailid);
                if(this.user.mailid!=null) {
                    try {                     //this is for checking mailid already existed
                        const result = await axios.get(`http://localhost:8080/gmail/getuser/${this.user.mailid}`, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });
                    console.log(result.data);
                    console.log("Default" , result.data.mailid);
                    if(result.data.mailid===this.user.mailid) {
                        this.notMatched=true;
                        this.notMatchedResult="Mailid is not available";
                    }
                    else{
                        this.notMatched=true;
                        this.matchedResult="Mailid is available"
                    }
                    } 
                    catch (err) {
                        console.log(err);
                        this.notMatched=false;
                        this.notMatchedResult=null;
                    }
                }
                else {
                console.log("Mailid is not there");
                }
            },
            async signup() {
                const data = new FormData();
                data.append("user",JSON.stringify(this.user));
                if(this.profilePic!=null) {
                    data.append("profilePic",this.profilePic);
                }
                try {
                    const response = await axios.post("http://localhost:8080/gmail/saveuser",data,{
                        headers : {
                            "Content-Type":"multipart/form-data"
                        }
                    });
                    console.log(response.data);
                    this.registered=true;
                    window.alert(response.data);
                    this.resp=response.data;
                }
                catch(err) {
                    console.log("Error",err);
                    alert(err.response.data);
                }
            },
            pickImage(event) {
                console.log("Image method called");
                this.profilePic=event.target.files[0];
            },
        },
    }
</script>
<style>
     .title {
        color: darkred;
        font-family: cursive;
        font-weight: bold;
        font-size: large;
    }
    .resp {
        color:green;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .info {
        color:firebrick;
        font-family: 'Courier New', Courier, monospace;
    }
</style>