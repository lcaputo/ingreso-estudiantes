export interface IFetchData<T> {
    data: T,
    message: string,
    status: number
}

export interface IData {
    linear_graph_per_hour: string[] | (string | number)[][],
    peopleInside: number,
    people_last_24h: number
}
  