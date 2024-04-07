from bson import ObjectId
from typing import Dict,Any
from pydantic import BaseModel,ConfigDict,GetJsonSchemaHandler
from pydantic_core import CoreSchema
BaseModel.model_config["json_encoders"] = {ObjectId: lambda v: str(v)}

class PydanticObjectId(ObjectId):
    """
    Object Id field what compatible with PyDantic
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls,v):
        return PydanticObjectId(v)
    
    @classmethod
    def __get_pydantic_json_schema(cls,coreSchema:CoreSchema, handler:GetJsonSchemaHandler)->Dict[str,Any]:
        json_schema = super().__get_pydantic_json_schema__(coreSchema,handler)
        json_schema = handler.resolve_ref_schema(json_schema)
        json_schema.update(
            type="string",
            examples = ["5eb7cf5a86d9755df3a6c593", "5eb7cfb05e32e07750a1756a"]
        )
        return json_schema
        #field_schema.update(
         #   type="string",
          #  examples = ["5eb7cf5a86d9755df3a6c593", "5eb7cfb05e32e07750a1756a"]
        #)

#ENCODERS_BY_TYPE[PydanticObjectId] = str