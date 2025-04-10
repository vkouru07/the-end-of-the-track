import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const ROWS = 7;
const COLS = 8;

const DraggablePiece = ({ id, piece }: { id: string; piece: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {piece}
    </div>
  );
};

const DroppableCell = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "64px",
        height: "64px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      {children}
    </div>
  );
};

const GameBoard = () => {
  const [pieces, setPieces] = useState<{ [key: string]: string }>({
    "0,0": "♟",
    "1,1": "♜",
    "2,2": "♞",
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const from = event.active.id.toString();
    const to = event.over?.id.toString();

    if (to && from !== to) {
      setPieces((prev) => {
        const updatedPieces = { ...prev };
        updatedPieces[to] = updatedPieces[from];
        delete updatedPieces[from];
        return updatedPieces;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 64px)`,
          gap: "4px",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {[...Array(ROWS * COLS)].map((_, i) => {
          const row = Math.floor(i / COLS);
          const col = i % COLS;
          const key = `${row},${col}`;
          return (
            <DroppableCell key={key} id={key}>
              {pieces[key] && <DraggablePiece id={key} piece={pieces[key]} />}
            </DroppableCell>
          );
        })}
      </div>
    </DndContext>
  );
};

export default GameBoard;
