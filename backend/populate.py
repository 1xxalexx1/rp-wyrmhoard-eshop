from sqlmodel import Session, select, SQLModel
from main import Product, db_engine, create_db_and_tables

products = {
    1:{"name": "Cursed Dice Set", "price": 10.00, "stock": 12, "label": "Dice"},
    2:{"name": "Rule book", "price": 30.50, "stock": 5, "label": "Books"},
    3:{"name": "Bear Wizzard mini","price": 5.65,"stock": 30, "label": "Minis"},
    4:{"name": "Toilet dice tray","price": 30.50,"stock": 0, "label": "Accessories"},
    5:{"name": "Magic dice", "price": 600.00, "stock": 20, "label": "Dice"},
    6:{"name": "Cursed Dice Set", "price": 10.00, "stock": 12, "label": "Dice"},
    7:{"name": "Rule book", "price": 30.50, "stock": 5, "label": "Books"},
    8:{"name": "Bear Wizzard mini","price": 5.65,"stock": 30, "label": "Minis"},
    9:{"name": "Toilet dice tray","price": 30.50,"stock": 0, "label": "Accessories"},
    10:{"name": "Magic dice", "price": 600.00, "stock": 20, "label": "Dice"}
}

def seed():
    SQLModel.metadata.drop_all(db_engine)
    SQLModel.metadata.create_all(db_engine)

    with Session(db_engine) as session:
        for val in products.values():
            session.add(Product(**val))

        session.commit()
        print("done")



if __name__ == "__main__":
    seed()