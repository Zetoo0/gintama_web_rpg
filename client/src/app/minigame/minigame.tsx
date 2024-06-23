'use client'
import { FC, useEffect, useState } from 'react';
import Profile from '../profile/profile';
import Item from "../Item";
import {Player} from "../Player";
import { JobEnemy } from '../JobEnemy';
import { MinigameType } from '../MinigameType';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Job } from '../odd_job/job';
import OddJob from '../odd_job/odd_job';
import { KeyboardEvent, KeyboardEventHandler } from 'react';
import { start } from 'repl';
import { count } from 'console';    
import Link from 'next/link';


interface MinigameProps{
    /*enemyList: JobEnemy[];
    player : Player;*/
    minigameType : MinigameType;
    enemy : JobEnemy[] | null;
}

const MinigamePage: FC<MinigameProps> = ({/*enemyList, player,*/ minigameType, enemy}) => {
    const [keyDowned,setKeyDowned] = useState<string>("");
    const [timer,setTimer]  = useState<number>(0);
    const [isWin,setIsWin] = useState<boolean | null>(null);
    const [clickOnMe, setClickOnMe] = useState<boolean>(false);
    const [chanceGone, setChanceGone] = useState<boolean>(false);
    const [randomCh, setRandomCh] = useState<string>("");


    const randomChar = () => {
        const chars = ['KeyA','KeyB','KeyC','KeyD','KeyE','KeyF','KeyG','KeyH','KeyI','KeyJ','KeyK','KeyL','KeyM','KeyN','KeyO','KeyP','KeyQ','KeyR','KeyS','KeyT','KeyU','KeyV','KeyW','KeyX','KeyY','KeyZ'];
        const random = Math.floor(Math.random() * chars.length) + 1;
        setRandomCh(chars[random]);
        return chars[random];
    }
    const onKeyDownCheck = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log('?');
        //event.preventDefault();
        const key = event.nativeEvent.code;
        console.log('Nyomott fasz: ',key);
        if(!chanceGone && timer > 0){
            console.log(randomCh,key);
            if (key == randomCh && timer > 0){ 
                setIsWin(true);
                setChanceGone(true);
                console.log('WON');
            }else{
                setIsWin(false);
                setChanceGone(true);
                console.log('LOST');
            }
        }

    }

    useEffect(() => {
        let interval:any;
        if(clickOnMe && !chanceGone && timer > 0){
            interval = setInterval(() => {
                setTimer(timer - 1);
                console.log(timer);
            },133)

            return () => clearInterval(interval);
        }
    })
    return(
        <div>
            {

                minigameType == MinigameType.minigame1 &&(
                    <div tabIndex ={0} onKeyDown={onKeyDownCheck} onClick={() => {if(!clickOnMe){setTimer(10);setRandomCh(randomChar());setClickOnMe(true);}}} /*setTimer(10);setChanceGone(false);setClickOnMe(true);*/>
                        {
                            !clickOnMe && !chanceGone && (
                                <p>Click on me to start the fun!</p>
                            )
                        }
                        {
                            clickOnMe && (
                                <p>press the {randomCh} key - Timer: {timer}</p>
                            )
                        }
                        {
                            (chanceGone || timer <= 0) && clickOnMe && !isWin &&(
                                <Link href={"/odd_job"}>
                                    <p>You lost! Try it again later:/</p>
                                </Link>
                            )
                        }{
                            chanceGone && isWin && (
                                <Link href={"/fight"}>
                                    <button>Yeah win! You can go to fight</button>
                                </Link>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MinigamePage