from typing import Annotated
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select 
# NOTE: NEVER write SQL as an f string. it WILL make sql injection possible
# NOTE: switched from pip to uv - do NOT use pip anymore - when switching machines do `uv sync`, to add a package do `uv add {package}` and to run the backend server do `uv run fastapi dev main.py`


# DB stuff 👍🥺🤤

class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    price: float
    stock: int
    label: str = Field(index=True)

db_file = "database.db"
db_url = f"sqlite:///{db_file}" 

db_connection_args = {"check_same_thread": False}
db_engine = create_engine(db_url, connect_args=db_connection_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(db_engine)

def get_session():
    with Session(db_engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/products")
def get_products(session: SessionDep):
    return session.exec(select(Product)).all()

""" 
@app.get("/products/{product_id}")
async def get_product_by_id(product_id: int):
    return products[product_id]
 """