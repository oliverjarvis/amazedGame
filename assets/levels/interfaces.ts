export interface LevelData
{
    maze: {
        word: string,
        adjacent_to: number[],
    }[]
}

export interface LevelMetadata
{
    id: number;
    difficulty: string;
    title: string;
    data: LevelData;
}