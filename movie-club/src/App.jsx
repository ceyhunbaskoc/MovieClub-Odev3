import React, { useEffect, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from './api';
import { reducer, initialState, ACTIONS } from './reducer';
import Home from './pages/Home';
import ShowDetail from './pages/ShowDetail';
import Footer from './components/Footer';
import './styles.css';

const localWatchlist = localStorage.getItem('movieclub_watchlist');
const parsedWatchlist = localWatchlist ? JSON.parse(localWatchlist) : [];

function App() {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    watchlist: parsedWatchlist,
  });

  useEffect(() => {
    localStorage.setItem('movieclub_watchlist', JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  const fetchShows = async (query) => {
    dispatch({ type: ACTIONS.FETCH_INIT });
    try {
      const res = await api.get(`/search/shows?q=${encodeURIComponent(query)}`);
      const shows = res.data.map(item => item.show);
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: shows });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_FAILURE, payload: err.message });
    }
  };

  useEffect(() => {
    fetchShows(state.query);
  }, [state.query]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              state={state}
              dispatch={dispatch}
              fetchShows={fetchShows}
              ACTIONS={ACTIONS}
            />
          }
        />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
      <Footer name="Ad Soyad" />
    </div>
  );
}

export default App;
