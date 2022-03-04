import { TodoSearchCriteria } from './model/TodoSearchCriteria';
import { TodoItem } from './model/TodoItem';
import { Injectable } from '@angular/core';
import { TodoPriority } from './model/TodoPriority';
import { TodoStatus } from './model/TodoStatus';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  items : TodoItem[] = [
    {
      id: Guid.create().toString(),
      title : 'Item 01',
      dateCreated : new Date(),
      priority : TodoPriority.Low,
      status : TodoStatus.NotCompleted
    },
    {
      id: Guid.create().toString(),
      title : 'Item 02',
      dateCreated : new Date(),
      priority : TodoPriority.Medium,
      status : TodoStatus.NotCompleted
    },
    {
      id: Guid.create().toString(),
      title : 'Item 03',
      dateCreated : new Date(),
      priority : TodoPriority.High,
      status : TodoStatus.Completed
    }
  ];

  constructor() { }

  saveItem(todo : TodoItem){
    if(todo.id === null || todo.id === undefined || todo.id.length === 0){
      todo.id = Guid.create().toString();
      this.items.push(todo);
    } else {
      const index = this.items.findIndex(i => i.id == todo.id);
      if(index >= 0){
        this.items[index] = todo;
      } else {
        this.items.push(todo);
      }
    }
  }

  loadAll(){
    return this.items;
  }

  searchTodos(criteria : TodoSearchCriteria){
    return this.items.filter( v => (criteria.title === undefined || v.title.toLowerCase().includes(criteria.title.toLowerCase())) &&
                                   (criteria.dateFrom === undefined || v.dateCreated.getTime() >= criteria.dateFrom.getTime()) &&
                                   (criteria.dateTo === undefined || v.dateCreated.getTime() <= criteria.dateTo.getTime()) &&
                                   (criteria.status === undefined || v.status === criteria.status) &&
                                   (criteria.priority === undefined || v.priority === criteria.priority));
  }

  deleteItem(id : string){
    const index = this.items.findIndex(i => i.id === id);
    this.items.splice(index, 1);
  }
}
