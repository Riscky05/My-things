export interface Plan {
  id: string;
  name: string;
  grid: boolean[][];
  furniture: FurnitureItem[];
}

export interface FurnitureItem {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
}

export interface FurnitureTemplate {
  id: string;
  name: string;
  icon: string;
  width: number;
  height: number;
  color: string;
}