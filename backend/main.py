from typing import Annotated
from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select, Relationship
# NOTE: NEVER write SQL as an f string. it WILL make sql injection possible
# NOTE: switched from pip to uv - do NOT use pip anymore - when switching machines do `uv sync`, to add a package do `uv add {package}` and to run the backend server do `uv run fastapi dev main.py`


# DB stuff 👍🥺🤤

class Categories(SQLModel, table=True):
    # __tablename__ = "categories"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)

    products: list["Products"] = Relationship(back_populates="category")

class Products(SQLModel, table=True):
    # __tablename__ = "products"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    price: float
    stock: int
    category_id: int = Field(foreign_key="categories.id")
    category: Categories = Relationship(back_populates="products")

class CategoriesResponse(SQLModel):
    id: int
    name: str

class ProductsResponse(SQLModel):
    id: int
    name: str
    price: float
    stock: int
    category: CategoriesResponse

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

@app.get("/products", response_model=list[ProductsResponse])
def get_products(session: SessionDep, category: list[str] | None = Query(default=None)):

    if category is None:
        statment = select(Products)
    else:
        statment = select(Products).join(Categories).where(Categories.name.in_(category))

    return session.exec(statment).all()

@app.get("/categories")
def get_categories(session: SessionDep):
    return session.exec(select(Categories)).all()

""" 
@app.get("/products/{product_id}")
async def get_product_by_id(product_id: int):
    return products[product_id]
 """