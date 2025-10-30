import React from 'react';
import { FaPlus, FaInfoCircle, FaStar } from 'react-icons/fa';

const TVCard = ({ show, dispatch, ACTIONS }) => {
  const summary = show.summary?.replace(/<[^>]+>/g, '').slice(0, 100) + '...' || 'Açıklama mevcut değil.';
  
  const genres = show.genres?.slice(0, 2) || [];
  const language = show.language;
  const rating = show.rating?.average || 0;

  return (
    <div className="tvcard">
      <div className="poster">
        {show.image?.medium ? (
          <img src={show.image.medium} alt={show.name} />
        ) : (
          <div className="no-image">Poster Yok</div>
        )}
      </div>

      <div className="meta">
        <h4>{show.name}</h4>
        
        <div className="tags">
          {genres.map(g => <span key={g} className="tag">{g}</span>)}
          {language && <span className="tag">{language}</span>}
          {rating > 0 && (
            <span className="tag rating">
              <FaStar size={12} style={{ marginRight: '4px' }} /> {rating}
            </span>
          )}
        </div>

        <p className="summary">{summary}</p>

        <div className="actions">
          <a className="btn btn-primary" href={`/show/${show.id}`}>
            <FaInfoCircle /> Detay
          </a>
          <button
            className="btn btn-warning"
            onClick={() => dispatch({ type: ACTIONS.ADD_WATCHLIST, payload: show })}
          >
            <FaPlus /> Gösterime Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;