import { DiaryType } from '../types';



const Diary = ( { diary }: { diary: DiaryType } ) => {

    return (
    <div>
      <h3>{diary.date}</h3>
      <p>{diary.weather}</p>
      <p>{diary.visibility}</p>
    </div>
  )
  }

  export default Diary