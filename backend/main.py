from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

import sys
from io import StringIO
from challenges import get_challenge, validate_output

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeExecutionRequest(BaseModel):
    code: str
    challenge_id: int = None


class CodeExecutionResponse(BaseModel):
    success: bool
    output: str = ""
    error: str = ""
    challenge_passed: bool = False
    tool_unlocked: Optional[str] = None
    xp_reward: int = 0


@app.post("/api/execute", response_model=CodeExecutionResponse)
async def execute_code(request: CodeExecutionRequest):
    """
    Execute Python code and optionally validate against a challenge.
    """
    try:
        # Capture output
        old_stdout = sys.stdout
        sys.stdout = captured_output = StringIO()
        
        # Create a safe execution environment with common builtins
        safe_globals = {
            '__builtins__': {
                'print': print,
                'len': len,
                'range': range,
                'str': str,
                'int': int,
                'float': float,
                'bool': bool,
                'list': list,
                'dict': dict,
                'tuple': tuple,
                'set': set,
                'sum': sum,
                'min': min,
                'max': max,
                'abs': abs,
                'round': round,
                'pow': pow,
                'sorted': sorted,
                'reversed': reversed,
                'enumerate': enumerate,
                'zip': zip,
                'map': map,
                'filter': filter,
                'divmod': divmod,
                'isinstance': isinstance,
                'type': type,
            },
            '__name__': '__main__',
        }
        
        # Execute the code
        exec(request.code, safe_globals)
        
        sys.stdout = old_stdout
        output = captured_output.getvalue()
        
        # Check if this is a challenge and validate
        challenge_passed = False
        tool_unlocked = None
        xp_reward = 0
        
        if request.challenge_id:
            challenge = get_challenge(request.challenge_id)
            if challenge:
                challenge_passed = validate_output(request.challenge_id, output)
                if challenge_passed:
                    tool_unlocked = challenge.get("tool_unlocked")
                    xp_reward = challenge.get("xp_reward", 0)
        
        return CodeExecutionResponse(
            success=True,
            output=output if output else "Code executed successfully!",
            challenge_passed=challenge_passed,
            tool_unlocked=tool_unlocked,
            xp_reward=xp_reward
        )
    
    except SyntaxError as e:
        sys.stdout = old_stdout
        return CodeExecutionResponse(success=False, error=f"Syntax Error: {str(e)}")
    except Exception as e:
        sys.stdout = old_stdout
        return CodeExecutionResponse(success=False, error=str(e))


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


@app.get("/api/challenge/{challenge_id}")
async def get_challenge_endpoint(challenge_id: int):
    """Get challenge data by ID"""
    challenge = get_challenge(challenge_id)
    if not challenge:
        return {"error": "Challenge not found"}
    return challenge


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
