# Collaborative Task Management App

A real-time collaborative task management application built with React, Redux, and WebSocket.

## Features

- User Management (Mocked authentication)
- Task Creation and Assignment
- Real-time Task Status Updates
- Task Filtering
- Responsive UI built with Tailwind CSS

## Tech Stack

- React
- Redux & Redux Saga
- WebSocket for real-time updates
- Tailwind CSS for styling
- Jest for unit testing

## Prerequisites

- Node.js (v14 or later)
- npm 

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/sh-tajdini/Task-Manager.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the WebSocket server:
   ```
   cd Deskree/src
   node server.js
   ```

4. In a new terminal, start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Login Credentials

Use the following credentials to log in:

- Username: shervin
- Password: shervin123

## Running Tests

To run the unit tests:
```
npm run test
```

## Project Structure

```
src/
├── components/
├── hooks/
├── reducers/
│   ├── Task/
│   └── Users/
├── sagas/
├── utils/
├── schema
├── __tests__
├── App.tsx
├── store.ts
├── server.js
└── index.js
```

## Key Architectural Decisions

1. **State Management**: I use Redux for global state management, with Redux Saga for handling side effects and asynchronous operations.

2. **Real-time Updates**: WebSocket is implemented for real-time collaboration, ensuring instant updates across all active users.

3. **Custom Hooks**: I've created custom hooks to abstract business logic, such as task management and WebSocket connections.

4. **Performance Optimizations**: React.memo, useMemo, and useCallback are utilized to prevent unnecessary re-renders and optimize performance.

5. **Responsive Design**: Tailwind CSS is used to create a responsive layout that works well on mobile, tablet, and desktop views.

## Deployment

The app is deployed on Netlify. You can view the live demo at [https://shervintaskmanager.netlify.app/].
