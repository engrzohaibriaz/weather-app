import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Add HttpClientModule here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  todos: Todo[] = [];
  error = '';
  newTodoTitle = '';
  newTodoCompleted = false; // ✅ new field


    apiUrl = (window as any).__env?.apiUrl || '/api/todo'; // dynamic URL
  //apiUrl = '/api/todo'; // via proxy.conf.json

  constructor(private http: HttpClient) {
    this.getTodos();
  }

  getTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: data => {
        this.todos = data;
        this.error = '';
      },
      error: err => {
        console.error('API call failed:', err);
        this.error = `Failed to load todos: ${err.message}`;
      }
    });
  }

  addTodo() {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Partial<Todo> = { title: this.newTodoTitle, isCompleted: false };
    this.http.post<Todo>(this.apiUrl, newTodo).subscribe({
      next: todo => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      },
      error: err => console.error('Add failed:', err)
    });
  }

  toggleTodo(todo: Todo) {
    const updated = { ...todo, isCompleted: !todo.isCompleted };
    this.http.put(`${this.apiUrl}/${todo.id}`, updated).subscribe({
      next: () => (todo.isCompleted = !todo.isCompleted),
      error: err => console.error('Update failed:', err)
    });
  }

  deleteTodo(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => (this.todos = this.todos.filter(t => t.id !== id)),
      error: err => console.error('Delete failed:', err)
    });
  }
}
