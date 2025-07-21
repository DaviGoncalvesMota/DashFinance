import traceback
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
from bson.decimal128 import Decimal128
from datetime import date, datetime
from pydantic import BaseModel
import os

load_dotenv()

password = os.getenv("MONGO_PASS")
connection_string  = f"mongodb+srv://davigmota:{password}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2703"

client = MongoClient(connection_string)
db = client["DashFinance"]
users_collection = db["Users"]
products_collection = db["Products"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # front-end React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# classes allow us that we pass our API params
class UserModel(BaseModel):
    name: str
    email: str
    password: str
    bio: str
    phone: str
    avatar: str

class ProductModel(BaseModel):
    name: str
    desc: str
    cost: float
    place: str
    payment: str
    constant: str
    date: date
    moveType: str
    category: str
    userId: str

class PasswordModel(BaseModel):
    password: str

class LoginData(BaseModel):
    email: str
    password: str

@app.get("/")
def connection_test():
    try:
        # lista os nomes dos bancos
        for db in client.list_database_names():
           return {"banco": f"".join(db)}
    except:
        raise HTTPException(status_code=400, detail="Conexão falhou!!")

# get all users
@app.get("/users")
def get_all_users():   
    # using arrays becomes your life easier
    users = []
    for user in users_collection.find({}):
        # always you need to find users, you'll have to convert an ObjectId to a string
        user["_id"] = str(user["_id"]) 
        users.append(user)
    return users

# get user by id
@app.get("/users/{user_id}")
def get_user_by_id(user_id: str):
    # strip command allow us to exclude all breaklines
    user_id = user_id.strip()
    try:
        # always you want to find an object, dont forget to use ObjectId from bson
        user = users_collection.find_one({"_id": ObjectId(user_id)})    
        if user:
            # convert to string, JSON cant read ObjectId, just primitive values, like strings, integers, floats, numbers, boolean and beyond
            user["_id"] = str(user["_id"])
            return user 
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except:
        raise HTTPException(status_code=400, detail="ID falhou")
    
# include user
@app.post("/users")
def create_user(user: UserModel):
    try:
        # every time you have to insert the user, you will need to convert to a dictionary using model dump
        inserted_user = users_collection.insert_one(user.model_dump())
        if inserted_user:
            # when you will insert the user, just return the user id 
            return {"inserted_id": str(inserted_user.inserted_id)}
        else:
            raise HTTPException(status_code=404, detail="Usuário náo foi inserido corretamente")
    except:
        raise HTTPException(status_code=400, detail="Nem tentou inserir")

# update user
@app.put("/users/{user_id}")
def update_user(user_id: str, user: UserModel):
    # the first thing to do when you are receiving an id, is delete all the breaklines and spaces
    user_id = user_id.strip()
    try:
        # we need to filter the document that we want to update by using his id
        document_to_update = {"_id": ObjectId(user_id)}
        if document_to_update:
            # here we set the user with all changes, if there isnt any change, it wont change anything
            items_to_update = {"$set": user.model_dump()}
            # and then we pass the document and the updates as params
            users_collection.update_one(document_to_update, items_to_update)
            # convert to string because json cant read ObjectId
            return str(document_to_update)
        else:
            raise HTTPException(status_code=404, detail="Usuário não foi preenchido corretamete")
    except:
        raise HTTPException(status_code=400, detail="Tentativa errada, tente novamente")

# get all products
@app.get("/products")
def get_all_products():
    try:
        products = []
        for product in products_collection.find({}):
            product["_id"] = str(product["_id"])
            # we always need the field value of the specified product
            for key, value in product.items():
                # we passed 2 params in instance (value, primitive type that will be converted)
                if isinstance(value, Decimal128):
                    # we applied the product key and we use the convert functions later
                    product[key] = float(value.to_decimal())
                # we passed 2 params in instance (value, primitive type that will be converted)
                elif isinstance(value, date):
                    # we applied the product key and we use the convert functions later
                    product[key] = value.isoformat()
            products.append(product)
        return products
    except:
        raise HTTPException(status_code=500, detail="Erro ao buscar produtos")
    
# get product by id
@app.get("/products/{product_id}")
def get_product_by_id(product_id: str):
    # strip command allow us to exclude all breaklines
    product_id = product_id.strip()
    try:
        # always you want to find an object, dont forget to use ObjectId from bson
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        # we always need the field value of the specified product
        for key, value in product.items():
            # we passed 2 params in instance (value, primitive type that will be converted)
            if isinstance(value, Decimal128):
                # we applied the product key and we use the convert functions later
                product[key] = float(value.to_decimal())
            # we passed 2 params in instance (value, primitive type that will be converted)
            elif isinstance(value, date):
                # we applied the product key and we use the convert functions later
                product[key] = value.isoformat()    
        if product:
            # convert to string, JSON cant read ObjectId, just primitive values, like strings, integers, floats, numbers, boolean and beyond
            product["_id"] = str(product["_id"])
            return product 
        else:
            raise HTTPException(status_code=404, detail="Produto não encontrado")
    except:
        raise HTTPException(status_code=400, detail="ID falhou")
    
# include product
@app.post("/products")
def create_product(product: ProductModel):
    try:
        product_dict = product.model_dump()
        # convert date to datetime because mongodb just accept datetime type
        if isinstance(product_dict["date"], date):
            product_dict["date"] = datetime.combine(product_dict["date"], datetime.min.time())
        # insert product
        inserted_product = products_collection.insert_one(product_dict)
        if inserted_product:
            return {"inserted_id": str(inserted_product.inserted_id)}
        else:
            raise HTTPException(status_code=404, detail="Produto não foi inserido corretamente")
    except Exception as e:
        print("Erro:", e)
        raise HTTPException(status_code=400, detail=str(e))
    
@app.put("/products/{product_id}")
def update_products(product_id: str, product: ProductModel):
    # the first thing to do when you are receiving an id, is delete all the breaklines and spaces
    product_id = product_id.strip()
    try:
        # we need to filter the document that we want to update by using his id
        document_to_update = {"_id": ObjectId(product_id)}
        if document_to_update:
            # convert date to datetime because mongodb just accept datetime type
            product_dict = product.model_dump()
            if isinstance(product_dict["date"], date):
                product_dict["date"] = datetime.combine(product_dict["date"], datetime.min.time())

            # update product
            items_to_update = {"$set": product_dict}
             # and then we pass the document and the updates as params
            products_collection.update_one(document_to_update, items_to_update)
            # convert to string because json cant read ObjectId
            return str(document_to_update)
        else:
            raise HTTPException(status_code=404, detail="Produto não foi preenchido corretamete")
    except:
        raise HTTPException(status_code=400, detail="Tentativa errada, tente novamente")

@app.delete("/products/{product_id}")
def delete_products(product_id: str):
    # the first thing to do when you are receiving an id, is delete all the breaklines and spaces
    product_id = product_id.strip()
    try:
        # we need to filter the document that we want to delete by using his id
        document_to_delete = {"_id": ObjectId(product_id)}
        if document_to_delete:
            # delete the found document
            res = products_collection.delete_one(document_to_delete)
            # return the count of documents deleted
            return {"deleted documents": str(res.deleted_count)}
        else:
            raise HTTPException(status_code=404, detail="Produto não encontrado")
    except:
        raise HTTPException(status_code=400, detail="a requisição falhou")

@app.get("/products/findbyuserid/{user_id}")
def get_products_by_user_id(user_id: str):
    # the first thing to do when you are receiving an id, is delete all the breaklines and spaces
    user_id = user_id.strip()
    try:
        products = []
        # here we open an object item, in this example, is userId, then we can pass the param
        for product in products_collection.find({"userId": user_id}):
            product["_id"] = str(product["_id"])
            # we always need the field value of the specified product
            for key, value in product.items():
                # we passed 2 params in instance (value, primitive type that will be converted)
                if isinstance(value, Decimal128):
                    # we applied the product key and we use the convert functions later
                    product[key] = float(value.to_decimal())
                # we passed 2 params in instance (value, primitive type that will be converted)
                elif isinstance(value, date):
                    # we applied the product key and we use the convert functions later
                    product[key] = value.isoformat()
            products.append(product)
        return products
    except:
        raise HTTPException(status_code=500, detail="Erro ao buscar produtos")
    
@app.get("/users/finduserbyemail/{user_email}")
def get_user_by_email(user_email: str):
    # the first thing to do when you are receiving an id, is delete all the breaklines and spaces
    user_email = user_email.strip()
    try:
        # acess the users collection and search the user with the passed email
        user = users_collection.find_one({"email": user_email})
        if user:
            # convert his object id to string
            user["_id"] = str(user["_id"])
            return user
        else:
            raise HTTPException(status_code=404, detail="Usuário não existe")
    except:
        raise HTTPException(status_code=400, detail="Requisição falhou")
    
@app.put("/users/forgotpassword/{user_id}")
def forgot_password(user_id: str, new_password: PasswordModel):
    # the first thing to do when you are receiving an id, is delete all the breaklines and spaces
    user_id = user_id.strip()
    try:
        # find the user id
        document_to_update = {"_id": ObjectId(user_id)}
        if document_to_update:
            # get the password model an set the new password on the passworld field
            password_update = {"$set": {"password": new_password.password}}
            users_collection.update_one(document_to_update, password_update)
            return str(document_to_update)
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except:
        raise HTTPException(status_code=400, detail="Requisição falhou!")
    
@app.post("/users/findbylogin")
def login(data: LoginData):
    email = data.email.strip()
    password = data.password.strip()
    
    user = users_collection.find_one({"email": email, "password": password})
    
    if user:
        user["_id"] = str(user["_id"])
        return user
    else:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")