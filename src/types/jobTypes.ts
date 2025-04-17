export interface JobType {
    id: string;
    position: string;
    company: string;
    location: string;
    salary: string;
    status: string;
}

export interface JobProps {
    index: number,
    job: JobType
}

export interface JobListProps {
    jobs: JobType[]
}