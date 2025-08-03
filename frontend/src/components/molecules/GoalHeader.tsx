'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateGoal } from '@/hooks/crud/useGoals';
import { useState } from 'react';
import { toast } from 'sonner';
import { CategoryIcon } from '../atoms/CategoryIcon';

interface GoalHeaderProps {
  id: string;
  title: string;
  deadline: string;
  category: 'savings' | 'investment' | 'debt' | 'purchase';
  currentAmount: number;
  targetAmount: number;
}

export const GoalHeader: React.FC<GoalHeaderProps> = ({
  id,
  title,
  deadline,
  category,
  currentAmount,
  targetAmount,
}) => {
  const { updateGoal, isLoading } = useUpdateGoal();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');

  const handleUpdate = async () => {
    const sum = parseFloat(amount);
    if (isNaN(sum)) {
      toast.error('Please enter a valid number');
      return;
    }

    const current = parseFloat(currentAmount.toString());

    await updateGoal(id, {
      currentAmount: current + sum,
    });

    toast.success('Goal updated successfully');
    setOpen(false);
    setAmount('');
  };

  return (
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <CategoryIcon category={category} />
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">until {deadline}</p>
        </div>
      </div>

      {/* Button + Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Add Amount
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Goal</DialogTitle>
            <DialogDescription>Enter the amount you want to add to this goal.</DialogDescription>
          </DialogHeader>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
