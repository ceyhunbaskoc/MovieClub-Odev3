import React from 'react';

export default function Pagination({ page, totalPages, dispatch, ACTIONS }) {
  return (
    <div className="pagination">
      <button disabled={page===1} onClick={()=>dispatch({type:ACTIONS.SET_PAGE,payload:1})}>İlk</button>
      <button disabled={page===1} onClick={()=>dispatch({type:ACTIONS.SET_PAGE,payload:page-1})}>Geri</button>
      <span>Sayfa {page}/{totalPages}</span>
      <button disabled={page===totalPages} onClick={()=>dispatch({type:ACTIONS.SET_PAGE,payload:page+1})}>İleri</button>
      <button disabled={page===totalPages} onClick={()=>dispatch({type:ACTIONS.SET_PAGE,payload:totalPages})}>Son</button>
    </div>
  );
}
