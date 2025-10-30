import React from 'react';
import TVCard from './TVCard';

export default function TVList({ shows, dispatch, ACTIONS }) {
  return (
    <div className="tvlist">
      {shows.map(s => <TVCard key={s.id} show={s} dispatch={dispatch} ACTIONS={ACTIONS} />)}
    </div>
  );
}
