export enum CompletionType{
    locked = "l",
    unlocked = "u",
    completed = "c",
    perfected = "p"
};

export interface LevelMeta{
    levelID: string;
    completionType: CompletionType
};

export interface GameState{
    activeLevel: string,
    levels: LevelMeta[]
};