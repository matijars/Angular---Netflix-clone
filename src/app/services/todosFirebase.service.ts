import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TodoInterface } from '../interfaces/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodosFirebaseService {
  firestore = inject(Firestore);
  todosCollection = collection(this.firestore, 'todos');

  getTodos(): Observable<TodoInterface[]> {
    return collectionData(this.todosCollection, {
      idField: 'id',
    }) as Observable<TodoInterface[]>;
  }
}
