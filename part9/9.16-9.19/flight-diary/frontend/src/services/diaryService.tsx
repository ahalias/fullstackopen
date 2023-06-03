import axios from "axios"
import { DiaryType, NewDiaryType } from "../types"


const baseUrl = 'http://localhost:3000/api/diaries'


const getDiaries = async () => {
    const response = await axios.get<DiaryType[]>(`${baseUrl}`)
    return response.data
}

const postDiary = async (diary: NewDiaryType) => {
    try {
        const response = await axios.post<DiaryType[]>(`${baseUrl}`, diary)
        return response.data
    
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.status)
          console.error(error.response);
          return error.response
        } else {
          console.error(error);
        }
    }

}


export default { getDiaries, postDiary }