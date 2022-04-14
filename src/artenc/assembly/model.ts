
@nearBindgen
export class Article{
  url:string;
  title:string;
  sender: string;

  constructor(url:string, title:string, sender:string){
      this.url =url;
      this.sender = sender;
      this.title = title;
      
  }

  // private createRandomId():string{
  //   const id:string = Math.random().toString(36).slice(3);
  //   return id;
  // }
}
