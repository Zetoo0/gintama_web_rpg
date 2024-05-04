import { FC, useState } from 'react';
import styles from './profile.module.css';
import Item from "../Item";
import { Player } from "../Player";
import { usePlayer } from "../mostmar_valami_tenyleg";
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Job } from './job';

interface OddJobProps {
  joblist: Job[];
}

const OddJob: FC<OddJobProps> = ({ joblist }) => {
  console.log("Jobs in odd_job_page: ", joblist);

  const acceptJob = (job : Job) => {
    
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
                <button>Accept</button>
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
</div>
  );
};

export default OddJob;