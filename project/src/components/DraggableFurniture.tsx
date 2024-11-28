import React from 'react';
import { useDrag } from 'react-dnd';
import { Card } from "@/components/ui/card";
import type { FurnitureTemplate } from '@/lib/types';

interface DraggableFurnitureProps {
  template: FurnitureTemplate;
}

export function DraggableFurniture({ template }: DraggableFurnitureProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'FURNITURE',
    item: { type: template.id, width: template.width, height: template.height },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      className="p-4 cursor-move hover:shadow-lg transition-shadow"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: template.color,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{template.icon}</span>
        <span className="text-sm font-medium">{template.name}</span>
      </div>
    </Card>
  );
}