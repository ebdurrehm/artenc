import { context, ContractPromiseBatch, PersistentSet, u128 } from "near-sdk-as";
import { Article, generalArticle } from "./model";
import { checkData, checkDonation, checkOwner, findDonateableWriter,  returnMetaArticle,  useArticle } from "./utils";


@nearBindgen
export class Contract {
    //owner of the contract
  private CONTRACT_OWNER: string;
  //minumum amount what required for adding a new article to the BLOCKCHAIN 
  private MIN_FEE: u128 = u128.from("1000000000000000000000000"); //=1 NEAR

  //initialize the project and define the owner of the project
  //this owner is used  later to run administrative commands

  constructor(owner: string) {
    this.CONTRACT_OWNER = owner;
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
  // if the articles of the writers have minum views count(5), then send 3 NEAR to these writers' balance 
  sendNearToWriter(): string {
    //check whether the sender of the transaction is the owner of the contract
    checkOwner(context.sender, this.CONTRACT_OWNER);
    //find all writers who have five viewed articles
  let writers = findDonateableWriter();
  
  if (writers.length == 0) {
    return "there are no donateable writers to donate"
  }
  else {
    for (let i = 0; i < writers.length; i++) {
      const to_writer = ContractPromiseBatch.create(writers[i]);
      const donationAmount: u128 = u128.from("3000000000000000000000000");
      to_writer.transfer(donationAmount);
    }
    return `you donated these/this ${writers.toString()} writers/writer`
  }
}


  //viwe how many articles are in the blockchaine  
  getArticleSize(): i32 {
    return Articles.size;
  }

   //get current contract's balance
   getBalance(): u128 {
    const balance:u128 = u128.from(context.accountBalance);
    return balance;

  }

 


}


//define Articles container on the storage
export let Articles = new PersistentSet<Article>("a");