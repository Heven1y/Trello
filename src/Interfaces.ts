export interface ITable {
    title: string,
    id: number,
    card: ICard[]
}

export interface ICard {
    title: string,
    description: string,
    auctor: string,
    id: number,
    comment: IComment[]
}

export interface IComment{
    comment: string,
    auctor: string,
    id:number
}