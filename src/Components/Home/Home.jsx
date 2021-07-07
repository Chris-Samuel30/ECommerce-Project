import React from 'react'
import styles from './Home.module.scss';
import Banner from '../../Assets/Prime.jpg'
import Product from '../Product'
import Xbox from '../../Assets/Xbox_Series_Black.jpg'
import Nvidia from '../../Assets/Nvidia_Banner.jpg'
import MSI from '../../Assets/MSI.jpg'
import PS5 from '../../Assets/Playstation_Spiderman_Banner.jpg'
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        db.collection('products').onSnapshot(snapshot => (
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        ))
    }, []
    )

    return (
        <div className={styles.home}>
            <div className={styles.home__container}>
                <Carousel showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={8000} transitionTime={1500}>
                    <div>
                    <img className={styles.home__banner} src={PS5}/>
                    </div>
                    <div>
                    <img className={styles.home__banner} src={Banner}/>
                    </div>
                    <div>
                    <img className={styles.home__banner} src={Nvidia}/>
                    </div>
                    <div>
                    <img className={styles.home__banner} src={MSI}/>
                    </div> 
                </Carousel>                 
                <div className={styles.home__grid}>
                {products.map(({id, title, price, image, rating}) => (
                    <Product id={id} title={title} price={price} image={image} rating={rating}/>
                ))}
                {console.log(products)}
                </div>
            </div>
        </div>
    )
}

export default Home
