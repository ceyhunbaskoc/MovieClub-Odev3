import React from 'react';

export default function WatchlistPanel({ watchlist, dispatch, ACTIONS }) {
  return (
    <div className="watchlist">
      <h3>Gösterime Girecekler ({watchlist.length})</h3>
      
      {watchlist.length === 0 && <p className="empty">Listeye eklenmiş yapım yok.</p>}
      
      <ul>
        {watchlist.map(w => (
          <li key={w.id}>
            {w.image && <img src={w.image.medium} alt={w.name} />}
            <span>{w.name}</span>
            <button 
              className="remove-btn"
              onClick={()=>dispatch({type:ACTIONS.REMOVE_WATCHLIST,payload:w.id})}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      
      {watchlist.length > 0 && (
        <button 
          className="clear-btn"
          onClick={()=>dispatch({type:ACTIONS.CLEAR_WATCHLIST})}
        >
          Listeyi Temizle
        </button>
      )}
    </div>
  );
}