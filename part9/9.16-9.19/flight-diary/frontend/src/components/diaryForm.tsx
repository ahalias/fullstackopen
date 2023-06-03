import { ChangeEvent, useState } from "react"
import diaryService from "../services/diaryService"
import { NewDiaryType } from "../types"


const DiaryForm = () => {

    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')
    const [notification, setNotification] = useState(null)


    const diaryAddHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const newDiary: NewDiaryType = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }
        diaryService
        .postDiary(newDiary)
        .catch((error) => {
            console.log(error)
            setNotification(error);
          });
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
    }

    const handleVisibilityOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value);
      };
      const handleWeatherOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value);
      };

return (
    <div>
<div>{notification}</div>
<form onSubmit={diaryAddHandler} >
   date: <input 
    type="date"
    value={date}
    onChange={(event) => setDate(event.target.value) }
    /><br />
        visibility: 
        <label>
        <input type="radio" value="great" checked={visibility === 'great'}  onChange={handleVisibilityOptionChange} />
        great</label>
        <label>
        <input type="radio" value="good" checked={visibility === 'good'}  onChange={handleVisibilityOptionChange} />
        good</label>
        <label>
        <input type="radio" value="ok" checked={visibility === 'ok'}  onChange={handleVisibilityOptionChange} />
        ok</label>
        <label>
        <input type="radio" value="poor" checked={visibility === 'poor'}  onChange={handleVisibilityOptionChange} />
        poor</label>
        
        <br />
    weather: 
    <label>
        <input type="radio" value="sunny" checked={weather === 'sunny'}  onChange={handleWeatherOptionChange} />
        sunny</label>
        <label>
        <input type="radio" value="rainy" checked={weather === 'rainy'}  onChange={handleWeatherOptionChange} />
        rainy</label>
        <label>
        <input type="radio" value="cloudy" checked={weather === 'cloudy'}  onChange={handleWeatherOptionChange} />
        cloudy</label>
        <label>
        <input type="radio" value="stormy" checked={weather === 'stormy'}  onChange={handleWeatherOptionChange} />
        stormy</label>
        <label>
        <input type="radio" value="windy" checked={weather === 'windy'}  onChange={handleWeatherOptionChange} />
        windy</label>
<br />
    comment: <input 
    type="text"
    value={comment}
    onChange={(event) => setComment(event.target.value) }
    /><br />
    <button type="submit">add Diary</button>
</form>
</div>
)
}


export default DiaryForm