import { useTodos } from '@/hooks/useTodos';
import { TodoInput } from '@/components/TodoInput';
import { TodoSection } from '@/components/TodoSection';
import { TodoStats } from '@/components/TodoStats';
import { CheckSquare } from 'lucide-react';

const Index = () => {
  const { 
    todos, 
    pendingTodos, 
    completedTodos, 
    addTodo, 
    toggleTodo, 
    updateTodo, 
    deleteTodo 
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Todo App
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay organized and productive with your daily tasks
          </p>
        </div>

        {/* Stats */}
        <TodoStats 
          total={todos.length}
          pending={pendingTodos.length}
          completed={completedTodos.length}
        />

        {/* Add Todo Input */}
        <TodoInput onAdd={addTodo} />

        {/* Pending Tasks */}
        <TodoSection
          title="📋 Pending Tasks"
          todos={pendingTodos}
          emptyMessage="No pending tasks! You're all caught up! 🎉"
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        {/* Completed Tasks */}
        <TodoSection
          title="✅ Completed Tasks"
          todos={completedTodos}
          emptyMessage="No completed tasks yet. Start checking off your list!"
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground text-sm">
          <p>Built with ❤️ using React and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
