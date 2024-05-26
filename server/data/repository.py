from pymongo import MongoClient
from bson import ObjectId
from typing import Optional,Dict,Any,TypeVar

T = TypeVar('T')

class BaseRepository:
    def __init__(self, db_uri: str, db_name: str, collection_name: str):
        self.client = MongoClient(db_uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def get_by_id(self, item_id: str):
        item_data = self.collection.find_one({"_id": ObjectId(item_id)})
       # print(f"item find?: {item_data}")
        return item_data

    def create(self, item_data: Dict[str, Any]) -> str:
        result = self.collection.insert_one(item_data)
        return str(result.inserted_id)

    def update(self, item_id: str, updated_data: Dict[str, Any]) -> None:
        self.collection.update_one({"_id": ObjectId(item_id)}, {"$set": updated_data})

    def delete(self, item_id: str) -> None:
        self.collection.delete_one({"_id": ObjectId(item_id)})

    def find_all(self):
        items = self.collection.find()
        return items

class UserRepository(BaseRepository):
    def __init__(self, db_uri: str, db_name: str):
        super().__init__(db_uri,db_name,"User")

    def get_by_charname(self,name):
        return self.collection.find_one({"character_informations.character_name" : name})
    def get_by_loginname(self,name):
        return self.collection.find_one({"login_informations.login_name" : name})
    def login(self,name,pw):
        pass
    def register(self,name,pw):
        resp = self.collection.insert_one({"login_informations" : {"login_name" : name, "login_pw" : pw},
                         "character_informations" : {"gender" : "", "race" : "", "level" : 0, "family" : "", "character_name" : ""},
                         "equipment" : {"gadget" : "", "accessory" : "", "weapon" : "", "clothing" : ""},
                         "inventory" : [],
                         "yen" : 0})
        return str(resp.inserted_id)
    
    def unequip(self,name,id,category):
        print("kati: ", category.lower())
        print(name,id,category.lower())
        pipeline = [{"$match" : {"character_informations.character_name" : name}}]
        result = self.collection.aggregate(pipeline)
        for e in result:
            update_result = self.collection.update_one({"character_informations.character_name" : e["character_informations"]["character_name"]},{"$set" : {"equipment."+category.lower() : ""}})
            print(update_result.modified_count)
        #self.collection.update_one({"character:informations.character_name" : name}, 
         #                          {"$set" : {"equipment."+category.lower() : ""}})
        self.collection.update_one({"character_informations.character_name" : name}, 
                                   {"$push" : {'inventory' : id}})

    def equip(self,name,id,category):
        pipeline = [{"$match" : {"character_informations.character_name" : name}}]
        result = self.collection.aggregate(pipeline)
        for e in result:
            update_result = self.collection.update_one({"character_informations.character_name" : e["character_informations"]["character_name"]},{"$set" : {"equipment."+category.lower() : id}})
            print(update_result.modified_count)

        self.collection.update_one({"character_informations.character_name" : name}, 
                                   {"$pull" : {'inventory' : id}})
       # self.collection.update_one({"character:informations.character_name" : name}, 
        #                           {"$set" : {'equipment.'+category : id}})
            


class ItemRepository(BaseRepository):
    def __init__(self, db_uri: str, db_name: str):
        super().__init__(db_uri,db_name,"Item")
    
    def find_by_category(self,name):
        return self.collection.find({"Category":name})
    
    def find_by_name(self,name):
        return self.collection.find_one({"Item_Name" : name})

class JobRepository(BaseRepository):
    def __init__(self,db_uri:str, db_name:str):
        super().__init__(db_uri,db_name,"Job")
    
    def get_random_job(self):
        j = self.collection.aggregate([{"$sample": {"size": 2}}])
        return j
        #return j
class NPCCharacterRepository(BaseRepository):
    def __init__(self,db_uri:str, db_name:str):
        super().__init__(db_uri,db_name,"Character")

    def get_by_name(self, name: str):
        ch_data = self.collection.find_one({"character_name": name})
       # print(f"item find?: {item_data}")
        return ch_data