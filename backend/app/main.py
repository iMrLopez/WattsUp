from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import query, cars

app = FastAPI(title="My FastAPI App")

# Configure CORS using settings from config.py.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers.
app.include_router(query.router, prefix="/query", tags=["query"])
app.include_router(cars.router, prefix="/cars", tags=["cars"])

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
