import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Carrega o .env
load_dotenv() 

# usa a lib OS para pega o env
senha = os.getenv("MONGO_PASS")

# String de conexão com o DB
string_connection = f"mongodb+srv://davigmota:{senha}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2703"

# instancia o client com a string connection
client = MongoClient(string_connection)

try:
    # lista os nomes dos bancos
    for db in client.list_database_names():
        print("Banco:", db)
except Exception as e:
    print("Erro:", e)
# fecha a instância
client.close()