import os
import pprint

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

# pega o banco
db = client.DashFinance

# pega a coleção
accounts_collection = db.accounts

# seleciona pelo campo "Balanço"
select_by_balance = {"$match": {"balance": {"$lt": 1000}}}

# calcula o balanço
separate_by_account_calculate_avg_balance = {
    "$group": {"_id": "account_type", "avg_balance": {"$avg": "$balance"}}
}

# cria o pipeline
pipeline = [
    select_by_balance,
    separate_by_account_calculate_avg_balance
]

# agrega o pipeline
results = accounts_collection.aggregate(pipeline)

print()
print(
    "Average balance of checking and savings accounts with of less than $1000", "\n"
)   

for item in results:
    pprint.pprint(item)

client.close()