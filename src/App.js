/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';


export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      // coletando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }
    loadAll();
  }, []);

  // O QUE ESTARÁ NO RETURN ABAIXO
  // header
  // destaques
  // listas
  // rodapé
  return (
    <div className='page'>
      <section className="lists">
        {movieList.map((item, key) => (
          < MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}