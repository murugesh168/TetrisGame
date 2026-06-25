## Project Overview
TetrisGame is a React-based implementation of the classic Tetris game built with modern web technologies. It features an interactive game board, score tracking, and game controls.

## Key Features
- **React 19** - Latest React framework with hooks for state management
- **Vite** - Fast build tool for development and production
- **Game Logic** - Custom useGameLogic hook handling game mechanics
- **Components:**
  - Board - Displays the game grid
  - ScoreBoard - Shows current score and game status
  - Controls - Manages player input and game controls
- **Styling** - Organized CSS files for clean game UI
- **Hot Module Replacement (HMR)** - Fast refresh during development
- **ESLint Configuration** - Code quality enforcement

## Tech Stack
- **Frontend:** React 19.2.6
- **Build Tool:** Vite 8.0.12
- **Styling:** CSS
- **Development:** ESLint for code linting
- **Type Support:** TypeScript types included

## Live Demo
Play the game live: [tetrisgamer.netlify.app](https://tetrisgamer.netlify.app)

Project Structure
Code
├── src/
│   ├── App.jsx           # Main game component
│   ├── main.jsx          # React entry point
│   ├── components/       # Reusable game components
│   ├── hooks/            # Custom React hooks (useGameLogic)
│   └── styles/           # CSS styling
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
└── vite.config.js        # Vite configuration
Features in Development
The game includes real-time board updates, score tracking, and game-over detection via the useGameLogic hook that manages the core Tetris mechanics.
