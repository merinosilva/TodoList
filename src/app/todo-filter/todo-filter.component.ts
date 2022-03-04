import { TodoSortByColumn } from './../model/TodoSortByColumn';
import { TodoPriority } from './../model/TodoPriority';
import { TodoStatus } from './../model/TodoStatus';
import { TodoSearchCriteria } from './../model/TodoSearchCriteria';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  
  @ViewChild('datepicker') datepicker : any;
  calendarIcon = faCalendarAlt;

  @Output('onSearch') search = new EventEmitter();
  @Output('onAddNew') addNew = new EventEmitter();
  @Output('onSortItems') sortItems = new EventEmitter();

  title : "";
  priority : TodoPriority | null;
  status : TodoStatus | null;
  sortBy : TodoSortByColumn | null;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.datepicker.toggle();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  datePickerHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isDateInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isDateRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isDateInside(date) ||
        this.datePickerHovered(date);
  }

  validateDateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  fireSearch(){
    this.search.emit({
      title: this.title,
      dateFrom : this.fromDate === null || this.fromDate === undefined ? undefined : new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day),
      dateTo : this.toDate === null || this.toDate === undefined ? undefined : new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day),
      status: this.status === null || this.status === undefined ? undefined : this.status,
      priority: this.priority === null || this.priority === undefined ? undefined : this.priority
    });
  }

  addNewTodo(){
    this.addNew.emit();
  }

  getPriorityName(){
    if(this.priority === null || this.priority === undefined){
      return '--All--';
    }
    return TodoPriority[this.priority];
  }

  getStatusName(){
    if(this.status === null || this.status === undefined){
      return '--All--';
    }
    return TodoStatus[this.status];
  }

  getSortByName(){
    if(this.sortBy === null || this.sortBy === undefined){
      return 'None';
    }
    return TodoSortByColumn[this.sortBy];
  }

  sortTodos(col : TodoSortByColumn){
    this.sortBy = col;
    this.sortItems.emit(this.sortBy);
  }

}
