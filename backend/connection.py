import os
from dotenv import load_dotenv
from pymongo import MongoClient

# load the .env
load_dotenv() 

# use os lib to get the env
password = os.getenv("MONGO_PASS")

# connection string with database
connection_string  = f"mongodb+srv://davigmota:{password}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2703"

# instance the client with connection string 
client = MongoClient(connection_string)

try:
    # lista os nomes dos bancos
    for db in client.list_database_names():
        print("Banco:", db)
except Exception as e:
    print("Erro:", e)
# fecha a instância
client.close()