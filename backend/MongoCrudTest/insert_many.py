import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Carrega o .env
load_dotenv() 

# usa a lib OS para pega o env
senha = os.getenv("MONGO_PASS")

# String de conexão com o DB
string_connection = f"mongodb+srv://davigmota:{senha}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&authSource=admin&appName=Cluster2703"

# instancia o client com a string connection
client = MongoClient(string_connection)

# pega o banco de dados
db = client.DashFinance

users_collection = db.Users

new_users = [
    {
        "name": "William",
        "email": "william@gmail.com",
        "password": "1234",
        "bio": "Desenvolvedor Full Stack",
        "phone": "11953304291",
        "avatar": "https://media.istockphoto.com/id/1975733603/pt/foto/cross-with-robe-and-crown-of-thorns-on-hill-at-sunset-calvary-and-resurrection-concept.jpg?s=612x612&w=0&k=20&c=xiuUm1n3GBK6uhWzlYLHb8dLYwdfNc0yZuCvmom3s3Q=",
        "id": "1"
    },
    {
        "name": "Cida",
        "email": "cida@gmail.com",
        "password": "4321",
        "bio": "teste",
        "phone": "11987653256",
        "avatar": "https://media.istockphoto.com/id/1975733603/pt/foto/cross-with-robe-and-crown-of-thorns-on-hill-at-sunset-calvary-and-resurrection-concept.jpg?s=612x612&w=0&k=20&c=xiuUm1n3GBK6uhWzlYLHb8dLYwdfNc0yZuCvmom3s3Q=",
        "id": "2"
    }
]

result = users_collection.insert_many(new_users)

documents_ids = result.inserted_ids
print("# of documents inserted: " + str(len(documents_ids)))
print(f"_ids of inserted documents: {documents_ids}")

client.close()
