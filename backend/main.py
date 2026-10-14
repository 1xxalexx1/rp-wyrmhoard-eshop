from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from enum import Enum

""" class Label(Enum):
    DICE = 1,
    MINI = 2,
    BOOKS = 3,
    #Enum.SOMETHING.name = string value
    #Enum.SOMETHING.value = int value
    #Enum.SOMETHING = Enum.SOMETHIN """

products = {
    1:{"name": "Cursed Dice Set", "price": 10.00, "stock": 12, "label": "Dice"},
    2:{"name": "Rule book", "price": 30.50, "stock": 5, "label": "Books"},
    3:{"name": "Bear Wizzard mini","price": 5.65,"stock": 30, "label": "Minis"},
    4:{"name": "Toilet dice tray","price": 30.50,"stock": 0, "label": "Accessories"},
    }

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/products")
async def get_products():
    return list(products.values())

@app.get("/products/{product_id}")
async def get_product_by_id(product_id: int):
    return products[product_id]
