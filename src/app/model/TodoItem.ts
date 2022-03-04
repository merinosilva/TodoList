import { TodoPriority } from './TodoPriority';
import { TodoStatus } from './TodoStatus';

export interface TodoItem{
    id : String,
    title : String,
    dateCreated : Date,
    status : TodoStatus,
    priority : TodoPriority
}