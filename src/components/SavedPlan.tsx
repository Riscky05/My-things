import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlacedFurniture } from './PlacedFurniture';
import type { Plan, FurnitureItem } from '@/lib/types';
import { FURNITURE_TEMPLATES } from '@/lib/constants';

interface SavedPlanProps {
  plan: Plan;
  onDelete: (id: string) => void;
  onUpdateFurniture: (planId: string, furniture: FurnitureItem[]) => void;
  cellSize?: number;
  hideDelete?: boolean;
}

export function SavedPlan({ 
  plan, 
  onDelete, 
  onUpdateFurniture, 
  cellSize = 24,
  hideDelete = false 
}: SavedPlanProps) {
  const getBoundaries = () => {
    let minRow = plan.grid.length;
    let maxRow = 0;
    let minCol = plan.grid[0].length;
    let maxCol = 0;

    plan.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          minRow = Math.min(minRow, i);
          maxRow = Math.max(maxRow, i);
          minCol = Math.min(minCol, j);
          maxCol = Math.max(maxCol, j);
        }
      });
    });

    return { minRow, maxRow, minCol, maxCol };
  };

  const { minRow, maxRow, minCol, maxCol } = getBoundaries();
  const trimmedGrid = plan.grid
    .slice(minRow, maxRow + 1)
    .map(row => row.slice(minCol, maxCol + 1));

  const isValidPosition = (x: number, y: number, width: number, height: number): boolean => {
    if (x < 0 || y < 0 || 
        x + width > trimmedGrid[0].length || 
        y + height > trimmedGrid.length) {
      return false;
    }

    // Check if all cells in the target area are selected (black)
    for (let i = y; i < y + height; i++) {
      for (let j = x; j < x + width; j++) {
        if (!trimmedGrid[i]?.[j]) {
          return false;
        }
      }
    }

    return true;
  };

  const [, drop] = useDrop({
    accept: 'FURNITURE',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const dropTarget = document.getElementById(`plan-${plan.id}`);
      
      if (!offset || !dropTarget) return;

      const dropTargetRect = dropTarget.getBoundingClientRect();
      const x = Math.floor((offset.x - dropTargetRect.left) / cellSize);
      const y = Math.floor((offset.y - dropTargetRect.top) / cellSize);

      const template = FURNITURE_TEMPLATES.find(t => t.id === item.type);
      if (!template) return;

      const width = item.width || template.width;
      const height = item.height || template.height;

      if (!isValidPosition(x, y, width, height)) return;

      if (item.isPlaced) {
        const updatedFurniture = plan.furniture.map(f => 
          f.id === item.id ? { ...f, x, y } : f
        );
        onUpdateFurniture(plan.id, updatedFurniture);
      } else {
        const newFurniture: FurnitureItem = {
          id: `${template.id}-${Date.now()}`,
          type: template.id,
          x,
          y,
          width: template.width,
          height: template.height,
          rotation: 0
        };
        onUpdateFurniture(plan.id, [...plan.furniture, newFurniture]);
      }
    }
  });

  const handleRotate = (furnitureId: string) => {
    const updatedFurniture = plan.furniture.map(item => {
      if (item.id === furnitureId) {
        const newRotation = (item.rotation + 90) % 360;
        // Swap width and height for rotation
        const newWidth = item.height;
        const newHeight = item.width;
        
        if (!isValidPosition(item.x, item.y, newWidth, newHeight)) {
          return item;
        }

        return {
          ...item,
          rotation: newRotation,
          width: newWidth,
          height: newHeight
        };
      }
      return item;
    });
    onUpdateFurniture(plan.id, updatedFurniture);
  };

  const handleResize = (furnitureId: string, deltaWidth: number, deltaHeight: number) => {
    const updatedFurniture = plan.furniture.map(item => {
      if (item.id === furnitureId) {
        const newWidth = Math.max(1, item.width + deltaWidth);
        const newHeight = Math.max(1, item.height + deltaHeight);

        if (!isValidPosition(item.x, item.y, newWidth, newHeight)) {
          return item;
        }

        return {
          ...item,
          width: newWidth,
          height: newHeight
        };
      }
      return item;
    });
    onUpdateFurniture(plan.id, updatedFurniture);
  };

  const handleDelete = (furnitureId: string) => {
    const updatedFurniture = plan.furniture.filter(item => item.id !== furnitureId);
    onUpdateFurniture(plan.id, updatedFurniture);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        {!hideDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(plan.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        )}
      </div>
      <div 
        ref={drop}
        id={`plan-${plan.id}`}
        className="relative"
        style={{
          width: `${trimmedGrid[0].length * cellSize}px`,
          height: `${trimmedGrid.length * cellSize}px`,
        }}
      >
        <div 
          className="grid border border-gray-300 dark:border-gray-600"
          style={{
            gridTemplateColumns: `repeat(${trimmedGrid[0].length}, minmax(0, 1fr))`,
          }}
        >
          {trimmedGrid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
                className={`border-r border-b border-gray-300 dark:border-gray-600 
                  ${cell ? 'bg-gray-900 dark:bg-white' : 'bg-white dark:bg-gray-800'}`}
              />
            ))
          )}
        </div>
        {plan.furniture?.map((item) => (
          <PlacedFurniture
            key={item.id}
            item={item}
            cellSize={cellSize}
            onRotate={() => handleRotate(item.id)}
            onResize={handleResize}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </Card>
  );
}