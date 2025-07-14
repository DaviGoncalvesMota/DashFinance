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

# pega a coleção de usuários
users_collection = db.Users

# objeto de usuário que será implementado
new_user = {
    "name": "Davihh27",
    "email": "davigmota@gmail.com",
    "password": "1234",
    "bio": "Desenvolvedor Full Stack",
    "phone": "11953304291",
    "avatar": "https://media.istockphoto.com/id/1975733603/pt/foto/cross-with-robe-and-crown-of-thorns-on-hill-at-sunset-calvary-and-resurrection-concept.jpg?s=612x612&w=0&k=20&c=xiuUm1n3GBK6uhWzlYLHb8dLYwdfNc0yZuCvmom3s3Q=",
}

# comando para inserir documento da coleção
result = users_collection.insert_one(new_user)

# resgata o id gerado automaticamente pelo mongodb
user_id = result.inserted_id
print(f"_id do usuário inserido: {user_id}")

client.close()

