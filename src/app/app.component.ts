import { TodoSortByColumn } from './model/TodoSortByColumn';
import { TodoEditModalComponent } from './todo-edit-modal/todo-edit-modal.component';
import { TodoSearchCriteria } from './model/TodoSearchCriteria';
import { TodoDataService } from './todo-data.service';
import { TodoItem } from './model/TodoItem';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoPriority } from './model/TodoPriority';
import { TodoStatus } from './model/TodoStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo(s)';
  items : TodoItem[];
  filterCollapsed : boolean = true;
  editItem : TodoItem;
  lastCriteria : TodoSearchCriteria;

  constructor(private dataService : TodoDataService, private modalService: NgbModal){
    this.items = dataService.loadAll();
  }

  toggleFilterCollapsed(){
    this.filterCollapsed = !this.filterCollapsed;
  }

  searchTodos(criteria : TodoSearchCriteria){
    this.items = this.dataService.searchTodos(criteria);
    this.lastCriteria = criteria;
  }

  openAddNew(){
    const modalRef = this.modalService.open(TodoEditModalComponent);
    (modalRef.componentInstance as TodoEditModalComponent).setItem({id:'', title:'', dateCreated: new Date(), priority:TodoPriority.Low, status:TodoStatus.NotCompleted });
    (modalRef.componentInstance as TodoEditModalComponent).setModalTitle('Add New Todo');
    modalRef.result.then((result) => {
      this.dataService.saveItem(result);
      this.refreshData();
    }, (reason) => {
    });
  }

    openEdit(item:TodoItem){
      const modalRef = this.modalService.open(TodoEditModalComponent);
      (modalRef.componentInstance as TodoEditModalComponent).setItem(item);
      (modalRef.componentInstance as TodoEditModalComponent).setModalTitle('Edit Todo');
      modalRef.result.then((result) => {
        this.dataService.saveItem(result);
        this.refreshData();
      }, (reason) => {
      });
    }

    deleteItem(id:string){
      this.dataService.deleteItem(id);
      this.refreshData();
    }

    refreshData(){
      if(this.lastCriteria === null || this.lastCriteria === undefined){
        this.items = this.dataService.loadAll();
      } else {
        this.items = this.dataService.searchTodos(this.lastCriteria);
      }
    }

    sortItems(col : TodoSortByColumn){
      switch(col){
        case TodoSortByColumn.Title:{
          this.items.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
          break;
        }
        case TodoSortByColumn.Date:{
          this.items.sort((a, b) => a.dateCreated > b.dateCreated ? 1 : -1);
          break;
        }
        case TodoSortByColumn.Priority:{
          this.items.sort((a, b) => a.priority > b.priority ? 1 : -1);
          break;
        }
        case TodoSortByColumn.Status:{
          this.items.sort((a, b) => a.status > b.status ? 1 : -1);
          break;
        }
      }
    }
}
