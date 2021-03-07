
#%%
from newspaper import Article
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel

def get_article_text(url):
   article = Article(url)
   article.download()
   article.parse()
   return article.text

app = FastAPI()

class RequestUrl(BaseModel):
   url: str

class RequestRaw(BaseModel):
   body: str

class Cards(BaseModel):
   question: str
   answer: str

class Collection(BaseModel):
   cards: List[Cards] = []


@app.put("/cards/link/", response_model=Collection)
async def cards_link(item: RequestUrl):
   text = get_article_text(item.url)
   return {"cards": [{"question": "Why?", "answer": f"{text[:10]}"}]}

@app.put("/cards/raw", response_model=Collection)
async def cards_raw(item: RequestRaw):
   text = item.body
   return {"cards": [{"question": "Why?", "answer": f"{text[:10]}"}]}



# %%

