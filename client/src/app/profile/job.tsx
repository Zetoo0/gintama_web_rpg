import Item from "../Item";

export interface Character{
    _id?:string;
    family_name:string;
    character_name:string;
    gender:string;
    race:string;
    description:string;
}

export interface Job{
    _id?:string;
    job_name:string;
    job_enemies: [];
    quest_giver:Character;
    reward:Item | number;
}