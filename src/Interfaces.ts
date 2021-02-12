export interface IList {
    title: string,
    id: number,
    cards: ICard['id'][]
}

export interface ICard {
    title: string,
    description: string,
    auctor: string,
    id: number,
    comments: IComment['id'][]
}

export interface IComment{
    comment: string,
    auctor: string,
    id:number
}