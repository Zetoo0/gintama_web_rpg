import Image from "next/image";
import { PlayerProvider } from "./mostmar_valami_tenyleg";
import React from 'react'
import ReactDOM from 'react-dom'
import LogRegPage from "./log";
import App from './App'
import RootLayout from "./layout";
import styles from './main.module.css';

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <React.StrictMode>
            <App/>
        </React.StrictMode>

        {/*<ProfilePage />*/}
      </div>


      </main>
  );
}
