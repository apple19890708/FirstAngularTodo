import { TodoContentComponent } from './todo-content/todo-content.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoListResolver, TodoResolver } from 'src/app/@resolve/todo.resolver';

const routes: Routes = [
  { path: 'list', 
    component: TodoListComponent, 
    resolve: { dataList: TodoListResolver } 
  }, //resolve 預載資料
  {
    path: 'content/:id',
    children: [
      { 
        path: ':action', 
        component: TodoContentComponent, 
        resolve: { todoList: TodoResolver } 
      },
      { path: '', redirectTo: 'All', pathMatch: 'full' }
    ],
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
