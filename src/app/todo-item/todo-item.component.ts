import { TodoItem } from './../model/TodoItem';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCheckSquare, faTrashAlt, faPencilAlt, faSnowflake, faExclamationTriangle, faCloudSun, faSquare } from '@fortawesome/free-solid-svg-icons';
import { TodoStatus } from '../model/TodoStatus';
import { TodoPriority } from '../model/TodoPriority';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input('item') item : TodoItem;
  notCompletedIcon = faSquare;
  completedIcon = faCheckSquare;
  deleteIcon = faTrashAlt;
  editIcon = faPencilAlt;
  highPriorityIcon = faExclamationTriangle;
  mediumPriorityIcon = faCloudSun;
  lowPriorityIcon = faSnowflake;

  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editItem(){
    const copyItem = {...this.item};
    this.onEdit.emit(copyItem);
  }

  deleteItem(){
    this.onDelete.emit(this.item.id);
  }

  getStatusIcon(){
    if(this.item.status === TodoStatus.Completed){
      return this.completedIcon;
    }
    return this.notCompletedIcon;
  }

  getPriorityIcon(){
    if(this.item.priority === TodoPriority.High){
      return this.highPriorityIcon;
    } else if ( this.item.priority === TodoPriority.Medium){
      return this.mediumPriorityIcon;
    }
    return this.lowPriorityIcon;
  }

  toggleStatus(){
    if(this.item.status === TodoStatus.Completed){
      this.item.status = TodoStatus.NotCompleted;
    } else {
      this.item.status = TodoStatus.Completed;
    }
  }

}
