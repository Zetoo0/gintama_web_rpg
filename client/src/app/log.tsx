'use client';
import { createContext, useContext, useState, FC } from 'react';
import {Player} from "./Player";
import Router from 'next/navigation';
import {usePlayer} from "./mostmar_valami_tenyleg"
import Link from 'next/link';
import styles from './log.module.css';
import RootLayout from './layout';
const LogRegPage: FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [player,setPlayer] = useState<Player | null>(null);

    const handleLogin = async () => {
        try{
            console.log("Valami?");
            const response = await fetch("http://127.0.0.1:8080/user/login",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    password
                }),
            });

            if(response.ok){
                const data = await response.json();
                const myJsonDat:Player = data as Player;
                sessionStorage.setItem('player', JSON.stringify(myJsonDat));

            }else{
                console.log("Há e van");
            }
        }
        catch (error) {
            console.error("Error on login: ", error);
        }
    }

    const handleRegister = async () => {
        try{
            console.log("Valami?");
            const response = await fetch("http://127.0.0.1:8080/user/register",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    password
                }),
            });
            console.log(response);
        }
        catch (error) {
            console.error("Error on login: ", error);
        }
    }

    console.log(player);
    return(
            <div className={styles.container}>
                <h1 className={styles.title}>Login</h1>
                <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
                className={styles.input}
                />
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.input}
                />
                <Link href={"/profile"}>
                    <button onClick={handleLogin} className={styles.button}>
                        Login
                    </button>
                </Link>

                <button onClick={handleRegister} className={styles.button}>
                    Register
                </button>

            </div>
       
    )
};

export default LogRegPage