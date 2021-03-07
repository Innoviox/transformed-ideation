from typing import Optional, List

from fastapi import FastAPI, File, UploadFile, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.routing import APIRoute
from schemas import *
from newspaper import Article
from fastapi.templating import Jinja2Templates

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

def get_article_text(url: str):
   article = Article(url)
   article.download()
   article.parse()
   return article.text

@app.get("/text", response_model=FlashcardSet)
def read_text(
        text: str
):
    return FlashcardSet(flashcards=[], source_text=text)

@app.get("/file", response_model=FlashcardSet)
def read_file(
        file: UploadFile = File(...)
):
    print("got file", file)
    return FlashcardSet(flashcards=[], source_text="file")

@app.get("/link", response_model=FlashcardSet)
def read_link(
        link: str
):
    text = get_article_text(url=link)
    print("got", link)
    return FlashcardSet(flashcards=[], source_text=text)

@app.get("/", response_class=HTMLResponse)
def read_main(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
