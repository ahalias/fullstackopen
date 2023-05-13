const PersonForm = ({onsubmit, nameValue, nameOnChange, numberValue, numberOnchange}) => <form onSubmit={onsubmit}>
<div>
  name: <input value={nameValue} onChange={nameOnChange}/>
</div>
<div>
  number: <input value={numberValue} onChange={numberOnchange}/>
  </div>
<div>
  <button type="submit">add</button>
</div>
</form>

export default PersonForm