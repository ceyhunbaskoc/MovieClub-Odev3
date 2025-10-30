import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { FaArrowLeft } from 'react-icons/fa';

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resShow = await api.get(`/shows/${id}`);
      const resEp = await api.get(`/shows/${id}/episodes`);
      setShow(resShow.data);
      setEpisodes(resEp.data);
    };
    fetchData();
  }, [id]);

  if (!show) return <div className="spinner">Yükleniyor...</div>;

  return (
    <div className="detail-page">
      <Link to="/" className="btn btn-primary"><FaArrowLeft /> Geri</Link>
      <h2>{show.name}</h2>
      <div className="detail-grid">
        <div className="poster">
          {show.image ? <img src={show.image.medium} alt={show.name} /> : <div>No Image</div>}
        </div>
        <div className="info">
          <p>Dil: {show.language}</p>
          <p>Tür: {show.genres.join(', ')}</p>
          <p>Puan: {show.rating?.average ?? 'N/A'}</p>
          <div dangerouslySetInnerHTML={{ __html: show.summary || '' }} />
        </div>
      </div>

      <h3>Bölümler</h3>
      <ul className="episodes">
        {episodes.map(ep => (
          <li key={ep.id}>S{ep.season}E{ep.number} - {ep.name}</li>
        ))}
      </ul>
    </div>
  );
}
