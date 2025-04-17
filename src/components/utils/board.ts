import { JobType } from "../../types/jobTypes";
import { BoardSections, Status } from "../../types/types";
import { getJobsByStatus } from "./tasks";

export const BOARD_SECTIONS = {
    applied: 'APPLIED', 
    rejected: 'REJECTED',
    offer: 'OFFER',
    to_apply: 'TO APPLY',
    no_response: 'NO RESPONSE',
}

export const initializeBoard = (jobs: JobType[]) => {
    const boardSections: BoardSections = {};

    Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
        boardSections[boardSectionKey] = getJobsByStatus(jobs, boardSectionKey as Status);
    });

    return boardSections;
}

export const findBoardSectionContainer = (boardSections: BoardSections, id: string) => {
    if (id in boardSections) {
        return id;
    }

    const container = Object.keys(boardSections).find((key) => boardSections[key].find((item) => item.id === id));
    return container;
}