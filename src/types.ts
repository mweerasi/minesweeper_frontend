// src/types.ts

export interface BoardType {
    id: number;
    size: number;
    is_completed: boolean;
    success: boolean;
    cells: Cell[];
}

export interface Cell {
    id: number;
    is_revealed: boolean;
    is_flagged: boolean;
    state: number;
}

export interface CellsMap {
    [id: number]: Cell;
}