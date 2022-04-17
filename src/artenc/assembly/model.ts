// main article class
@nearBindgen
export class Article{
  url:string;
  title:string;
  sender: string;

  id:string 
  constructor(url:string, title:string, sender:string){
      this.url =url;
      this.sender = sender;
      this.title = title;
      //cannot create random UID AssemblyScript gives error
      this.id = this.title.slice(3)+'-'+this.sender.slice(0,2);
  }
 
}

// article class without url property
@nearBindgen
export class generalArticle{
  title:string;
  sender:string;
  id:string;
  constructor(title:string, sender:string,id:string){
      this.title=title;
      this.sender = sender;
      this.id=id
  }
}

