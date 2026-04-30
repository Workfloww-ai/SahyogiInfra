"""
Local development runner.
Run this file to start the backend on http://localhost:5001 during development.

Usage:
    python backend/app.py

For production, Vercel uses api/index.py directly as a serverless function.
"""
import sys
import os

# Allow importing from the project root
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.api.index import app

if __name__ == '__main__':
    app.run(debug=True, port=5001)
