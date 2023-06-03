import React, { useEffect, useState } from 'react';
import Diary from './components/diary';
import { DiaryType } from './types';
import diaryService from './services/diaryService';
import DiaryForm from './components/diaryForm';




const App = () => {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);




  useEffect(() => {
    diaryService
    .getDiaries()
    .then(response => {
  setDiaries(response)
})
  }, [diaries])

  return (
<div>
<h2>Add new entry</h2>
      <DiaryForm />
      <h2>Diary entries</h2>
  {
    diaries.map(diary => (
      <Diary key={diary.id} diary={diary} />
    ))
  }
</div>
  )
}

export default App ;
