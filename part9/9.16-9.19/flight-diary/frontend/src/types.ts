

export interface DiaryType {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment?: string,
  }


  export type NewDiaryType = Omit<DiaryType, 'id'>