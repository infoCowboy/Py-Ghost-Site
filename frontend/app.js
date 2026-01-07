let xp = 0;
let unlockedTools = [];
let currentChallengeId = 1;
let ghostFound = false;
const toolNames = ['Flashlight', 'Thermal Detector', 'EMF Meter', 'Spirit Box', 'Ghost Trap'];

// Handle Run Code Button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('run-button').addEventListener('click', runCode);
    loadChallenge(currentChallengeId);
    drawScene();
});

async function loadChallenge(challengeId) {
    try {
        const response = await fetch(`http://localhost:8000/api/challenge/${challengeId}`);
        const challenge = await response.json();
        
        if (challenge.error) {
            console.error('Challenge not found');
            return;
        }
        
        // Update UI with challenge data
        document.getElementById('challenge-title').textContent = `🎓 ${challenge.title}`;
        document.getElementById('challenge-lesson').innerHTML = challenge.lesson;
        document.getElementById('challenge-hint').innerHTML = `💡 <strong>Hint:</strong> ${challenge.hint}`;
        
        // Load the template into the editor
        document.getElementById('code-editor').value = challenge.template;
        
        currentChallengeId = challengeId;
    } catch (error) {
        console.error('Error loading challenge:', error);
    }
}

async function runCode() {
    const codeEditor = document.getElementById('code-editor');
    const button = document.getElementById('run-button');
    const outputBox = document.getElementById('output-box');
    const code = codeEditor.value;
    
    button.disabled = true;
    button.textContent = '⏳ Running...';
    outputBox.textContent = 'Executing...';
    
    try {
        const response = await fetch('http://localhost:8000/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                code,
                challenge_id: currentChallengeId 
            }),
        });
        
        const data = await response.json();
        
        if (data.success) {
            outputBox.textContent = data.output;
            
            // Check if challenge was passed
            if (data.challenge_passed) {
                outputBox.textContent += `\n\n✅ CHALLENGE PASSED!\n🎉 Tool Unlocked: ${data.tool_unlocked}!\n🏆 Earned ${data.xp_reward} XP`;
                addXP(data.xp_reward);
                addTool(data.tool_unlocked);
                
                // If challenge 4 passed, reveal the ghost
                if (currentChallengeId === 4) {
                    ghostFound = true;
                    outputBox.textContent += `\n\n👻 THE GHOST HAS BEEN FOUND! 👻`;
                    setTimeout(() => {
                        drawScene();
                    }, 500);
                }
                
                // Move to next challenge after a delay
                setTimeout(() => {
                    loadChallenge(currentChallengeId + 1);
                }, 3000);
            } else if (currentChallengeId) {
                outputBox.textContent = `Incorrect code, please try again`;
            }
        } else {
            outputBox.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        outputBox.textContent = `Connection Error: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`;
    }
    
    button.disabled = false;
    button.textContent = '▶ Run Code';
}

function addXP(amount) {
    xp += amount;
    document.getElementById('xp-value').textContent = xp;
}

function addTool(toolName) {
    if (!unlockedTools.includes(toolName)) {
        unlockedTools.push(toolName);
        updateToolsDisplay();
        drawScene();
    }
}

function updateToolsDisplay() {
    document.getElementById('tools-count').textContent = unlockedTools.length;
    
    const toolsList = document.getElementById('tools-list');
    if (unlockedTools.length > 0) {
        toolsList.innerHTML = '<h4>Unlocked Tools:</h4><ul>' + 
            unlockedTools.map(tool => `<li>🔧 ${tool}</li>`).join('') + 
            '</ul>';
    }
}

// Draw the game scene
function drawScene() {
    const canvas = document.getElementById('scene-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = 900;
    canvas.height = 600;
    
    // For challenges 1-5, load the room image
    if (currentChallengeId >= 1 && currentChallengeId <= 5) {
        const sceneImg = new Image();
        sceneImg.onload = function() {
            // Draw scene background
            ctx.drawImage(sceneImg, 0, 0, 900, 600);
            
            // If ghost found, overlay ghost image on top
            if (ghostFound) {
                const ghostImg = new Image();
                ghostImg.onload = function() {
                    // Draw ghost centered with some position adjustment
                    ctx.drawImage(ghostImg, 150, 50, 600, 500);
                };
                ghostImg.onerror = function() {
                    console.error('Failed to load ghost image');
                };
                ghostImg.src = '../assets/room%20images/Ghost.jpg';
            }
            
            // Draw tools counter on top
            ctx.fillStyle = '#4ec9b0';
            ctx.font = 'bold 14px Arial';
            ctx.fillText(`Tools: ${unlockedTools.length}/5`, 30, canvas.height - 30);
        };
        sceneImg.onerror = function() {
            console.error('Failed to load scene image');
        };
        sceneImg.src = '../assets/room%20images/Scene-1.jpg';
    } else {
        // Draw room background for other challenges
        ctx.fillStyle = '#3d3d3d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw walls
        ctx.strokeStyle = '#2a2a2a';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
        
        // Draw some room furniture (placeholder)
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(50, 100, 100, 80);
        ctx.fillStyle = '#e0e0e0';
        ctx.font = '14px Arial';
        ctx.fillText('Desk', 70, 200);
        
        ctx.fillStyle = '#5a5a5a';
        ctx.fillRect(300, 150, 80, 120);
        ctx.fillStyle = '#e0e0e0';
        ctx.fillText('Cabinet', 310, 290);
        
        // Draw curtains
        ctx.fillStyle = '#4a3a3a';
        ctx.fillRect(canvas.width - 120, 40, 100, canvas.height - 80);
        
        // Draw some clues if tools are unlocked
        if (unlockedTools.length > 0) {
            ctx.fillStyle = '#ffff00';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('💛', 100, 250);
        }
        
        // Status text
        ctx.fillStyle = '#4ec9b0';
        ctx.font = '14px Arial';
        ctx.fillText(`Tools: ${unlockedTools.length}/5`, 30, canvas.height - 30);
    }
}

// Draw scene on load and when tools change
window.addEventListener('load', drawScene);
window.addEventListener('resize', drawScene);

// Redraw when tools unlock
const originalUnlockTool = unlockTool;
window.unlockTool = function(index) {
    originalUnlockTool(index);
    setTimeout(drawScene, 100);
};
