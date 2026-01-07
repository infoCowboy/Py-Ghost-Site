import React, { useState } from 'react';
import './GameScreen.css';
import CodingPanel from './CodingPanel';
import ScenePanel from './ScenePanel';

const GameScreen: React.FC = () => {
  const [xp, setXp] = useState(0);
  const [unlockedTools, setUnlockedTools] = useState<string[]>([]);

  const handleChallengeComplete = (xpGained: number) => {
    const newXp = xp + xpGained;
    setXp(newXp);
    // Tool unlock logic based on XP thresholds
    // Every 50 XP unlocks a new tool
    if (Math.floor(newXp / 50) > Math.floor(xp / 50)) {
      const toolNames = ['Flashlight', 'Thermal Detector', 'EMF Meter', 'Spirit Box', 'Ghost Trap'];
      const toolIndex = Math.floor(newXp / 50) - 1;
      if (toolIndex < toolNames.length && !unlockedTools.includes(toolNames[toolIndex])) {
        setUnlockedTools([...unlockedTools, toolNames[toolIndex]]);
      }
    }
  };

  return (
    <div className="game-screen">
      <div className="header">
        <h1>Python Ghost Hunt</h1>
        <div className="player-stats">
          <span className="xp">XP: {xp}</span>
          <span className="tools">Tools: {unlockedTools.length}</span>
        </div>
      </div>
      <div className="game-content">
        <CodingPanel onChallengeComplete={handleChallengeComplete} />
        <ScenePanel tools={unlockedTools} />
      </div>
    </div>
  );
};

export default GameScreen;
