import { Injectable } from '@angular/core';

    @Injectable({
        providedIn: 'root'
    })
export class DataService{
  
    private data: string[] = [ "Tom", "Bob",  "Sam"];
      
    getData(): string[] {
          
        return this.data;
    }
    addData(name: string){
          
        this.data.push(name);
    }
    removeData(point:number = -1){
        if (point>-1){
            delete this.data[point];
        }
        else{
            this.data.pop();
        }
    }
}