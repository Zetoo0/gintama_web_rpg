import { FC, useEffect, useState } from 'react';
import Profile from '../profile/profile';
import Item from "../Item";
import {Player} from "../Player";
import { JobEnemy } from '../JobEnemy';
import { MinigameType } from '../MinigameType';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Job } from '../odd_job/job';
import MinigamePage from './minigame';
import Link from 'next/link';
export default function MiniGamePage(){
  const [jEnemy, setJEnemy] = useState<JobEnemy[] | null>(null);

  useEffect(() => {

    const fetchEnemyData = async () => {
      try{
          const eData = JSON.parse(sessionStorage.getItem('enemy') ||'');
          setJEnemy(eData as JobEnemy[] || null);
      }catch(err){
          console.error(err);
      }
  }
  fetchEnemyData();
  }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <MinigamePage minigameType={MinigameType.minigame1} enemy={jEnemy}/>
            <Link href={"/odd_job"}>
              <button>Odd Job</button>
            </Link>
          </div>
  
        </main>
  
    );
}