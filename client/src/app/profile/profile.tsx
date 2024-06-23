import { FC , useState } from 'react';
import styles from './profile.module.css';
import Item from "../Item";
import { Player, Equipment } from '../Player';
import { Router } from 'next/router';
import {usePlayer} from "../mostmar_valami_tenyleg";
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
interface ProfileProps {
  player: Player;
  refetch: AppRouterInstance;
}



const Profile: FC<ProfileProps> = ({player, refetch}) => {
  const [itemData, setItemData] = useState<Item | null | string>(null);
  const [equippedData,setEquippedData] = useState<boolean | null>(false);
  //const router = useRouter();
  const onItemFocus = (item : Item | null | string, isEquipped : boolean) => {
    setItemData(item)
    setEquippedData(isEquipped)
  }

  const onItemEquip = (item : Item , equipped : boolean, player:Player) => {
    if(equipped){
      player?.inventory.push(item);
      console.log("Item kategória:",item.Category);
      switch(item?.Category.toLowerCase()){
        case "gadget":
          player.equipment.gadget = "";
          break;
        case "accessory":
          player.equipment.accessory = "";
          break;
        case "weapon":
          player.equipment.weapon = "";
          break;
        case "clothing":
          player.equipment.clothing = "";
          break;
      }
      unequip(player,item);
    }else{
      player?.inventory.splice(player?.inventory.indexOf(item),1);
      switch(item?.Category.toLowerCase()){
        case "gadget":
          player.equipment.gadget = item;
          break;
        case "accessory":
          player.equipment.accessory = item;
          break;
        case "weapon":
          player.equipment.weapon = item;
          break;
        case "clothing":
          player.equipment.clothing = item;
          break;
      }
      equip(player,item);
    }
    //refetch();
    refetch.refresh();
  } 
  const unequip = async (player:Player, item:Item) => {
    try{
      const response = await fetch("http://127.0.0.1:8080/user/unequip",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_name: item.Item_Name,
            character_name : player.character_informations.character_name
        }),
    });
      /*switch(item?.Category){
        case "gadget":
          player.equipment.gadget = "";
          player.inventory.push(item);
          break;
        case "accessory":
          player.equipment.accessory = "";
          player.inventory.push(item);
          break;
        case "weapon":
          player.equipment.weapon = "";
          player.inventory.push(item);
          break;
        case "clothing":
          player.equipment.clothing = "";
          player.inventory.push(item);
          break;
      }*/
      console.log("unequip fetch for item: "+item.Item_Name);
    }catch(err){
        console.error(err);
    }
}
const equip = async (player:Player, item:Item) => {
  try{
    const response = await fetch("http://127.0.0.1:8080/user/equip",{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          item_name: item.Item_Name,
          character_name : player.character_informations.character_name
      }),
  });
      console.log("equip fetch for item: "+item.Item_Name);
  }catch(err){
      console.error(err);
  }
}

  return (
    <div className={styles.profile}>
      
      <h1 className={styles.title}>Profil</h1>
      <div className={styles.playerInfo}>
        <p><strong>Name:</strong> {player?.character_informations.character_name}</p>
        <p><strong>Level:</strong> {player?.character_informations.level}</p>
        <p><strong>Gender:</strong> {player?.character_informations.gender}</p>
        <p><strong>Race:</strong> {player?.character_informations.race}</p>
        {/* Egyéb játékos információk... */}
      </div>
      <div className={styles.inventory}>
        <h2>Inventory</h2>
        <ul>
          <li>
            {player?.inventory.map((item, index) => (
                  <p className={styles.p} key={index} onClick={() => onItemFocus(item,false)}>{item.Item_Name}</p>
          ))}
          </li>
        </ul>
      </div>
      <div className={styles.equipmentContainer}>
        <h2>Felszerelés</h2>
        <div className={styles.equipment}>
          <ul>
          {
              <li>
                <p className={styles.p} onClick={() => onItemFocus(player?.equipment.accessory,true)}>Accessory:{player?.equipment.accessory ? player?.equipment.accessory?.Item_Name : ""}</p>
                <p className={styles.p} onClick={() => onItemFocus(player?.equipment.clothing,true)}>Clothing:{player?.equipment.clothing ? player?.equipment.clothing?.Item_Name : ""}</p>
                <p className={styles.p} onClick={() => onItemFocus(player?.equipment.gadget,true)}>Gadget:{player?.equipment.gadget ? player.equipment.gadget?.Item_Name : ""}</p>
                <p className={styles.p} onClick={() => onItemFocus(player?.equipment.weapon,true)}>Weapon:{player?.equipment.weapon ? player.equipment.weapon?.Item_Name : ""}</p>
              </li>
            }
          </ul>
        </div>
            <div className={styles.equipmentAscii}>
          <pre>
          {`
          ______
          | .. |
          |_--_|     
          /    \\   
          |      |  
          |______|  
          |  ++  |  
          |  ||  |  
          |__||__|  
          `}
        </pre>
        </div>
      </div>
      <div className={styles.itemDetails}>
        {
          itemData && !equippedData &&(
            <>
              <h2>Selected Item Details</h2>
              <p><strong>Name:</strong> {itemData.Item_Name}</p>
              <p><strong>Description:</strong> {itemData.Description}</p>
              <p><strong>Strength:</strong> {itemData.Strength}</p>
              <p><strong>Craziness:</strong> {itemData.Craziness}</p>
              <button onClick={() => onItemEquip(itemData, false,player)}>Equip</button>
            </>
          )
        }
         {
          itemData && equippedData &&(
            <>
            <h2>Selected Item Details</h2>
            <p><strong>Name:</strong> {itemData.Item_Name}</p>
            <p><strong>Description:</strong> {itemData.Description}</p>
            <p><strong>Strength:</strong> {itemData.Strength}</p>
            <p><strong>Craziness:</strong> {itemData.Craziness}</p>
            <button onClick={() => onItemEquip(itemData, true,player)}>Unequip</button>
          </>
          )
         }
      </div>
      
    </div>

  );
};

export default Profile;