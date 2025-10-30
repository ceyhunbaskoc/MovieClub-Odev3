import React from 'react';
import SearchBox from '../components/SearchBox';
import Filters from '../components/Filters';
import TVList from '../components/TVList';
import WatchlistPanel from '../components/WatchlistPanel';
import Pagination from '../components/Pagination';

export default function Home({ state, dispatch, fetchShows, ACTIONS }) {
  const { loading, error, data, filters, page, pageSize } = state;

  const filtered = data.filter(show => {
    if (filters.genre !== 'All' && !show.genres.includes(filters.genre)) return false;
    if (filters.language !== 'All' && show.language !== filters.language) return false;
    if ((show.rating?.average || 0) < filters.minRating) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const handleReset = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SET_QUERY, payload: 'friends' });
    dispatch({ 
      type: ACTIONS.SET_FILTERS, 
      payload: { genre: 'All', language: 'All', minRating: 0 } 
    });
  };

  return (
    <div className="container">
      <header className="topbar">
        <h1>Kampüs Film Kulübü</h1>
        <a href="/" className="top-link">Ana Sayfa</a>
      </header>

      <div className="controls-bar">
        <SearchBox state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
        <a href="#" onClick={handleReset} className="reset-link">Sıfırla</a>
        <Filters data={data} filters={filters} dispatch={dispatch} ACTIONS={ACTIONS} />
      </div>

      <div className="main">

        <section className="content">
          {loading && <div className="spinner">Yükleniyor...</div>}

          {error && (
            <div className="error">
              <p>Bir hata oluştu: {error}</p>
              <button 
                className="btn btn-warning"
                style={{marginTop: '12px'}}
                onClick={() => fetchShows(state.query)}
              >
                Tekrar Dene
              </button>
            </div>
          )}

          {!loading && !error && pageItems.length === 0 && <div className="empty">Sonuç bulunamadı</div>}
          
          {!loading && !error && pageItems.length > 0 && (
            <>
              <TVList shows={pageItems} dispatch={dispatch} ACTIONS={ACTIONS} />
              <Pagination page={page} totalPages={totalPages} dispatch={dispatch} ACTIONS={ACTIONS} />
            </>
          )}
        </section>

        <aside className="right-panel">
          <WatchlistPanel watchlist={state.watchlist} dispatch={dispatch} ACTIONS={ACTIONS} />
        </aside>
      </div>
    </div>
  );
}