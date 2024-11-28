import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  rows: number;
  cols: number;
  grid: boolean[][];
  onGridChange: (newGrid: boolean[][]) => void;
}

export function Grid({ rows, cols, grid, onGridChange }: GridProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<boolean | null>(null);

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    setDrawMode(!grid[row][col]);
    const newGrid = grid.map(row => [...row]);
    newGrid[row][col] = !grid[row][col];
    onGridChange(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing && drawMode !== null) {
      const newGrid = grid.map(row => [...row]);
      newGrid[row][col] = drawMode;
      onGridChange(newGrid);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setDrawMode(null);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div 
      className="grid border border-gray-300 dark:border-gray-600"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      onMouseLeave={() => setIsDrawing(false)}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onMouseDown={() => handleMouseDown(i, j)}
            onMouseEnter={() => handleMouseEnter(i, j)}
            className={cn(
              "w-8 h-8 select-none cursor-pointer border-r border-b border-gray-300 dark:border-gray-600 transition-colors duration-100",
              "last:border-r-0 [&:nth-child(10n)]:border-r-0",
              "[&:nth-child(n+91)]:border-b-0",
              cell ? "bg-gray-900 dark:bg-white" : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          />
        ))
      )}
    </div>
  );
}