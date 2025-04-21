from routers import meta
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import query, estimate

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
app.include_router(meta.router, prefix="/meta", tags=["meta"])
app.include_router(estimate.router, prefix="/estimate", tags=["estimate"])

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

