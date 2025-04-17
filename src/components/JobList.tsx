import { JobListProps, JobType } from '../types/jobTypes';
import Job from './Job';


function JobList({ jobs }: JobListProps) {
  return (
    <>
        {jobs.map((job: JobType, index: number) => {
          return (
            <Job index={index} job={job} key={job.id}/>
          )
        })}
    </>
  )
}

export default JobList