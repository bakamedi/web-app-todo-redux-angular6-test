import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Bailar');
const todo2 = new Todo('Lavar Platos');
todo2.completado = true;
const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer( state = estadoInicial, action: fromTodo.Acciones): Todo[] {
  switch (action.type) {
    case fromTodo.AGREGAR_TODO:

      const todo = new Todo(action.texto);
      return [ ...state, todo ];

    case fromTodo.TOGGLE_TODO:

      return state.map(todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            completado: !todoEdit.completado
          };
        } else {
          return todoEdit;
        }
      });

    case fromTodo.EDITAR_TODO:
      return state.map( todoEdit => {
        if (todoEdit.id === action.id) {
          return {
            ...todoEdit,
            texto: action.texto.charAt(0).toUpperCase() + action.texto.slice(1)
          };
        } else {
          return todoEdit;
        }
      });

    case fromTodo.ELIMINAR_TODO:

      return state.filter(todoEdit => todoEdit.id !== action.id);

    case fromTodo.ELIMINAR_ALL_TODO:

      return state.filter(todoEdit => !todoEdit.completado );

    case fromTodo.TOGGLE_ALL_TODO:

      return state.map( todoEdit => {
        return {
          ...todoEdit,
          completado: action.completado
        };
      });

    default:
      return state;
  }
}
