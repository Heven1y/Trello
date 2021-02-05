export interface IList {
    title: string,
    id: number,
    cards: ICard[]
}

export interface ICard {
    title: string,
    description: string,
    auctor: string,
    id: number,
    comments: IComment[]
}

export interface IComment{
    comment: string,
    auctor: string,
    id:number
}