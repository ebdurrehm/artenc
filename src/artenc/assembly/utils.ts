import { Article, generalArticle} from "./model";
import { Articles} from "./index";
import { context, u128 } from "near-sdk-as";



export function update(id:string, title?:string, url?:string):Array<Article>{
    let updatedArticle = new Array<Article>();
    for (let i = 0; i < Articles.size; i++) {
        if (Articles.values()[i].id == id) {
            assert(Articles.values()[i].sender == context.sender, "you are not the author of the this article")
            const article = Articles.values()[i];
            article.title = typeof title ==='string'?title:article.title;
           article.url= typeof url ==='string'?url:article.url;
            Articles.delete(Articles.values()[i]);
            Articles.add(article);
            updatedArticle.push(article);
        }
    }
    return updatedArticle
}




// first check if user added required NEAR to context
export function checkDonation(donationAmount: u128, min_fee: u128): void {
    assert(donationAmount >= min_fee, "to run this operation you must attach at least 1 near")
}

// check whether the data is added
export function checkData(url:string, title:string):void{
    assert(url.length > 0, "url length must greater than zero");
    assert(title.length > 0, "title length must greater than zero");
}

 //check whether the sender of the transaction is the owner of the contract
export function checkOwner(sender:string, CONTRACT_OWNER:string):void{
    assert(sender == CONTRACT_OWNER, "you are not the owner of the contract");
}


//get all of the added articles without url property
  // because user views this article's title and sender 
  //and if user is interested with it then calls useArticle method 
  //then can see the url of the this article
export function returnMetaArticle():Array<generalArticle>{
    let metaArticles = new Array<generalArticle>();
    for(let i=0; i<Articles.values().length;i++){
   
        let title:string = Articles.values()[i].title;
        let sender:string = Articles.values()[i].sender;
        let id:string = Articles.values()[i].id;
        metaArticles.push(new generalArticle(title, sender,id))
    }
    return metaArticles
}

export function findAuthorArticle(author:string):Array<Article>{
    let authorArticles = new Array<Article>();
    for(let i =0; i<Articles.size; i++){
      if(Articles.values()[i].sender == author){
         const article =Articles.values()[i];
        authorArticles.push(article);
      }
    }
    return authorArticles;
}
