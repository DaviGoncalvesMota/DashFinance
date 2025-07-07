import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()  # Carrega o .env
senha = os.getenv("MONGO_PASS")

string_connection = f"mongodb+srv://davigmota:{senha}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&authSource=admin&appName=Cluster2703"
client = MongoClient(string_connection)

try:
    for db in client.list_database_names():
        print("Banco:", db)
except Exception as e:
    print("Erro:", e)
    
client.close()