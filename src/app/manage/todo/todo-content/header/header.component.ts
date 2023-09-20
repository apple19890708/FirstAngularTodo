import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/@services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() // 表示從父層取得的資料
  title!: string;// 是 TypeScript 中的非空断言操作符。它告诉编译器，这个变量肯定会在使用之前被初始化。这是一种告诉编译器不要进行严格的空值检查的方式
  todoInputModel = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }
  
  add() {
    this.todoService.add(this.todoInputModel);
    this.todoInputModel = '';
  }

}
