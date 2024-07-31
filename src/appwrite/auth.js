import conf from "../conf/conf.js";
import {Client,Account,ID} from "appwrite";
export class Authservice{
    client=new Client();
    account;
    constructor(){
        this.client
                .setEndpoint(conf.appwriteurl)
                .setProject(conf.appwriteprojectid);
        this.account=new Account(this.client)        
    }
    async createAccount({email,password,name}){
        try{
            const useraccount=await this.account.create(
                ID.unique(),email,password,name);
            if(useraccount)
                //call another method
                return this.login({email,password})
            else    return useraccount     
        }catch(error){
            throw error;
        }
    }
    async login({email,password}){
        try{
            const vari=await this.account.createEmailPasswordSession(email,password)
            return vari;
        }catch(error){
            throw error;
        }
    }
    async getcurrentuser(){
        try{
            const user= await this.account.get();
            return user;
        }catch(error){
           console.log("appwrite service :: getcurrentuser:: error",error);
        }
        return null; // problem in try catch
    }
    async logout(){
        try{
            await this.account.deleteSessions()
        }
        catch(error){
            console.log("appwrite service :: getcurrentuser:: error",error);
        
        }
    }

}
const authservice=new Authservice()

export default authservice