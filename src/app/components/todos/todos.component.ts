import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private TodoService:TodoService) { }

  ngOnInit() {
    this.TodoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {
    // Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from server
    this.TodoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    this.TodoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
