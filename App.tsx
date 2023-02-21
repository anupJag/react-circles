import * as React from 'react';
import './style.css';

type TPoint = {
  x: number;
  y: number;
};

export default function App() {
  const [points, setPoints] = React.useState<TPoint[]>([]);
  const [undoPoints, setUndoPoints] = React.useState<TPoint[]>([]);

  const handleAppClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setPoints((prevPoints) => [...prevPoints, { x: clientX, y: clientY }]);
  };

  const handleUndo = () => {
    const tempPoints = Array.from([...points]);

    if (!tempPoints.length) return;

    const undoPoint = tempPoints.pop();

    setPoints(tempPoints);
    setUndoPoints((prevPoint) => [...prevPoint, undoPoint]);
  };

  const handleRedo = () => {
    const tempPoints = Array.from([...undoPoints]);

    if (!tempPoints.length) return;

    const redoPoint = tempPoints.pop();

    setPoints((prevPoint) => [...prevPoint, redoPoint]);
    setUndoPoints(tempPoints);
  };

  return (
    <React.Fragment>
      <button onClick={handleUndo} style={{ zIndex: 1 }}>
        Undo
      </button>
      <button onClick={handleRedo} style={{ zIndex: 1 }}>
        Redo
      </button>
      <div className="app" onClick={handleAppClick}>
        {points.map((point, index) => (
          <div
            className="point"
            key={index}
            style={{ left: point.x, top: point.y }}
          ></div>
        ))}
      </div>
    </React.Fragment>
  );
}
