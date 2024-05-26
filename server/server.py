from flask import Flask, jsonify,url_for,request,redirect,Response
from flask_cors import CORS
from pymongo import MongoClient, InsertOne,DeleteOne,DeleteMany,ReplaceOne,UpdateMany
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from bson import ObjectId
import os
import sys 
from data import model,repository
import json
#from flask_pymongo import PyMongo

#load_dotenv()
#MONGO_URI = os.environ['MONGO_URI']

print(sys.path)

app = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb+srv://zeteny000:<snjnzbQHRi5LTk23>@cluster0.0ed91fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient('localhost',27017)
db = client['ginta_ma']
usr_repo = repository.UserRepository("mongodb://localhost:27017","ginta_ma")
item_repo = repository.ItemRepository("mongodb://localhost:27017","ginta_ma")
job_repo = repository.JobRepository("mongodb://localhost:27017","ginta_ma")
npc_repo = repository.NPCCharacterRepository("mongodb://localhost:27017","ginta_ma")
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



#find and return the item by its name
@app.route("/items/<string:item_name>",methods=['GET'])
def get_item_by_name(item_name):
    item = items.find_one({"Item_Name" : item_name})
    print(item)
    return model.Item(**item).to_json()

#get the user by the character name, maybe i should rewrite 
#this to search by the username, that should be easier 
#or not because if i need the specific character its better
@app.route("/user/character/<string:character_name>",methods=['GET'])
def get_user_by_char_name(character_name):
    usr = usr_repo.get_by_charname(character_name)
    for i,item_id in enumerate(usr['inventory']):
        item = item_repo.get_by_id(ObjectId(item_id))
        usr["inventory"][i] = item
    for key,item_id in usr['equipment'].items():
        item = item_repo.get_by_id(ObjectId(item_id))
        usr["equipment"][key] = item
    #print(usr)
    modeled = model.UserAnother(**usr).to_json()
    print(modeled)
    return modeled
    #print(usr)
    #for (k,e) in usr["equipment"].items():
     #   a = item_repo.get_by_id(e)
      #  usr["equipment"].update({k,a})
    #print(usr)
    #item = item_repo.get_by_id(usr["inventory"])
    #modeled = model.User(**usr).to_json()
    #print(modeled)
    #print(modeled["inventory"])
    return {"Testing" : True}

@app.route("/repo/usr/<string:character_name>")
def get_usr_by_chname(character_name):
    usr_dat = usr_repo.get_by_charname(character_name)
    print(usr_dat)
    for e in usr_dat["inventory"]:
        print(e)
        print("????")
    if usr_dat:
        modeled = model.UserAnother(**usr_dat).to_json()
        print(modeled)
        return modeled
    return jsonify({"error": "Player not found"}), 404


#level up the given user by character name, simply increment the level
@app.route("/user/character/<string:character_name>/levelup",methods=['POST'])
def level_up_user(character_name):
    usr = users.update_one({"character_informations.character_name" : character_name}, {"$inc" : {'character_informations.level' : 1}})
    return {"Success" : True}
    #usr.update_one()

#@app.route("/user/<string:character_name>/removeitem/<string:item_name>")
"""def delete_item_from_inventory(character_name,item_name):
    item = item_repo.find_by_name(item_name)
    usr = users.update_one({"character_informations.character_name" : character_name}, {"$pull" : {'inventory' : item['_id']}})
    return {"Success" : True}
"""
@app.route("/user/unequip",methods=['POST'])
def unequip_item():
    resp = request.get_json(force = True)
    item_name = resp["item_name"]
    character_name = resp["character_name"]
    print("unequipping",character_name)
    item = item_repo.find_by_name(item_name)
    usr_repo.unequip(character_name,item['_id'],item["Category"])
    return redirect("localhost:3000/profile")
   # return {"Success" : True}

@app.route("/user/equip",methods=['POST'])
def equip_item():
    resp = request.get_json(force = True)
    item_name = resp["item_name"]
    character_name = resp["character_name"]
    print("equipping",character_name,item_name)
    item = item_repo.find_by_name(item_name)
    usr_repo.equip(character_name,item['_id'],item["Category"])
    return redirect("localhost:3000/profile")
    #return {"Success" : True}

#add an item to the user inventory, 
#find the item first then push into the inventory
@app.route("/user/<string:character_name>/additem/<string:item_name>")
def buy_item(character_name,item_name):
    item = items.find_one({"Item_Name" : item_name})
    usr = users.update_one({"character_informations.character_name" : character_name}, {"$push" : {'inventory' : item['_id']}}, {"$inc" : {"yen" : -item['Cost']}})
    return {"Success" : True}

@app.route("/user/<string:character_name>/equipmentchange/<string:type_name>/<string:item_name>")
def change_equipment(character_name,type_name,item_name):
    item = items.find_one({"Item_Name" : item_name})
    print(item)
    usr = users.update_one({"character_informations.character_name" : character_name}, {"$set" : {'equipment.'+type_name : item['_id']}})
    return {"Success" : True}

#get the items with category
@app.route("/item/filter/<string:category>",methods=['GET'])
def get_items_by_category(category):
    itemz = items.find({"Category":category})
    retItemz = []
    for item in itemz:
        i = model.Item(**item).to_json()
        retItemz.append(model.Item(**item))
    return jsonify(retItemz)

@app.route("/user/login", methods=['POST'])
def login():
    resp = request.get_json(force = True)
    #print(resp)
    usr = usr_repo.get_by_loginname(resp["userName"])
    print(usr)
    if len(usr) != 0:
        for i,item_id in enumerate(usr['inventory']):
            item = item_repo.get_by_id(ObjectId(item_id))
            usr["inventory"][i] = item
        for key,item_id in usr['equipment'].items():
            if(item_id == ""):
                usr["equipment"][key] = ""
            else:
                item = item_repo.get_by_id(ObjectId(item_id))
                usr["equipment"][key] = item
        #print(usr)
        modeled = model.UserAnother(**usr).to_json()        
        return modeled
    #return {"Success" : False}

@app.route("/user/register", methods=['POST'])
def register():
    resp = request.get_json(force = True)
    is_exist = usr_repo.get_by_loginname(resp["userName"])
    print(is_exist)
    if is_exist is None:
        print("YIPEEEE")
        usr_repo.register(resp["userName"],resp["password"]) 
    return {"Succ" : "ass"}

@app.route("/item")
def all_item():
    resp = item_repo.find_all()
    arr = []
    for item in resp:
        i = model.Item(**item).to_json()
        arr.append(i)
    return jsonify({'items' : arr})

@app.route("/jobs")
def all_job():
    resp = job_repo.find_all()
    arr = []
    for job in resp:
        currGiver = npc_repo.get_by_name(job["quest_giver"])
        job["quest_giver"] = model.NPCCharacter(**currGiver).to_json()
        arr.append(model.Job(**job).to_json())
    print(resp)    
    test_all_job = model.AllJob(all_job=arr)
    print(test_all_job.all_job)
    return test_all_job.to_json() #jsonify({"jobs" : arr})

@app.route("/random_job")
def random_job():
    resp = job_repo.get_random_job()
    arr = []
    for job in resp:
        currGiver = npc_repo.get_by_name(job["quest_giver"])
        job["quest_giver"] = model.NPCCharacter(**currGiver).to_json()
        arr.append(model.Job(**job).to_json())
    test_all_job = model.AllJob(all_job=arr)
    return test_all_job.to_json() #jsonify({"jobs" : arr})

if __name__ == "__main__":
    app.run(debug=True,port=8080)   