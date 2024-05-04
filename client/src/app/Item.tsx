import { FC } from 'react';

interface Item{
   // _id:string;
    Category:string;
    Item_Name:string;
    Description:string;
    Strength:number;
    Craziness:number;
    Cost:number;
    Level:number;
}
interface ItemProps{
    item:Item
}

export default Item;