'use client';
import React, { createContext, useContext, useState } from 'react';
import {Player} from './Player';
interface PlayerContextType {
  player: Player | null;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [player, setPlayer] = useState<Player | null>(null);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
      throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
  };