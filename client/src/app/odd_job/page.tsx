'use client'
import Image from "next/image";
import { FC , useState } from 'react';
import OddJobPage from "./odd_job_page";
import { PlayerProvider } from "../mostmar_valami_tenyleg";
import React from 'react'
import ReactDOM from 'react-dom'
import LogRegPage from "../log";
import App from '../App'
import RootLayout from "../layout";
import styles from "../profile/page.module.css"
import MinigamePage from "../minigame/minigame";
import { MinigameType } from "../MinigameType";
import Link from 'next/link';
import OddJob from "./odd_job";
export default function OJobPage() {
  const [job,setJob] = useState<boolean>(false);
  const [minigame,setMinigame] = useState<boolean>(true);

  const changeJob = () => {
    setJob(!job);
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.centeredMenu}>
          <OddJobPage/>
          <Link href={"/profile"}>
            <button>Profile</button>
          </Link>
        </div>

      </main>

  );
}