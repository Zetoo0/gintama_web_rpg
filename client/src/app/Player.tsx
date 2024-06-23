import Item from './Item';

export interface Equipment{
    gadget:Item | null | string;
    accessory:Item | null | string;
    weapon:Item | null | string;
    clothing:Item | null | string;
  }
  
export interface LoginInformation{
    login_name:string;
    login_pw:string;
    email:string;
  }
  
export interface CharacterInformations{
    gender:string;
    race:string;
    level:number;
    family:string;
    character_name:string; 
    inteligence:number;
  }
  
export interface Player {
    _id?: string;
    login_informations:LoginInformation;
    character_informations:CharacterInformations;
    equipment:Equipment
    inventory:Item[];
    yen:number;
  }
