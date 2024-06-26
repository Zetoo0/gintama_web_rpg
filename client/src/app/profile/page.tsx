'use client'
import Image from "next/image";
import ProfilePage from './profile_page';
import { FC , useState } from 'react';
import Profile from "./profile";
import OddJobPage from "../odd_job/odd_job_page";
import { PlayerProvider } from "../mostmar_valami_tenyleg";
import React from 'react'
import ReactDOM from 'react-dom'
import LogRegPage from "../log";
import App from '../App'
import RootLayout from "../layout";
import styles from "./page.module.css"
import MinigamePage from "../minigame/minigame";
import { MinigameType } from "../MinigameType";
import Link from 'next/link';
export default function ProfPage() {
  const [job,setJob] = useState<boolean>(false);
  const [minigame,setMinigame] = useState<boolean>(true);

  const changeJob = () => {
    setJob(!job);
  }
  
  const changePlayerProfileSession = () => {
    const myJsonDat:Player = data as Player;
    sessionStorage.setItem('player', JSON.stringify(myJsonDat));
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.centeredMenu}>
          <ProfilePage/>
        </div>

      </main>

  );
}