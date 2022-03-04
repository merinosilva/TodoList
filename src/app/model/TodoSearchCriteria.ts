import { TodoPriority } from './TodoPriority';
import { TodoStatus } from './TodoStatus';


export interface TodoSearchCriteria{
    title : String,
    dateFrom : Date,
    dateTo : Date,
    status : TodoStatus,
    priority : TodoPriority
}