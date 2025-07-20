import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface Synonym {
  word: string;
  score?: number;
  tags?: string[];
}

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get("assets/user.json");
  }

  getSyns(text: string, lan: string): Observable<Synonym[]> {
    if (lan !== "en") {
        return this.http.get<any>(`https://api.mymemory.translated.net/get?q=${text}&langpair=${lan}|en`).pipe(
          map(res => res.responseData.translatedText),
          switchMap(translated =>
            this.http.get<Synonym[]>(`https://api.datamuse.com/words?ml=${translated}`)
          ),
          switchMap(synonyms =>
            forkJoin(
              synonyms.slice(0, 15).map(s =>
                this.http.get<any>(`https://api.mymemory.translated.net/get?q=${s.word}&langpair=en|${lan}`).pipe(
                  map(res => ({ ...s, word: res.responseData.translatedText }))
                )
              )
            )
          )
        );

    } else {
      return this.http.get<Synonym[]>(`https://api.datamuse.com/words?ml=${text}`);
    }
  }
}
