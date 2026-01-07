import React, { useEffect, useRef } from 'react';
import './ScenePanel.css';

interface ScenePanelProps {
  tools: string[];
}

const ScenePanel: React.FC<ScenePanelProps> = ({ tools }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw room background
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Draw some room furniture (placeholder)
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(50, 100, 100, 80);
    ctx.fillText('Desk', 80, 200);

    ctx.fillRect(300, 150, 80, 120);
    ctx.fillText('Cabinet', 310, 290);

    // Display available tools
    ctx.fillStyle = '#4ec9b0';
    ctx.font = '14px Arial';
    ctx.fillText(`Available Tools: ${tools.length || 'Complete challenges to unlock'}`, 50, canvas.height - 30);
  }, [tools]);

  return (
    <div className="scene-panel">
      <h3>🏚️ The Haunted Room</h3>
      <canvas ref={canvasRef} className="scene-canvas"></canvas>
      <div className="tools-display">
        {tools.length > 0 ? (
          <div>
            <h4>Unlocked Tools:</h4>
            <ul>
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Complete coding challenges to unlock tools for ghost hunting!</p>
        )}
      </div>
    </div>
  );
};

export default ScenePanel;
