import type { GroupMemberProfileDTO } from "./GroupMemberDTO.js";

export interface GroupDetailsDTO {
    groupName: string;
    members: GroupMemberProfileDTO[];
    inviteCode: string;
}
