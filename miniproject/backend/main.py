import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import shodan


load_dotenv()
SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")

app = FastAPI()
shodan_client = shodan.Shodan(SHODAN_API_KEY)


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

class ShodanRequest(BaseModel):
    target: str

@app.post("/fastapi")
async def process_url(req: URLRequest):
    return {"processed_url": f"Processed: {req.url}"}

@app.post("/shodan_scan")
def shodan_scan(req: ShodanRequest):
    """Search Shodan for information on a given IP or domain."""
    try:
        result = shodan_client.host(req.target)
        return result  # Returns JSON with open ports, services, and vulnerabilities
    except shodan.APIError as e:
        raise HTTPException(status_code=500, detail=str(e))