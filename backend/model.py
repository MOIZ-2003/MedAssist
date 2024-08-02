from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.prompts import PromptTemplate
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import CTransformers
from langchain.chains import RetrievalQA
from langchain.memory import ConversationBufferMemory
import chainlit as cl

app = FastAPI()

# Allow CORS for all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FAISS_PATH = 'vectorstore/db_faiss_combine'

custom_prompt_template = """Use the following pieces of information to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.

Context: {context}
Question: {question}

Only return the helpful answer below and nothing else.
Helpful answer:
"""

def set_custom_prompt():
    """
    Prompt template for QA retrieval for each vectorstore
    """
    prompt = PromptTemplate(template=custom_prompt_template,
                            input_variables=['context', 'question'])
    return prompt

# Retrieval QA Chain
def retrieval_qa_chain(llm, prompt, db):
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    qa_chain = RetrievalQA.from_chain_type(llm=llm,
                                       chain_type='stuff',
                                       retriever=db.as_retriever(search_kwargs={'k': 2}),
                                       #return_source_documents=True,
                                       memory=memory,
                                       chain_type_kwargs={'prompt': prompt}
                                       )
    return qa_chain

# Loading the model
def load_llm():
    # Load the locally downloaded model here
    llm = CTransformers(
        model = "model/",
        model_type="llama",
        max_new_tokens = 1024,
        temperature = 1.5
    )
    return llm

# QA Model Function
def qa_bot():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2",
                                       model_kwargs={'device': 'cpu'})
    
    db = FAISS.load_local(DB_FAISS_PATH, embeddings)
    llm = load_llm()
    qa_prompt = set_custom_prompt()
    qa = retrieval_qa_chain(llm, qa_prompt, db)
    return qa

# Output function
def final_result(query):
    qa_result = qa_bot()
    response = qa_result({'query': query})
    if isinstance(response, dict):  # Ensure response is string
        response = str(response)
    return response

# Chainlit code
class Query(BaseModel):
    query: str

@app.post("/query")
async def get_query_result(query: Query):
    try:
        response = final_result(query.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

