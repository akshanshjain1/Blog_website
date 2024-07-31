import conf from "../conf/conf";
import { Client,Databases,ID,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)  // bucket matlab storage

    }
    async createpost({title,slug,content,featuredimage,status,userid}){
        try{
            return await this.databases.createDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,  // document id should be unqui aldo ID.now can be used
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,
                }

            )
        }catch(error){
            console.log("appwrite :: createpost::error",error);
        }
    }
    async updatepost(slug,{title,content,featuredimage,status }/*this whole is object */){
        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    // jo update karna
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite :: updatepost::error",error);
            
        }
    }
    async deletepost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
            return true
        }
        catch(error){
            console.log("appwrite :: deletepost::error",error);
            return false
            
        }
    }
    //ek post lene ke liye
    async getpost(slug){
        try{
             return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug
            )
            
        }
        catch(error){
            console.log("appwrite :: getpost::error",error);
            return false
            
        }
    }
    // vo value jinka status active hai // queries is parameter
    async getposts(queries=[Query.equal("status","active")]){
            try{
                return await this.databases.listDocuments(
                    conf.appwritedatabaseid,
                    conf.appwritecollectionid,
                    queries,
                    

                )
            }catch(error){
                console.log("appwrite :: getposts::error",error);
                return false
            
            }
    }
    // file upload ki services
    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwritebucketid,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite :: uploadfile::error",error);
            return false
        }
    }
    async deletefile(fileid){
        try {
            return await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileid
            ) 
            return true
        } catch (error) {
            console.log("appwrite :: deletefile::error",error);
            return false
        }
    }
    getfilepreview(fileid){
        //this do not return any promise so no async await 
        return this.bucket.getFilePreview(conf.appwritebucketid,fileid)
    } 
}
const service=new Service()
export default service