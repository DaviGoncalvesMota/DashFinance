from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
import os

load_dotenv()

senha = os.getenv("MONGO_PASS")
string_connection = f"mongodb+srv://davigmota:{senha}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2703"

client = MongoClient(string_connection)
db = client["DashFinance"]
users_collection = db["Users"]

app = FastAPI()

@app.get("/users")
def get_all_users():   
    users = []
    for user in users_collection.find({}):
        user["_id"] = str(user["_id"]) 
        users.append(user)
    return users

@app.get("/users/{user_id}")
def get_user_by_id(user_id: str):
    print(user_id)
    user_id = user_id.strip()
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})    
        if user:
            user["_id"] = str(user["_id"])
            return user 
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except:
        raise HTTPException(status_code=400, detail="ID falhou")


# def get_all_users(_id: str = Query(None)):
#     if _id:
#         try:
#             collection.find_one({"_id": ObjectId(_id)})
#             if user:
#                 user["_id"] = str(user["_id"])
#                 return user
#             else:
#                 raise HTTPException(status_code=404, detail="Usuário não encontrado")
#         except:
#             raise HTTPException(status_code=400, detail="ID Inválido")
#     else:
#         users = []
#         for user in collection.find({}):
#             user["_id"] = str(user["_id"])
#             users.append(user)
#         return users