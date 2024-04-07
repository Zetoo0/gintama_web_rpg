from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, ConfigDict
from pydantic_core import CoreSchema
from bson import ObjectId
#from .object_id import PydanticObjectId
from typing import List,Optional,Union,Any,Dict


    
class CharacterList:
   def __init__(self):
        self.character_list = []

class Family(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    _id : ObjectId
    name : str
    def to_json(self):
        return jsonable_encoder(self,exclude_none=True)
   
    def to_bson(self):
        data = self.dict(by_alias=True,exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id",None)
        return data
   # def to_bson(self):
   #     data = self.dict(by_alias=True,exclude_none=True)
  #      if data.get("_id") is None:
 #           data.pop("_id",None)
#        return data