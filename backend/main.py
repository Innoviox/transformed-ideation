from typing import Optional, List

from fastapi import FastAPI
from fastapi.routing import APIRoute
from schemas import *

app = FastAPI(title="Flashable")

# Docs at http://127.0.0.1:8000/docs

# origins = [
#     "http://localhost",
#     "http://localhost:8080",
# ]
#
# app.add_middleware(
#         CORSMiddleware,
#         allow_origins=origins,
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name

@app.get("/text", response_model=FlashcardSet)
def read_text(
        text: str
):
    return FlashcardSet(flashcards=[], source_text=text)

@app.get("/file", response_model=FlashcardSet)
def read_file(
        file: str
):
    return FlashcardSet(flashcards=[], source_text="file")

@app.get("/link", response_model=FlashcardSet)
def read_link(
        link: str
):
    return FlashcardSet(flashcards=[], source_text=link)