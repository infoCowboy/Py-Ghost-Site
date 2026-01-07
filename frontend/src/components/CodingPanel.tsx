import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './CodingPanel.css';
import LearningContent from './LearningContent';

interface CodingPanelProps {
  onChallengeComplete: (xp: number) => void;
}

const CodingPanel: React.FC<CodingPanelProps> = ({ onChallengeComplete }) => {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, Ghost Hunter!")');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRunCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      setOutput(data.output || data.error);
      if (data.success) {
        onChallengeComplete(10); // Default XP for completing a challenge
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="coding-panel">
      <LearningContent />
      <div className="editor-section">
        <h3>Code Editor</h3>
        <Editor
          height="300px"
          defaultLanguage="python"
          value={code}
          onChange={(value: string | undefined) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
          }}
        />
        <div className="editor-controls">
          <button 
            onClick={handleRunCode} 
            disabled={isLoading}
            className="run-button"
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>
      <div className="output-section">
        <h4>Output</h4>
        <div className="output-box">
          {output || 'Output will appear here...'}
        </div>
      </div>
    </div>
  );
};

export default CodingPanel;
