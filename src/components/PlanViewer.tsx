import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SavedPlan } from './SavedPlan';
import type { Plan, FurnitureItem } from '@/lib/types';

interface PlanViewerProps {
  plan: Plan;
  onBack: () => void;
  onUpdateFurniture: (planId: string, furniture: FurnitureItem[]) => void;
}

export function PlanViewer({ plan, onBack, onUpdateFurniture }: PlanViewerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {plan.name}
          </h1>
        </div>
        
        <div className="scale-[2] origin-top-left">
          <SavedPlan
            plan={plan}
            onDelete={() => {}}
            onUpdateFurniture={onUpdateFurniture}
            cellSize={48}
            hideDelete
          />
        </div>
      </div>
    </div>
  );
}