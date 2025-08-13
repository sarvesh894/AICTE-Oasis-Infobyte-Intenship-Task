import { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { Card } from '@/components/ui/card';

interface TodoSectionProps {
  title: string;
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoSection({ 
  title, 
  todos, 
  emptyMessage, 
  onToggle, 
  onUpdate, 
  onDelete 
}: TodoSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
        {title}
        <span className="text-sm font-normal text-muted-foreground bg-accent px-2 py-1 rounded-full">
          {todos.length}
        </span>
      </h2>
      
      {todos.length === 0 ? (
        <Card className="p-8 text-center bg-gradient-subtle border-border">
          <p className="text-muted-foreground text-base">{emptyMessage}</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}