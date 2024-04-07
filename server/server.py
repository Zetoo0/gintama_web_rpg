from flask import Flask, jsonify#,url_for,request,redirect
from flask_cors import CORS
from pymongo import MongoClient, InsertOne,DeleteOne,DeleteMany,ReplaceOne,UpdateMany
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import sys 
from data import model
#from flask_pymongo import PyMongo

#load_dotenv()
#MONGO_URI = os.environ['MONGO_URI']

print(sys.path)

app = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb+srv://zeteny000:<snjnzbQHRi5LTk23>@cluster0.0ed91fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient('localhost',27017)
db = client['ginta_ma']
characters = db.Character
items = db.Item
users = db.User
#families = db.Family;
#items = db.Item
CORS(app)

#print(characters.find_one())

@app.route("/test/main", methods=['GET'])
def main_test():
    return jsonify({
        "test" : characters.find_one()#client.list_database_names()[0]
    })

@app.route("/characters/<string:character_name>",methods=["GET"])
def get_character_by_name(character_name):
    ch = characters.find_one({"character_name":character_name})
    print(ch)
    return model.Character(**ch).to_json()


@app.route("/items/<string:item_name>",methods=['GET'])
def get_item_by_name(item_name):
    item = items.find_one({"Item_Name" : item_name})
    print(item)
    return model.Item(**item).to_json()

@app.route("/user/character/<string:character_name>")
def get_user_by_char_name(character_name):
    usr = users.find_one({"character_informations.character_name" : character_name})
    print(usr)
    return model.User(**usr).to_json()

@app.route("/user/character/<string:character_name>/levelup")
def level_up_user(character_name):
    usr = users.update_one({"character_informations.character_name" : character_name}, {"$inc" : {'character_informations.level' : 1}})
    return {"Success" : True}
    #usr.update_one()

@app.route("/item/<string:item_name>")
def get_item_by_name(name):
    item = items.find_one({"name":name})
    print(item)
    return model.Item(**item).to_json()

@app.route("/item/<string:category>")
def get_items_by_category(category):
    itemz = items.find({"category":category})
    retItemz = [item for item in itemz model.Item(**item).to_json()]
    return retItemz


if __name__ == "__main__":
    app.run(debug=True,port=8080)   