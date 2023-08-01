import Door from "./door";

export default class Room {
    
    startX: number;
    startY:number;
    height:number;
    width:number;
    doors:Array<Door>;
    finished:boolean=false;
    constructor(){
        this.startX=this.startY=this.height=this.width=0;
        this.doors=[];
    }

}
