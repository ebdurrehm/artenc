import { context, ContractPromiseBatch, PersistentMap, PersistentSet, PersistentVector, storage, u128 } from "near-sdk-as";
import { Article } from "./model";



@nearBindgen
export class Contract {
  owner: string = context.sender;
  // add  new article to the contract
  add(url: string, title: string): string {
    assert(url.length > 0, "url length must greater than zero");
    assert(title.length > 0, "title length must greater than zero");
    // Articles.push(new Article(url,title, context.predecessor));
    //articlesArr.push(new Article(url,title, context.predecessor));
    const article = new Article(url, title, context.predecessor);
    Articles.add(article);
    if (Articles.has(article)) {
      return "Project is added successfully";
    } else {
      return "this article already added"
    }

  }



}


//define Articles container on the storage
let Articles = new PersistentSet<Article>("a");