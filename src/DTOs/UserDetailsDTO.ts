import type { GroupDetailsDTO } from "./GroupDetailsDTO.js";

export interface UserDetailsDTO {
    userId: string;
    personalGoal: number;
    personalProgress: number;
    groupInfo: GroupDetailsDTO;
}
