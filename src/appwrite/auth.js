import {Client ,Account ,ID} from 'appwrite';
import conf from '../conf/conf.js';

class AuthService{
   client=new Client();
   account;
   

   constructor (){
   
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.account=new Account(this.client);
   }

   async createAccount({email, password, name}){
     try {
        const userAccount= await this.account.create(ID.unique(),email,password,name);
        console.log(userAccount)
        if(userAccount){
            return this.login({email,password});
        }
        else
        return userAccount;
      
   }
catch(error){
    throw error;  
}}

async login({email,password}){
    try {
      return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        console.log("login error ::",error);
    }
}

async getCurrentUser(){
    try {
        console.log(this.account)
        return await this.account.get();
        // Logged in
    } catch (err) {
        // Not logged in
        console.log(err,"user not logged in");
    }
    return null
}
async logOut(){
    try {
       await this.account.deleteSessions();
    } catch (error) {
        console.log("logout error::",error);
    }
}

}

const authService=new AuthService();
export default authService