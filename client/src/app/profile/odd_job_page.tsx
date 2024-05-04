'use client'
import { FC, useEffect, useState } from 'react';
import Profile from './profile';
import Item from "../Item";
import {Player} from "../Player";
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Job } from './job';
import OddJob from './odd_job';

const OddJobPage: FC = () => {
    const [jobs,setJobs] = useState<Job[]>([]);

    useEffect(()=>{
        
        const fetchJobs = async () => {
            try{
                const response = await fetch('http://127.0.0.1:8080/random_job');
                const data = await response.json();
                setJobs(data);
            }catch(err){
                console.error(err);
            }
        }
        fetchJobs();
    },[])
    console.log(jobs[0]);
    return (
        <div>
        {jobs ? (
          <div>
          <OddJob joblist={jobs["all_job"]}/>
          </div>

        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}

export default OddJobPage;