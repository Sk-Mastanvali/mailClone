<template>
    <!-- <h1>This is from Profile component</h1> -->
    <!--Profile section-->
    <div class="profile" v-if="updatePassword===false">  
        <fieldset>
            <table>
                <tr>
                    <td class="profiletable">
                        <img :src="'data:image/png;base64,'+userDetails.profilePic" alt="No file uploaded" class="image"/>
                        <button class="iconbutton" @click="updateImage()"><span class="material-symbols-outlined">add_box</span></button>
                    </td>
                    <td class="profiletable">
                        <label>First name</label>
                        <tr>
                            <td>
                                <input v-model="userDetails.firstName" class="profiledetails"/>
                            </td>
                        </tr>
                    </td>
                    <td class="profiletable">
                        <label>Last name</label>
                        <tr>
                            <td>
                                <input v-model="userDetails.lastName" class="profiledetails"/>
                            </td>
                        </tr>
                    </td>
                    <td>
                        <label>Password</label>
                        <tr>
                            <td>
                                <input type="password" readonly="true" v-model="userDetails.password" class="profiledetails"/>
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td class="profiletable">
                        <label>Mail id </label>
                        <tr>
                            <td class="profiletable">
                                <input readonly="true" v-model="userDetails.mailid" class="profiledetails"/>
                            </td>
                        </tr>
                    </td>
                    <td class="profiletable">
                        <label>Gender</label>
                        <tr>
                            <td class="profiletable">
                                <input v-model="userDetails.gender" class="profiledetails" title="You should only enter Male,Femlae,Others only" />
                            </td>
                        </tr>
                    </td>
                    <td class="profiletable">
                        <label>Mobile Number</label>
                        <tr>
                            <td class="profiletable">
                                <input v-model="userDetails.mobileNo" class="profiledetails"/>
                            </td>
                        </tr>
                    </td>
                    <td>
                        <button @click="changePassword()">Change Password</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="update()">Update Details</button> 
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><button type="button" @click="deleteAccount()">Delete Account</button></td>
                </tr>
            </table>
        </fieldset>
        <div v-if="changePicture===true" class="updateprofile">     <!--Update profile pic-->
            <fieldset>
                <form @submit="updateProfilePic()">
                    <label>Update profile picture :</label><input type="file" accept="image/*" @change="pickImage($event)"/>
                    <button type="submit">update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" @click="updateImage()">close</button>
                </form>
            </fieldset>
        </div>
    </div>
    <center v-if="updatePassword===true" style="margin-top: 100px;">
        <fieldset style="background-color: beige;border-radius: 30px;width: max-content;">
            <form @submit.prevent="passwordUpdate()">
                <table>
                    <tr>
                        <td>Old password</td>
                        <td><input type="password" @blur="checkPassword()" v-model="this.oldPassword"><br>
                            <label v-if="incorrect===true" style="color: red;">{{this.incorrectResult}}</label>
                        </td>
                    </tr>
                    <br>
                    <tr>
                        <td>New Password</td>
                        <td><input type="password" v-model="this.newPassword"><br>
                            <label v-if="notMatched===true" style="color: red;">{{ this.matchedResult }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Re-enter new password</td>
                        <td><input type="text" v-model="this.password" @blur="matchedPasswords()"></td>
                    </tr>
                    <tr>
                        <td><button @click="changePassword()">Close</button></td>
                        <td><button type="submit">Update</button></td>
                    </tr>
                </table>
            </form>
        </fieldset>
    </center>
</template>
<script>
import axios from 'axios';
export default {
    name :'UserProfile',
    data() {
        return {
            userDetails :{},     //will store the data of user when setup method is called
            profilePic:null,
            changePicture:false,  //it will get true when user clicks on plus icon
            updateDetails : {
                firstName:null,
                lastName:null,
                gender:null,
                mobileNo:null
            },
            updatePassword:false,             //it will show the password update div tag
            oldPassword:null,                 //user entered old password for verification
            newPassword:null,                 //users new password
            password:null,                    //users confirmed password for verification
            incorrectResult:null,             //it will show the result if old password is wrong
            incorrect:false,                  //result if old password is wrong
            notMatched :false,                //it will show if new password and confirm password not matched
            matchedResult:null,               //result if passwords are not matched
        }
    },
    mounted() {
        this.getUser();
    },
    methods : {
        async getUser() {
            const mailid = localStorage.getItem("Email");
            console.log(mailid);
            try {
                const response=await axios.get(`http://localhost:8080/gmail/getuser/${mailid}`,{
                    headers : {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log(response);
                this.userDetails=response.data;
            }
            catch(error) {
                console.error('Error fetching user profile', error);
            }
        },
        pickImage(event) {
            console.log("Image method called");
            this.profilePic=event.target.files[0];
        },
        updateImage() {    //to display the update image div tag
            this.changePicture=!this.changePicture;    //this act as a toggle method
        },
        async updateProfilePic() {           //this is for changing profile picture
            const data = new FormData();
            data.append("image",this.profilePic);
            try {
                const result = await axios.put(`http://localhost:8080/gmail/updateimage/${this.userDetails.mailid}`,data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(result);
            }
            catch(err) {
                console.log(err);
            }
        },
        async update() {
            const data = new FormData();
            data.append('user',JSON.stringify(this.userDetails));
            try {
                const result = await axios.put(`http://localhost:8080/gmail/updatedetails/${this.userDetails.mailid}`,data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(result);
            }
            catch(err) {
                console.log(err);
            }
        },
        changePassword() {
            this.updatePassword=!this.updatePassword;
        },
        checkPassword() {
            if(this.oldPassword!=this.userDetails.password)
            {
                this.incorrect=true;
                this.incorrectResult="Password is incorrect";
            }
            else{
                this.incorrectResult=null;
                this.incorrect=false;
            }
        },
        async passwordUpdate() {
            if(this.newPassword==this.password)
            {
                try {
                    const result = await axios.put(`http://localhost:8080/gmail/changepassword/${this.userDetails.mailid}/${this.password}`, {
                        headers: {
                            "Content-Type": "form-data/json"
                        }
                    });
                    console.log(result.data);
                    window.alert(result.data);
                    localStorage.removeItem('Email');
                    this.$router.push({
                        path : '/',
                    })
                }
                catch (err) {
                    console.log(err);
                }
            }
        },
        matchedPasswords() {
            if(this.newPassword!=this.password) {
                this.notMatched=true;
                this.matchedResult="Passwords are not matched";
            }
            else {
                this.notMatched=false;
                this.matchedResult=null;
            }
        },
        async deleteAccount() {
            try {
                const response=await axios.delete(`http://localhost:8080/gmail/deleteuser/${this.userDetails.mailid}`,{
                    headers : {
                        "Content-Type": "multipart/form-data"
                    }
                })
                console.log(response);
                this.$router.push({
                    path : '/',
                });
            }
            catch(error) {
                console.error('Error fetching user profile', error);
            }
        }
    }
}
</script>
<style>
.profile {                /*This is for profile details showing */
    background-color: aquamarine;
    margin: 10px;
    border:2px solid red;
    border-radius: 20px;
    display: grid;
}
.iconbutton {
    background: none;
    border: none;
}
.updateprofile {              /*This is for update profile div tag */
    width : 450px;
    background-color: cadetblue;
}
.profiledetails {
    background-color: antiquewhite;
    margin: 10px;
    width:200px;
    height: 20px;
}
.updateDetails {
    background-color:burlywood;
    margin: 10px;
    border:2px solid red;
    border-radius: 20px;
    width: 50%;
}
.image{
    width: 200px;
    height:200px;
    border: double brown 3px;
    border-radius: 50%;
}
fieldset {
    border: none;
}
</style>