import os
import pprint
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId

# Carrega o .env
load_dotenv() 

# usa a lib OS para pega o env
senha = os.getenv("MONGO_PASS")

# String de conexão com o DB
string_connection = f"mongodb+srv://davigmota:{senha}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&authSource=admin&appName=Cluster2703"

# instancia o client com a string connection
client = MongoClient(string_connection)

# pega o banco
db = client.DashFinance

# pega a coleção de usuários
users_collection = db.Users

# id a ser filtrado para atualização
document_to_update = {"_id": ObjectId("686d54b8e6db87c6228be896")}

# update
add_to_user = {"$set": {"password": "Dd.2Dd.2"}}

# pprint documento original
pprint.pprint(users_collection.find_one(document_to_update))

# comando para atualizar
res = users_collection.update_one(document_to_update, add_to_user)
print(f"documentos atualizados: {res}")

pprint.pprint(users_collection.find_one(document_to_update))

client.close()