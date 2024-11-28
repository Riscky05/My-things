import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskType } from '@/lib/constants';

interface TaskTypeDialogProps {
  onAddTaskType: (taskType: TaskType) => void;
}

export function TaskTypeDialog({ onAddTaskType }: TaskTypeDialogProps) {
  const [newType, setNewType] = useState('');
  const [color, setColor] = useState('blue');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (newType.trim()) {
      onAddTaskType({
        id: newType.toLowerCase().replace(/\s+/g, '-'),
        label: newType.trim(),
        icon: Plus,
        color,
      });
      setNewType('');
      setColor('blue');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task Type</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            placeholder="Task Type Name"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} className="w-full">
            Add Task Type
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}