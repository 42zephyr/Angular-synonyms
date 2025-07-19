import { Component,Optional } from '@angular/core';
import {ChildComponent} from './child.component';
import {NgClass} from "@angular/common";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service";
import { Router,RouterOutlet, RouterLink,ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { Locale } from './lanInterface';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
@Component({
    selector: 'app-main',
    imports: [ChildComponent,NgClass,FormsModule,RouterLink,TranslocoModule],
    templateUrl: './main.component.html',
    styleUrl: './app.component.css',
      standalone: true,
})
export class MainComponent {
    title = 'Rhymes';

    public maintext:string='defaulttext';
    public defaultText:string='defaulttext';
    public length:number=0;
    public size:number=0;
    public lang:string="";
    public data:Locale={"lan":"",
    "defaulttext":"",
    "wordCounter":"",
    "letterCounter":"",
    "copy":"",
    "findSyns":""}
    ;
    private subscription: Subscription;
    number=12;
    constructor(@Optional() private dataService: DataService,private router: Router,private activatedRoute: ActivatedRoute,private translocoService: TranslocoService){
        this.subscription = activatedRoute.params.subscribe(params=>{
            this.lang=params["lang"];
            console.log(this.lang);
            this.translocoService.load(this.lang).subscribe(() => {
  this.translocoService.setActiveLang(this.lang);
  console.log('Translation test:', this.translocoService.translate('wordCounter'));
  if (this.maintext === this.defaultText) {
    console.log(this.lang)
    this.defaultText = this.translocoService.translate('defaulttext');
    this.maintext = this.defaultText;
  }
});
        });
    }
    copy(){
        navigator.clipboard.writeText(this.maintext);
    }
    goToUa(){
          this.router.navigate(['/syns/ua']);
    }
    showcase(){
    const  sh=document.getElementById("showcase") as HTMLInputElement|null;
    const  ma=document.getElementById("mainArea") as HTMLInputElement|null;

    if ( ma!==null) {
        this.maintext = ma.value;
        //console.log(this.defaultText);
        this.number=1-this.maintext.length/70;
        this.dataService.addData(this.maintext.length.toString())
        if (this.maintext.length!=0){
            const words=this.maintext.split(/[-|_|:| |,|;|:]/)
            const cleanwords=words.filter(word=>word.trim()!=='')
            //words.forEach((word)=>console.log(word, word==""))
            console.log(cleanwords)
            this.size=cleanwords.length
            const text=cleanwords.join('')
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