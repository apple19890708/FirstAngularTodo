import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/@services/todo.service';

@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.scss']
})
export class TodoContentComponent implements OnInit {
  title = 'OneTodo';
  constructor(private todoService: TodoService, private route: ActivatedRoute) { } // 注入route、todoService 

  ngOnInit() {
    this.todoService.todoDataList = [];
    this.route.data.subscribe(data => { // 透過ActivatedRoute 取得resolve資料 todoList
      this.todoService.todoDataList = data['todoList'];
      this.todoService.ready();
    });
    // this.route.paramMap.subscribe(data => { // 取得網址上的ID，訂閱的方式不會遇到同組件切ID不會更換內容問題
    //   this.todoService.gid = data.get('id') as string;
    //   this.todoService.getData(); 
    // }); // 改用resolve

    // this.todoService.gid = this.route.snapshot.paramMap.get('id') as string;
    // this.todoService.getData(); // 另一種取得網址ID方式，注意，會遇到同組件切ID部會更換內容問題

  }


}
