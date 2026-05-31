import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  newTodoTitle: string = "";
  todos: Todo[] = [];
  oneWayText: string = "text";

  get remainingCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos');
    this.todos = savedTodos ? JSON.parse(savedTodos) : [];
  }

  addTodo() {
    if (this.newTodoTitle.trim().length) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false
      };

      this.todos.push(newTodo);
      this.newTodoTitle = "";
      this.saveTodos();
    }
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

}
