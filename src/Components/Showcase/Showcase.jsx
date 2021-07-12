import React from 'react'
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import { db } from '../../firebase';
import styles from './Showcase.module.scss'
import ShowcaseProduct from '../ShowcaseProduct';
import Product from '../Product';


const Showcase = () => {
    const { id } = useParams();
    const [showcase, setShowcase] = useState([{}]);

        useEffect(() => {
        db.collection('products').onSnapshot(snapshot => (
            setShowcase(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).filter((item) => item.id === id)
        )))
    }, []
    )


    return (
        <div>
            {showcase.map(({id, title, price, image, rating, description}) => (
                    <ShowcaseProduct id={id} title={title} price={price} image={image} rating={rating} description={description}/>
                ))}
        </div>
    )
        }

export default Showcase
