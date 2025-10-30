import React, { useState, useEffect } from 'react';

export default function SearchBox({ state, dispatch, ACTIONS }) {
  
  const [val, setVal] = useState(state.query === 'friends' ? '' : state.query);

  useEffect(() => {
    const queryValue = state.query === 'friends' ? '' : state.query;
    setVal(queryValue);
  }, [state.query]); 

  useEffect(() => {
    
    const handler = setTimeout(() => {
      dispatch({ type: ACTIONS.SET_QUERY, payload: val || 'friends' });
    }, 400);

    return () => {
      clearTimeout(handler);
    };
    
  }, [val, dispatch, ACTIONS]); 

  return (
    <div className="searchbox">
      <input 
        value={val} 
        onChange={e => setVal(e.target.value)}
        placeholder="Dizi ara (örn: star, batman)" 
      />
      <button type="submit">Ara</button>
    </div>
  );
}