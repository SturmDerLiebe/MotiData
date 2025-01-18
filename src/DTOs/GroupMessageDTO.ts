export interface BaseGroupMessageDTO {
    timestamp: string;
    content: string;
    //TODO: Research which Image Types are returned by Expo and Browser Camera, e.g. Blob or a Stream;
    type: "TEXT" | "IMAGE";
    isMotiMateMessage: boolean;
}

export interface GroupMessageDTO extends BaseGroupMessageDTO {
    messageId: string;
    authorId: string | null;
    content: string;
    clapCount: number;
}
