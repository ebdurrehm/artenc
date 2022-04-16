import { Article, generalArticle} from "./model";
import { Articles} from "./index";
import { u128 } from "near-sdk-as";

// get specific article with its all data url, sender and title
  // set increased point to the sender of this article 
  //this point is required criteria  to send near to the writers
export function useArticle(owner: string): Array<Article> {
    let findedArticles = new Array<Article>();
    for (let i = 0; i < Articles.size; i++) {
        if (Articles.values()[i].sender == owner) {
            const article = Articles.values()[i];
            article.increaseCount();
            Articles.delete(Articles.values()[i]);
            Articles.add(article);
            findedArticles.push(article);
        }
    }
    return findedArticles
}


// if the articles of the writers have minum views count(5), then send 3 NEAR to these writers' balance 
export function findDonateableWriter(): Array<string> {
    let writers = new Array<string>();
    for (let i = 0; i < Articles.values().length; i++) {
        if (Articles.values()[i].count >= 5) {
            writers.push(Articles.values()[i].sender);
        }
    }
    return writers;
}


// first check if user added required NEAR to context
export function checkDonation(donationAmount: u128, min_fee: u128): void {
    assert(donationAmount >= min_fee, "to add a new article to contract you must attach at least 1 near")
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
        metaArticles.push(new generalArticle(title, sender))
    }
    return metaArticles
}
