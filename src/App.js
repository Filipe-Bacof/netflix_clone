/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import "./App.css";
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      // coletando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // coletando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      console.log(chosen);
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

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          < MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}