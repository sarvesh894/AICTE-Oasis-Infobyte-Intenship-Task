import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 h-12 text-base border-muted bg-card shadow-soft"
      />
      <Button 
        type="submit" 
        className="h-12 px-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
        disabled={!text.trim()}
      >
        <Plus className="h-5 w-5" />
        <span className="ml-1 hidden sm:inline">Add</span>
      </Button>
    </form>
  );
}