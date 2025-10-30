import React, { useMemo } from 'react';

export default function Filters({ data, filters, dispatch, ACTIONS }) {
  const genres = useMemo(() => ['All', ...new Set(data.flatMap(d => d.genres || []))], [data]);
  const languages = useMemo(() => ['All', ...new Set(data.map(d => d.language || 'Unknown'))], [data]);
  
  const genreOptions = genres.map(g => (
    <option key={g} value={g}>{g === 'All' ? 'Tür (Hepsi)' : g}</option>
  ));
  
  const langOptions = languages.map(l => (
    <option key={l} value={l}>{l === 'All' ? 'Dil (Hepsi)' : l}</option>
  ));

  return (
    <div className="filters">
      
      <select value={filters.genre} onChange={(e)=>dispatch({type:ACTIONS.SET_FILTERS,payload:{genre:e.target.value}})}>
        {genreOptions}
      </select>

      <select value={filters.language} onChange={(e)=>dispatch({type:ACTIONS.SET_FILTERS,payload:{language:e.target.value}})}>
        {langOptions}
      </select>
      
      <input 
        type="number" 
        min="0" 
        max="10" 
        step="0.1"
        placeholder="Min. Puan"
        value={filters.minRating === 0 ? '' : filters.minRating}
        onChange={(e)=>dispatch({type:ACTIONS.SET_FILTERS,payload:{minRating:Number(e.target.value) || 0}})} 
      />
    </div>
  );
}