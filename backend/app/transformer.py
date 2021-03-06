
#%%
from transformers import pipeline
import pathlib
from pathlib import Path
ROOT = Path("..")

with open(ROOT / "dataset" / "parsed" / "info_sys_1.txt") as f:
    lines = f.readlines()
    context = "".join(lines)


#%%
nlp = pipeline("question-answering")

#%%
result = nlp(question="What is driving innovation?", context=context)
print(f"Answer: '{result['answer']}', score: {round(result['score'], 4)}, start: {result['start']}, end: {result['end']}")
result = nlp(question="What is the age requirement for entrepreneurship?", context=context)
print(f"Answer: '{result['answer']}', score: {round(result['score'], 4)}, start: {result['start']}, end: {result['end']}")

result = nlp(question="What has changed in the last decade?", context=context)
print(f"Answer: '{result['answer']}', score: {round(result['score'], 4)}, start: {result['start']}, end: {result['end']}")
# %%
