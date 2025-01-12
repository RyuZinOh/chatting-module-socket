from flask import Blueprint
from flask_cors import CORS
from service.chat_service import handle_message

chat_bp = Blueprint('chat', __name__)
CORS(chat_bp)

@chat_bp.route('/')
def index():
    return "Chat Backend Running"
