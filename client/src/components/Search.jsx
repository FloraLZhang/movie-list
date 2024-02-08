
import React , { useState } from 'react';

var Search = (props) => {
  const [input, setInput]= useState("");

  const handleInput = (event) => {
    setInput(event.target.value);
  }

  //Button click handler
  const handleSearchClick =() => {
    props.handleSearch(input);
  };

  return (
    <div>
      <input type="text" placeholder="Search..." value={input} onChange={handleInput} />
      <button onClick={handleSearchClick}>Go!</button>
    </div>
  )

};

export default Search;