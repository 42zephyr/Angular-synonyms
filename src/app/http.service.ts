import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

interface Synonym{
     word:string,  score?:number, tags?:string[]
}

@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    getData(){
        return this.http.get("assets/user.json")
    }
    getSyns(text:string): Observable<Synonym[]>{
        console.log("https://api.datamuse.com/words?ml="+text)
        return this.http.get<Synonym[]>("https://api.datamuse.com/words?ml="+text)

    }
}