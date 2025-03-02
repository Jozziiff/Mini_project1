from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# we do this to allow the frontend to make requests to the backend on different ports
# cause by default there are some security restrictions that prevent this

# Allow all origins (or specify a list of allowed origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

class URLRequest(BaseModel):
    url: str

@app.post("/fastapi")
async def process_url(request: URLRequest):
    return {"processed_url": f"Processed: {request.url}"}
