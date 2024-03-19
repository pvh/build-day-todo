interface TodoItem {
  text: string;
  done: boolean;
}

export interface TodoDoc {
  items: TodoItem[];
}
