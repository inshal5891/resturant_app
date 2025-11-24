# Instructions for Backend Developer: Fixing CORS Issue

## Problem: `TypeError: Failed to fetch` (CORS Error)

Your frontend application is encountering a `TypeError: Failed to fetch` when trying to communicate with the backend API. This error occurs in the browser's console and indicates that the browser is blocking the request due to a **Cross-Origin Resource Sharing (CORS)** policy.

This is a security mechanism: your frontend (e.g., running on `http://localhost:3000` or a deployed domain) is trying to access resources from a different origin (your backend API, e.g., `https://restuarnt-manegment-production.up.railway.app`). By default, browsers prevent this unless the backend explicitly allows it.

## Solution: Configure CORS on the Backend Server

To resolve this, your backend server needs to be configured to send the appropriate `Access-Control-Allow-Origin` HTTP headers in its responses. This tells the browser which frontend origins are permitted to make requests.

Based on the `openapi.json` and typical FastAPI deployments, your backend is likely built with **FastAPI**. You can enable CORS by adding the `CORSMiddleware` to your FastAPI application.

### Steps to Implement in FastAPI:

1.  **Import `CORSMiddleware`**: Ensure `fastapi.middleware.cors.CORSMiddleware` is imported.
2.  **Define Allowed Origins**: Create a list of origins (your frontend URLs) that should be allowed to access your API.
3.  **Add Middleware**: Add the `CORSMiddleware` to your FastAPI application with the correct configuration.

Here's an example of the code you would add to your main FastAPI application file (e.g., `main.py`):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- IMPORTANT: Configure this list with your frontend's actual URLs ---
# This list should include all origins that are allowed to make requests to your backend.
# For local development, 'http://localhost:3000' (or whatever port your frontend runs on)
# is usually needed.
# For deployed frontends, add their production URLs (e.g., 'https://your-frontend-domain.com').
origins = [
    "http://localhost",
    "http://localhost:3000",  # Your local frontend development server
    # Add your deployed frontend's URL here, for example:
    # "https://your-restaurant-frontend.vercel.app",
    # "https://your-restaurant-frontend.com",
    # Replace the above with the actual domain where your frontend is hosted.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,              # Specifies the allowed origins
    allow_credentials=True,             # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],                # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],                # Allow all HTTP headers
)

# --- Your existing FastAPI routes and other application logic follow below ---
@app.get("/")
async def root():
    return {"message": "Hello World"}

# ... other routes like /order, /orders, etc. ...
```

### After Making Changes:

*   **Restart the Backend Server**: After adding or modifying the `CORSMiddleware` configuration, you **must restart your backend server** for the changes to take effect.

Once these changes are deployed on the backend, your frontend should be able to communicate with the API without encountering the `TypeError: Failed to fetch` CORS error.
