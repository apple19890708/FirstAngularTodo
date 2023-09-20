import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/@models/group.model';
import { GroupApiService } from 'src/app/@services/group-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
  // providers: [], // 今天如果要裏面的變數被獨立使用，加入這個，不加的話變數會是共用的
})
export class TodoListComponent implements OnInit {
  dataList: Group[] = [];


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dataList = data['dataList'];
    });
  }

}
