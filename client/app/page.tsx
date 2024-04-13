import Image from "next/image";
import ProfilePage  from './profile_page';
import FightingPage from './fpage';
import Profile from "./profile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <ProfilePage />
      </div>

      
    </main>
  );
}
