# real time  Chat Module
## Overview
a socket module  base  for user multiple chatting or real time connection for using in my other project

## Technology Usage
- **Backend**: Flask
- **Frontend**: React Vite

## How It Works
### Backend (Flask)

- **Extensions**: 
  - `extensions.py` initializes and manages SocketIO for real-time communication.
- **App Creation**: 
  - `app.py` creates and configures the Flask application with a blueprint for chat routes.
- **Service**: 
  - `chat_service.py` handles incoming messages and emits them to all connected clients. usage in    `chat_route.py`

### Frontend (React Vite)
- **SocketIO Connection**: 
  - The frontend connects to the backend using SocketIO to receive and send real-time messages.
- **Username Prompt**: 
  - Users are prompted to enter a unique username for their session, stored in session storage.
- **Message Display**: 
  - Messages display dynamically with the corresponding sender's username and user icon.


