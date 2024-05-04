'use client'
import React from 'react';
import { useRouter } from 'next/router';
//import LoginPage from './LoginPage';
//import RegisterPage from './RegisterPage';
//import DashboardPage from './DashboardPage';
import { PlayerProvider } from "./mostmar_valami_tenyleg"
import Link from 'next/link';
import { useState } from 'react';
import LogRegPage from './log';
import ProfilePage from "./profile/profile_page"
import RootLayout from './layout';
const App: React.FC = () => {
  const [isProfile,setIsProfile] = useState<boolean>(false);



  return (
    <RootLayout>
      <main>
          <div>
           <LogRegPage/>
          </div>
      </main>
    </RootLayout>
  );
};

export default App;