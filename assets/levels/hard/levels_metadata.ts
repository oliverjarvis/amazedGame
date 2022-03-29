import { LevelMetadata } from "../interfaces"

export const hardlevels: LevelMetadata[] = 
    [      
        {
            id: 0,
            difficulty: "hard",
            title: 'Mine',
            data: require('./data1.json')
        },
        {
            id: 1,
            difficulty: "hard",
            title: 'Snow',
            data: require('./data2.json')
        },
        {
            id: 2,
            difficulty: "hard",
            title: 'Blow',
            data: require('./data1.json')
        }
    ]
