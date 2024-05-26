import { FC, useState } from 'react';
import styles from './profile.module.css';
import Item from "../Item";
import { Player } from "../Player";
import { usePlayer } from "../mostmar_valami_tenyleg";
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Job } from './job';
import { MinigameType } from '../MinigameType';

interface OddJobProps {
  joblist: Job[];
}

interface MiniIngameProp{
  isPlaying: boolean;
  isWon: boolean;
}

const OddJob: FC<OddJobProps> = ({ joblist }) => {
  const [info,setInfo] = useState<boolean>(false);  
  const [infoJob, setInfoJob] = useState<Job | null>(null);
  const [minigameInfo, setMinigameInfo] = useState<MiniIngameProp>({isPlaying: false, isWon: false});

  console.log("Jobs in odd_job_page: ", joblist);

  const acceptJob = (job : Job) => {
    console.log("Anyádra kattintottál: ",job.job_name);
  }

  const showInfo = (job : Job) => {
    setInfoJob(job);
    setInfo(!info);
  }

  return (
    <div className={styles.jobList}>
    {joblist?.map((job, index) => (
        <div key={index} className={styles.job}>
            <div className={styles.jobDetails}>
                <h3>{job.job_name}</h3>
                <p>{job.quest_giver.character_name}</p>
                <p>{job.reward.toString()}</p>
                <p>{job.job_enemies}</p>
                <button onClick={() => acceptJob(job)}>Accept</button>
                <button onClick={() => showInfo(job)}>Show</button>
            </div>

            <div className={styles.table}>
                {/*
                <pre>          {`
                _______
               /       \\
              /         \\
             /    ___    \\
            /    |___|    \\
           /_____________\\
           `}</pre>
                 Ide kerül az asztal ASCII art */}
            </div>
        </div>
    ))}
      <div>
        {
          info && (
            <>
              <p>Quest giver : {infoJob?.quest_giver.character_name}</p>
              <p>Enemies : {infoJob?.job_enemies}</p>
              <p>Reward : {infoJob?.reward.toString()}</p>
            </>
            )
        }
      </div>
</div>
  );
};

export default OddJob;