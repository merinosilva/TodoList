import { TodoItem } from './../model/TodoItem';
import { TodoDataService } from './../todo-data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input('items') items : TodoItem[];
  @Output('onEditItem') onEditItem = new EventEmitter();
  @Output('onDeleteItem') onDeleteItem = new EventEmitter();

  constructor() { 
  }

  ngOnInit(): void {
  }

  onItemEditing(item:TodoItem){
    this.onEditItem.emit(item);
  }

  onItemDeleting(id:string){
    this.onDeleteItem.emit(id);
  }
}
