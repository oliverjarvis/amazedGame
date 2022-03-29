import { LevelMetadata } from "../interfaces"

export const normallevels: LevelMetadata[] = 
    [      
        {
            id: 0,
            difficulty: "normal",
            title: 'Mine',
            data: require('./data1.json')
        },
        {
            id: 1,
            difficulty: "normal",
            title: 'Snow',
            data: require('./data2.json')
        },
        {
            id: 2,
            difficulty: "normal",
            title: 'Blow',
            data: require('./data1.json')
        }
    ]
