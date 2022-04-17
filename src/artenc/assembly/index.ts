import { context, ContractPromiseBatch, PersistentSet, u128 } from "near-sdk-as";
import { Article, generalArticle } from "./model";
import { checkData, checkDonation, checkOwner,  returnMetaArticle, update, findAuthorArticle } from "./utils";


@nearBindgen
export class Contract {
    //owner of the contract
  private CONTRACT_OWNER: string;
  //minumum amount what required for adding a new article to the BLOCKCHAIN 
  private MIN_FEE: u128 = u128.from("1000000000000000000000000"); //=1 NEAR
  amount:u128;
  //initialize the project and define the owner of the project
  //this owner is used  later to run administrative commands

  constructor(owner: string) {
    this.CONTRACT_OWNER = owner;
    this.amount =u128.Zero;
  }


  // add  new article to the contract
  // first check if user added required NEAR to context
  // check whether the data added
  //then create new Article object
  // check if the article object is already added or not. If article is not in the storage, then
  // add the new article to the storage
  add(url: string, title: string): string {
    const userDonation = context.attachedDeposit;
    checkDonation(userDonation, this.MIN_FEE);
    checkData(url, title);
    const article = new Article(url, title, context.sender);
    if (Articles.has(article)) {
      return "this article already added";
    }
    else {
      Articles.add(article);
      if (Articles.has(article)) {
        return "Project is added successfully";
      } else {
        return "something went wrong"
      }
    }
  }

  //donate the writer
  // if the writers have 5 article at least,and contract's users are used their articles, then send 2 NEAR to these writers' balance 
  private sendNearToWriter(amount:u128, author:string): string {
    
        const to_writer = ContractPromiseBatch.create(author);
        to_writer.transfer(amount);
      
      return `you donated these/this ${author} writers/writer`
    }
  


  //get current contract's balance
  getBalance(): u128 {
    const balance:u128 = u128.from(context.accountBalance);
    return balance;

  }


 

  //get all of the added articles without url property
  // because user views this article's title and sender 
  //and if user is interested with it then calls useArticle method 
  //then can see the url of the this article
  getArticles(): Array<generalArticle> {

    return returnMetaArticle();
  }


  // get specific article with its all data url, sender and title
//check whether writer has at least 5 articles
// then define properly amount and send this amount via sendNearToWriter method
 
  useArticle(author:string):Array<Article>{
    
    let authorArticles = findAuthorArticle(author);
     
      switch(authorArticles.length){
        case 5:
          this.amount =u128.from("2000000000000000000000000");
          break;
        case 10:
          this.amount = u128.from("4000000000000000000000000");
          break;
        case 15:
          this.amount = u128.from("6000000000000000000000000");
          break;
        case 20:
          this.amount = u128.from("8000000000000000000000000");
        default:
          this.amount = u128.Zero;
      }
      this.sendNearToWriter(this.amount, authorArticles[0].sender);
      return authorArticles
  }

 //find article by the id and update
   updateArticle(id:string, title?:string, url?:string):Array<Article>{
     checkDonation(context.attachedDeposit, this.MIN_FEE);
       let updatedArticle = update(id, title, url);
       return updatedArticle
   }




  //viwe how many articles are in the blockchaine  
  getArticleSize(): i32 {
    return Articles.size;
  }

  //delete article
  //check if the the sender of the transaction is owner of the contract
  // then delete the sender data from the storage
  deleteArticle(owner: string): string {

    checkOwner(context.sender,this.CONTRACT_OWNER);
    let article: Article;

    for (let i = 0; i < Articles.values().length; i++) {
      if (Articles.values()[i].sender == owner) {
        article = Articles.values()[i];
        Articles.delete(article);
        return `the ${owner} data deleted successfully`;
      }
    }
    return `the ${owner} has not article on the storage`


  }


}


//define Articles container on the storage
export let Articles = new PersistentSet<Article>("a");