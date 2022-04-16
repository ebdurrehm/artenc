
// main article class
@nearBindgen
export class Article{
  url:string;
  title:string;
  sender: string;
  static lastCount:number =0;
  count:number;
  constructor(url:string, title:string, sender:string){
      this.url =url;
      this.sender = sender;
      this.title = title;
      this.count =0;
  }
  //increase count property value when the class object created
  // every time when the same writer adds a new article, this property is increased
    increaseCount():void{
       this.count = ++Article.lastCount;
  }
}

// article class without url property
@nearBindgen
export class generalArticle{
  title:string
  sender:string
  constructor(title:string, sender:string){
      this.title=title;
      this.sender = sender;
  }
}

