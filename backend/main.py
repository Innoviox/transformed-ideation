
# %%
from schemas import *
from fastapi.routing import APIRoute
from fastapi import FastAPI, File, UploadFile
from typing import Optional, List
from newspaper import Article
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel

from question_generation.pipelines import pipeline

# Utils

def get_article_text(url):
    article = Article(url)
    article.download()
    article.parse()
    return article.text.lower() # Convert to lowercase to reduce chance of mismatch

models = {}
app = FastAPI(title="Flashable")

# Initialize models
@app.on_event("startup")
def startup_event():
    models["basic"] = pipeline("question-generation")

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
    cards = models["basic"](text)
    print(cards)
    return FlashcardSet(flashcards=cards, source_text=text)


@app.get("/file", response_model=FlashcardSet)
def read_file(
        file: UploadFile = File(...)
):
    return FlashcardSet(flashcards=[], source_text="file")


@app.get("/link", response_model=FlashcardSet)
def read_link(
        url: str
):
    # Prevent mismatching bugs
    text = get_article_text(url)
    print(url)
    print(text)
    cards = models["basic"](text)
    return FlashcardSet(flashcards=cards, source_text=text)
