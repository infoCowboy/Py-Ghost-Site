# Python Ghost Hunt

A gamified Python learning platform where players learn Python through challenges to hunt ghosts in haunted rooms.

## Project Structure

```
py-ghost-hunt/
├── frontend/          # React + TypeScript UI
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # FastAPI Python server
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Monaco Editor
- **Backend**: Python, FastAPI
- **Code Execution**: RestrictedPython (sandboxed)

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`

## Features

- Split-screen layout: coding challenges on left, game scene on right
- Python code editor with Monaco Editor
- Sandboxed code execution
- XP and tool unlock system
- 2D game scenes for ghost hunting
- Progressive learning stages
