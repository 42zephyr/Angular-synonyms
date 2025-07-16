import { Component,Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChildComponent} from './child.component';
import {NgClass} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service";
@Component({
    selector: 'app-root',
    imports: [RouterOutlet,ChildComponent,NgClass,FormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'Rhymes';

    public maintext:string="Введіть текст";
    public length:number=0;
    public size:number=0;
    number=12;
    constructor(@Optional() private dataService: DataService){}
    showcase(){
    let sh=document.getElementById("showcase") as HTMLInputElement|null;
    let ma=document.getElementById("mainArea") as HTMLInputElement|null;
    if ( ma!==null) {
        this.maintext = ma.value;
        //console.log(this.defaultText);
        this.number=1-this.maintext.length/70;
        this.dataService.addData(this.maintext.length.toString())
        if (this.maintext.length!=0){
            let words=this.maintext.split(/[-|_|:| |,|;|:]/)
            let cleanwords=words.filter(word=>word.trim()!=='')
            //words.forEach((word)=>console.log(word, word==""))
            console.log(cleanwords)
            this.size=cleanwords.length
            let text=cleanwords.join('')
            console.log(text)
            this.length=text.length
        }
        else{
            this.length=0;
            this.size=0;
        }
    }
 }
}