import React from 'react';
import './LearningContent.css';

const LearningContent: React.FC = () => {
  return (
    <div className="learning-content">
      <h3>🎓 Stage 1: Print Statements</h3>
      <p>
        <strong>Lesson:</strong> In Python, the <code>print()</code> function displays text to the screen.
      </p>
      <p>
        <strong>Usage:</strong> Type <code>print("your message here")</code> to show something.
      </p>
      <p>
        <strong>Challenge:</strong> Complete the code below to print a message that will help you find clues in the room!
      </p>
    </div>
  );
};

export default LearningContent;
