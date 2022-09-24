/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import "./App.css";
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Footer from './components/Footer';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      // coletando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // coletando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  // O QUE ESTARÁ NO RETURN ABAIXO
  // header
  // destaques
  // listas
  // rodapé
  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          < MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />

    </div>
  );
}