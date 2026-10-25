from sqlmodel import Session, SQLModel
from main import Products, Categories, db_engine

categories = [
    {"name": "Dice"},
    {"name": "Books"},
    {"name": "Minis"},
    {"name": "Accessories"},
]

products = [
    {"name": "Cursed Dice Set", "price": 10.00, "stock": 12, "category_id": 1},
    {"name": "Rule book", "price": 30.50, "stock": 5, "category_id": 2},
    {"name": "Bear Wizzard mini","price": 5.65,"stock": 30, "category_id": 3},
    {"name": "Toilet dice tray","price": 30.50,"stock": 0, "category_id": 4},
    {"name": "Magic dice", "price": 600.00, "stock": 20, "category_id": 1},
    {"name": "Cursed Dice Set", "price": 10.00, "stock": 12, "category_id": 1},
    {"name": "Rule book", "price": 30.50, "stock": 5, "category_id": 2},
    {"name": "Bear Wizzard mini","price": 5.65,"stock": 30, "category_id": 3},
    {"name": "Toilet dice tray","price": 30.50,"stock": 0, "category_id": 4},
    {"name": "Magic dice", "price": 600.00, "stock": 20, "category_id": 1},
    {"name": "necronomicon", "price": 6.00, "stock": 2, "category_id": 2},
]

def seed():
    SQLModel.metadata.drop_all(db_engine)
    SQLModel.metadata.create_all(db_engine)
    with Session(db_engine) as session:
        for val in categories:
            session.add(Categories(**val))
        session.commit()

    with Session(db_engine) as session:
        for val in products:
            session.add(Products(**val))
        session.commit()

    print("done")



if __name__ == "__main__":
    seed()