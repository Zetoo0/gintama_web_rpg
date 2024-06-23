import FightArenaPage from "./fightmaybearena";
import { FC, useEffect, useState } from 'react';
import { Player } from "../Player";
import { JobEnemy } from "../JobEnemy";
export default function FightPage(){
    const [enemy, setJEnemy] = useState<JobEnemy[] | null>(null);
    const [player, setPlayer] = useState<Player | null>(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const pData = JSON.parse(sessionStorage.getItem('player') ||'');
                setPlayer(pData as Player|| null);
            } catch (err) {
                console.error(err);
            }
        };
        const fetchEnemyData = async () => {
            try{
                const eData = JSON.parse(sessionStorage.getItem('enemy') ||'');
                setJEnemy(eData as JobEnemy[] || null);
            }catch(err){
                console.error(err);
            }
        }
        fetchPlayerData();
        fetchEnemyData();
    }, []);
    );

    return(
        <main>
            <div>
                <FightArenaPage enemy={enemy} player={player}/>
            </div>
        </main>
    )
}