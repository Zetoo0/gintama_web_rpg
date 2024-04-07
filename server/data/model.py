from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, ConfigDict, Json
from pydantic_core import CoreSchema
from bson import ObjectId
from .object_id import PydanticObjectId
from typing import List,Optional,Union,Any,Dict

class Character(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    _id: Optional[ObjectId]
    family_name:Optional[str] = None
    family : Optional[str] = None
    character_name:str
    gender:str
    race:str
    level : Optional[int] = None
    description:Optional[str] = None
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data

class LoginInformation(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    login_name:str
    login_pw:str

class Equipment(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    gadget:str
    accessory:str
    weapon:str
    clothing:str


class UserCharacter(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    gender:str
    race:str
    level:int
    family:str
    character_name:str   
    


class Item(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    _id:ObjectId
    Category:str
    Item_Name : str
    Description:str
    Strength:int
    Craziness:int
    Cost:int
    Level:int
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data
    
class User(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    _id:ObjectId
    login_informations:LoginInformation
    character_informations: UserCharacter
    equipment : Equipment
    inventory: List[Item]

    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data


class Job(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    _id:ObjectId
    job_name:str
    quest_giver:str
    description:str
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data
class JobEnemies(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    _id : ObjectId
    job_name:str
    enemies:List[str]
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data
class Family(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    _id:ObjectId
    name:str

class FamilyTwoO(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    _id:ObjectId
    family_name:str
    members:List[Character] #it should be list of objectids
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data
class ItemType(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    _id:ObjectId
    name:str
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data