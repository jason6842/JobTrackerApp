import { JobType } from "./jobTypes";

export type Status = 'applied' | 'rejected' | 'offer' | 'to apply' | 'no response';

export type BoardSections = {
    [name: string]: JobType[];
}
