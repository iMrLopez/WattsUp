from pydantic import BaseModel

class FactInput(BaseModel):
    fact: str