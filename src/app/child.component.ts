import { Input,Output,EventEmitter,Component, input,OnInit } from "@angular/core";
import { CommonModule } from '@angular/common'; 
import { HttpClient} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service";
import {HttpService} from "./http.service";
import {User} from "./user";
import {Synonym} from "./synonym";
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'child-comp',
    standalone: true,
    imports:[FormsModule,CommonModule,TranslocoModule],
    providers:[HttpService],
    templateUrl: './child.component.html'
})
export class ChildComponent implements OnInit{
    @Input() visibility: number = 100;
    @Input() length:number=0;
    @Input() size:number=0;
    @Input() mainText: string = '';
    @Input() selectionStart:string='';
    @Input() selectionEnd:string='';
    @Input() lang:string='';
    @Output() mainTextChange = new EventEmitter<string>();
    user: User | undefined;
    mode:boolean=true;
    syns:Synonym[]=[];
    word:string="";
    words:string[]=[];
    updateModel(newVal: string) {
        this.mainText = newVal;
        this.mainTextChange.emit(newVal);
    }
    dataText:string;
    constructor(private dataService: DataService,private httpService: HttpService,private translocoService: TranslocoService) {
        this.dataText = this.dataService.getData().join(", ");

    }

    find(){
        const selection=window.getSelection();
        if(selection){
        const text = selection.toString();
        console.log(typeof(text))
        this.httpService.getSyns(text).subscribe({next: (data: any) => {this.syns=data; console.log(this.user); console.log(this.syns,"syns");}}); 
        this.word=selection.toString()
        console.log(this.word)
        this.words=[this.word]
        }
    }
    ngOnInit(){
        this.translocoService.setActiveLang(this.lang);

        //this.httpService.getData().subscribe({next:(data:any) => this.user=new User(data.name, data.age)});
    }
    changeMode(){
        this.mode=!this.mode
    }
    replace(syn:string){
      if(this.mode){
        this.replaceMode1(syn)
      }
      else{
        this.replaceMode2(syn)
      }
    }
    replaceMode1(syn:string){
        const textarea = document.getElementById("mainArea") as HTMLTextAreaElement | null;
        console.log(textarea)
        if (textarea) {
            if(this.words.indexOf(textarea.value.substring(textarea.selectionStart,textarea.selectionEnd))!=-1){
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                console.log(textarea.selectionStart,textarea.selectionEnd)
                this.mainText =textarea.value=textarea.value.substring(0, start) +syn + textarea.value.substring(end);
                console.log(this.mainText,textarea.value)
                this.words.push(syn)
              }
        } 
    }
    replaceMode2(syn:string){
                //console.log(syn,this.word)
                //console.log(this.mainText)
                //console.log(this.mainText.indexOf(this.word))
        console.log(this.words)
        for(const used of this.words){
            console.log(used,this.mainText.indexOf(used),this.mainText.indexOf(used)!==-1)
            console.log(used,syn)
            this.mainText=this.mainText.replaceAll(used,syn)
            console.log(used)
        }
        this.words.push(syn)
        this.updateModel(this.mainText)
        console.log(this.words)
    }
}