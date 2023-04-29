import pymongo
from flask import Flask
from templify.config import Config

app = Flask(__name__)
app.config.from_object(Config)

client = pymongo.MongoClient(app.config["MONGODB_DATABASE_URI"])
db = client[app.config["MONGODB_DATABASE_NAME"]]

from templify.main.routes import main
from templify.seva.routes import seva
from templify.donation.routes import donation
from templify.transactions.routes import transactions

app.register_blueprint(main)
app.register_blueprint(seva)
app.register_blueprint(donation)
app.register_blueprint(transactions)
