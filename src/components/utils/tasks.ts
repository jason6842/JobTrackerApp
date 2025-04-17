import { JobType } from "../../types/jobTypes";
import { Status } from "../../types/types";

export const getJobsByStatus = (jobs: JobType[], status: Status) => {
    return jobs.filter((job: JobType) => job.status === status);
};

export const getJobById = (jobs: JobType[], id: string) => {
    return jobs.find((job: JobType) => job.id === id);
};