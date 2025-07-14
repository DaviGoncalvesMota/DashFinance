import os
import pprint

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

senha = os.getenv("MONGO_PASS")

string_connection = f"mongodb+srv://davigmota:{senha}@cluster2703.tta3rpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2703"

client = MongoClient(string_connection)

db = client.DashFinance

accounts_collection = db.accounts

conversation_rate_usd_to_gbp = 1.3

select_accounts = {"$match": {"account_type": "checking", "balance": {"$gt": 1500}}}

organize_by_original_balance = {"$sort": {"balance": -1}}

return_specified_fields = {
    "$project": {
        "account_type": 1,
        "balance": 1,
        "gbp_balance": {"$divide": ["$balance", conversation_rate_usd_to_gbp]},
        "_id": 0,
    }
}

pipeline = [
    select_accounts,
    organize_by_original_balance,
    return_specified_fields
]

results = accounts_collection.aggregate(pipeline)

for item in results:
    pprint.pprint(item)

client.close()