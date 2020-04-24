export type Resource = {
    name: string,
    publisher: string,
    origin: string,
    date: string,
    type?: string,
    link: string
}

export type Criteria = {
    audience: string,
    resourceType: string,
    topic: string,
    origin: string
}

export type CriteriaType = keyof Criteria
export type CriteriaData = {
    name: string,
    options: string[]
}

export type CriteriaDataTable = Record<CriteriaType, CriteriaData>

export const criteriaDataTable: CriteriaDataTable = {
    topic: {
        name: 'Topic',
        options: [
            'A',
            'B',
            'C'
        ]
    },
    origin: {
        name: 'Origin',
        options: []
    },
    resourceType: {
        name: 'Resource Type',
        options: []
    },
    audience: {
        name: 'Audience',
        options: []
    }
}
