export enum CompletionType{
    locked = "l",
    unlocked = "u",
    completed = "c",
    perfected = "p"
};

export interface LevelMeta{
    levelID: string;
    levelDifficulty: string;
    levelName: string;
    completionType: CompletionType
};

export interface GameState{
    activeLevel: string,
    levels: LevelMeta[]
};