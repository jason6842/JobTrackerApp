import { JobProps } from '../types/jobTypes'

function Job({ index, job }: JobProps) {
    const {id, position, location, salary, status } = job;
  return (
    <div className='job-tracker-item' key={id}>
    {index + 1}. {position} Location: {location} Salary: {salary} Status: {status}
  </div>
  )
}

export default Job