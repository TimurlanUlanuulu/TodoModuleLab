export interface ITasks {
    id: number,
    title: string,
    desc: string,
    completed: boolean,
    inBasket: boolean,
    columnId: number
}

export interface IColumn {
    id: number,
    title: string
}