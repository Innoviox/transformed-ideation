import pdftotext
from docx import Document
import re

def read(file):
    mimetype = file.content_type
    if mimetype == "application/pdf" or mimetype == "application/x-pdf":
        with file.file as f:
            pdfReader = pdftotext.PDF(f)
            return remNewline(" ".join(pdfReader))
    elif mimetype == "application/msword" or mimetype == "application/octet-stream"\
        or mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        with file.file as f:
            docReader = Document(f)
            content = []
            for p in docReader.paragraphs:
                content.append(p.text)
            return ' '.join(content)
    elif mimetype == "text/plain":
        with file.file as f:
            return f.read()
    else:
        print("File type", mimetype, "not recognized.")

def remNewline(text):
    remHyphenated = re.sub("-(?:\\n|\\f)", "", text)
    remNew = re.sub("(?<!-)(?:\\n|\\f)", " ", remHyphenated)
    return remNew
