'use client'
import Image from "next/image";
import ProfilePage from './profile_page';
import { FC , useState } from 'react';
import Profile from "./profile";
import OddJobPage from "./odd_job_page";
import { PlayerProvider } from "../mostmar_valami_tenyleg";
import React from 'react'
import ReactDOM from 'react-dom'
import LogRegPage from "../log";
import App from '../App'
import RootLayout from "../layout";
import styles from "./page.module.css"
export default function ProfPage() {
  const [job,setJob] = useState<boolean>(false);

  const changeJob = () => {
    setJob(!job);
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={styles.centeredMenu}>
          {!job && (
                  <ProfilePage/>
                )}
                <button onClick={() =>changeJob()}>Anyád</button>
                {job  && (
                  <>
                  <OddJobPage/>
                  </>
                )}
        </div>

      </main>

  );
}