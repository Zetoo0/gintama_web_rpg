'use client'
import { FC, useEffect, useState } from 'react';
import Profile from './profile';
import Item from "../Item";
import {Player} from "../Player";
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
/*interface Equipment{
  gadget:Item
  accessory:Item
  weapon:Item
  clothing:Item
}

interface LoginInformation{
  login_name:string;
  login_pw:string;
}

interface CharacterInformations{
  gender:string;
  race:string;
  level:string;
  family:string;
  character_name:string; 
}
interface PlayerData {
  _id: string;
  login_informations:LoginInformation;
  character_informations:CharacterInformations;
  equipment:Equipment
  inventory:Item[];
  yen:number;
}*/

const ProfilePage: FC = () => {
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const ChangeProfilePlayerSession = () => {
      sessionStorage.setItem('player', JSON.stringify(playerData));
  }

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const pData = JSON.parse(sessionStorage.getItem('player') ||'');
       // console.log(JSON.parse(pData) || '');
        setPlayerData(pData as Player|| null);
        //console.log(playerData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlayerData();
    console.log(playerData);
  }, []); // Üres függvénytömb, így csak egyszer fog lefutni az useEffect
  //console.log(playerData?.character_informations);
  return (
    <div>
      {playerData ? (
        <Profile player={playerData} refetch={router}/>
      ) : (
        <p>Loading...</p>
      )}
      <Link href={"/odd_job"}>
        <button onClick={ChangeProfilePlayerSession}>Odd Job</button>
      </Link>
    </div>
  );
};
export default ProfilePage;
