import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, List } from 'lucide-react';

interface TodoStatsProps {
  total: number;
  pending: number;
  completed: number;
}

export function TodoStats({ total, pending, completed }: TodoStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card className="p-4 bg-gradient-subtle border-border shadow-soft hover:shadow-glow transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <List className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold text-foreground">{total}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-subtle border-border shadow-soft hover:shadow-glow transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Clock className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-foreground">{pending}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-subtle border-border shadow-soft hover:shadow-glow transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-foreground">{completed}</p>
            <p className="text-xs text-muted-foreground">{completionRate}% done</p>
          </div>
        </div>
      </Card>
    </div>
  );
}