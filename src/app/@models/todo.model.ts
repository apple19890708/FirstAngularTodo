export interface Todo {
    Status: boolean;
    Thing: string;
    Editing: boolean;
    TodoId: string;
    CanEdit: boolean;
    Seqno: number;
    CreateTime: Date;
    AccountId?: string;
    GroupId?: string;
}
// 正式環境 interface 不會打包進去，資料如果不需做處理選擇interface

export class TodoClass implements Todo {
    Status: boolean;
    Thing: string;
    Editing: boolean;
    TodoId: string;
    CanEdit: boolean;
    Seqno: number;
    CreateTime: Date;

    constructor(_thing: string, _status: boolean = false, _seqno: number) {
        this.Thing = _thing;
        this.Status = _status;
        this.Editing = false;
        this.TodoId = '';
        this.CanEdit = false;
        this.Seqno = _seqno;
        this.CreateTime = new Date();
    }

    toggle() {
        this.Status = !this.Status;
    }
}
// 正式環境 class 會打包進去並轉成對應語法，資料需額外做轉換選擇class

export enum TodoStatusType {
    All,
    Active,
    Completed
}