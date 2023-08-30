import React, { useState, useEffect } from 'react';
import '../styles/pictures.css';

function Pictures() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); // l'état de la page pour la pagination

  useEffect(() => {
    const loadImages = async () => {
      try {
        const perPage = 10; // Nombre d'images par page
        const apiKey = 'Mf_gG8KFByEzWYHsQk7Ksob6SKBVbLpJfu9bwr7EdkU';
        const apiUrl = `https://api.unsplash.com/search/photos?query=business-work&client_id=${apiKey}&page=${page}&per_page=${perPage}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des images :', error);
      }
    };

    loadImages();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='container'>
      {images.map((image, index) => (
        <img key={index} src={image.urls.small} alt={`pics ${index}`} />
      ))}
    </div>
  );
}

export default Pictures;
