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

# id a ser encontrado
document_to_delete = {"_id": ObjectId("686d54b8e6db87c6228be897")}

# comando para buscar o id
print("buscando pelo documento antes de ser deletado...")
pprint.pprint(users_collection.find_one(document_to_delete))

res = users_collection.delete_one(document_to_delete)

print("buscando pelo documento depois de ser deletado: ")
pprint.pprint(users_collection.find_one(document_to_delete))

print(f"documentos deletados: {str(res.deleted_count)}")

client.close()  