from typing import List

from pydantic import BaseModel


class Flashcard(BaseModel):
    question: str
    answer: str


class FlashcardSet(BaseModel):
    flashcards: List[Flashcard]
    source_text: str
