import { TodoStatus } from './../model/TodoStatus';
import { TodoPriority } from './../model/TodoPriority';
import { TodoItem } from './../model/TodoItem';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.css']
})
export class TodoEditModalComponent implements OnInit {

  editItem : TodoItem;
  modalTitle : string;

  constructor( private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  cancel(){
    this.modal.dismiss();
  }

  save(){
    this.modal.close(this.editItem);
  }

  setItem(item : TodoItem){
    this.editItem = item;
  }

  setModalTitle(val : string){
    this.modalTitle = val;
  }

  getPriorityName(){
    if(this.editItem.priority === null || this.editItem.priority === undefined){
      return '--All--';
    }
    return TodoPriority[this.editItem.priority];
  }

  getStatusName(){
    if(this.editItem.status === null || this.editItem.status === undefined){
      return '--All--';
    }
    return TodoStatus[this.editItem.status];
  }

}
