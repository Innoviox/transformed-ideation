
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.routing import APIRoute
from schemas import *
from fastapi.routing import APIRoute
from fastapi import FastAPI, File, UploadFile
from typing import Optional, List
from newspaper import Article

from pydantic import BaseModel

from pipelines import qg_pipeline as pipeline
from fastapi.templating import Jinja2Templates

from readFromFile import read

# Utils

def get_article_text(url):
    article = Article(url)
    article.download()
    article.parse()
    return article.text# Convert to lowercase to reduce chance of mismatch

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

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

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
    cards = models["basic"](text.lower())
    print(cards)
    return FlashcardSet(flashcards=cards, source_text=text)


@app.get("/file", response_model=FlashcardSet)
def read_file(
        file: UploadFile = File(...)
):
    text = read(file)
    print("got file", file)
    print(text)
    return FlashcardSet(flashcards=[], source_text=text)


@app.get("/link", response_model=FlashcardSet)
def read_link(
        url: str
):
    # Prevent mismatching bugs
    text = get_article_text(url).lower()
    print(url)
    print(text)
    cards = models["basic"](text)
    return FlashcardSet(flashcards=cards, source_text=text)
