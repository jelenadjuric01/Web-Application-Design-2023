
export default class Business {
    _id:string;
    agency: string;
    client: string;
    status:string;
    deadline:Date;
    rooms:number[];
    object:string;
    offer:number;
    dovoljno:boolean=false;
    cancelReason:string;
}
