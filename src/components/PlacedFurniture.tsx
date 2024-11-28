import React from 'react';
import { useDrag } from 'react-dnd';
import { Trash2, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FURNITURE_TEMPLATES } from '@/lib/constants';
import type { FurnitureItem } from '@/lib/types';

interface PlacedFurnitureProps {
  item: FurnitureItem;
  cellSize: number;
  onRotate: () => void;
  onResize: (id: string, deltaWidth: number, deltaHeight: number) => void;
  onDelete: () => void;
}

export function PlacedFurniture({ item, cellSize, onRotate, onResize, onDelete }: PlacedFurnitureProps) {
  const template = FURNITURE_TEMPLATES.find(t => t.id === item.type);

  const [{ isDragging }, drag] = useDrag({
    type: 'FURNITURE',
    item: { ...item, isPlaced: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (!template) return null;

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: `${item.x * cellSize}px`,
        top: `${item.y * cellSize}px`,
        width: `${item.width * cellSize}px`,
        height: `${item.height * cellSize}px`,
        backgroundColor: template.color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        border: '2px solid rgba(0,0,0,0.2)',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${item.rotation}deg)`,
        transformOrigin: 'center',
      }}
      className="group"
    >
      <span className="text-2xl select-none">{template.icon}</span>

      {/* Resize handle */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '10px',
          height: '10px',
          background: '#4299e1',
          cursor: 'se-resize',
          borderRadius: '2px',
        }}
        className="opacity-0 group-hover:opacity-100"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX;
          const startY = e.clientY;
          
          const handleMouseMove = (e: MouseEvent) => {
            const deltaX = Math.round((e.clientX - startX) / cellSize);
            const deltaY = Math.round((e.clientY - startY) / cellSize);
            onResize(item.id, deltaX, deltaY);
          };
          
          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };
          
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
      />

      {/* Controls */}
      <div className="absolute -top-8 left-0 hidden group-hover:flex gap-1">
        <Button
          variant="secondary"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            onRotate();
          }}
        >
          <RotateCw className="h-3 w-3" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}