import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-navbar',
  templateUrl: './todo-navbar.component.html',
  styleUrls: ['./todo-navbar.component.css']
})
export class TodoNavbarComponent implements OnInit {
  filterIcon = faFilter;

  constructor() { }

  ngOnInit(): void {
  }

}
