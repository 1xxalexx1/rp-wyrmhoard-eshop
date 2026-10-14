from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

products = {
    1:{"name": "dice set", "price": 10.00, "stock": 12 },
    2:{"name": "Rule book", "price": 30.50, "stock": 5},
    3:{"name": "Wizzard mini","price": 5.65,"stock": 30,}
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
