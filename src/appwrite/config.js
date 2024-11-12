import {ID,Client,Databases,Storage, Query} from 'appwrite'
import conf from "../conf/conf"
class Service{
  client=new Client();
   database;
   storage;

   constructor (){

    this.client.setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
     this.databases=new Databases(this.client)
     this.storage=new Storage(this.client)
   }

   async addPost({title,slug,content,featuredImage,status,userId}){
    try {
        
       return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
          )
    } catch (error) {
        console.log("Appwrite errore::add post error::",error)
    }
     
   }

   async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
         )
         return true;
    } catch (error) {
        console.log("appwrite service:: delete post::error",error)
        return false
    }}

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {title,
                    content,
                    featuredImage,
                    status
                }                                                                                         
            )
            
        } catch (error) {
              console.log("appwrite service::update post::error",error)
        }
    }

    async getPost(slug){
        try {
         return  await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           ) 
        } catch (error) {
            console.log("appwrite service::get post::error",error)
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
          return  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("appwrite service::get posts::error",error)
        }
       
    }

    // file upload service
    async uploadFile(file){
        try {
          return  await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
           console.log("appwrite service:: upload file::error",error) 
           return false
        }
        
    }
    
    async getFilePreview(fileId){
        
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
}

async deleteFile(fileId){
    try {
        await this.storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        ) 
        return true;
    } catch (error) {
        console.log("appwrite service::delete file::error",error)
        return false;
    }
    
}


   
   }


const service=new Service()
export default service;