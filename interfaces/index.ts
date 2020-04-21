export type Resource = {
    name: string,
    publisher: string,
    location: string,
    date: string,
    type?: string,
    // todo add link
}

export type Criteria = {
    audience: string,
    resourceType: string,
    topic: string,
    location: string
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
    location: {
        name: 'Location',
        options: [
            'BC',
            'Canada',
            'World Wide'
        ]
    },
    resourceType: {
        name: 'Resource Type',
        options: [
            'Guide',
            'Website',
            'Pamphlet'
        ]
    },
    audience: {
        name: 'Audience',
        options: [
            'Nurses',
            'Hospitals',
            'Eveeryone'
        ]
    }
}