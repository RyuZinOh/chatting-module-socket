from flask import Flask
from dotenv import load_dotenv
import os 
try:
    from extensions import socketio
except ImportError:
    import sys
    sys.path.append(os.path.dirname(__file__))
    from extensions import socketio
    
load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    from route.chat_route import chat_bp
    app.register_blueprint(chat_bp)

    socketio.init_app(app)

    return app

app = create_app()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080)
