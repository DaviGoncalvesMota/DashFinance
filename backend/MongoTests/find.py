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

# senhas a serem encontradas
documents_to_find = {"password": "1234"}

# comando para encontrar
cursor = users_collection.find(documents_to_find)

num_docs = 0
# para cada documento filtrado
for document in cursor:
    num_docs += 1
    pprint.pprint(document)
    print()
print("# de documentos encontrados: " + str(num_docs)) 

client.close()