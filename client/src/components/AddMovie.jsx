
import React , {useState} from 'react';

var AddMovie = (props) => {

  const[title, setTitle]= useState('');
  const handleTitle = (event) => {
    setTitle(event.target.value);
  }
  const handleAddClick =() => {
    props.onAdd(title);
  }
  return (
    <div>
      <input type="text" placeholder="Add movie title here" value={title} onChange={handleTitle} />
      <button onClick={handleAddClick}>Add</button>
    </div>
  )
}

export default AddMovie;