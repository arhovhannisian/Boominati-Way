import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const Product = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    const fetchproduct = async () => {
        try {
            const response = await axios.get(`https://boominati-way.onrender.com//${id}`);

            setProduct(response.data);

        }catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchproduct();

    }, [])
    if (!product) {
        return <div>Loading</div>
    }

    const productImages = product.images || []

    return (
        <div>
            <span>
                {product.name}


                <Swiper
                    className='w-[200px]'
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={true}
                    loop={true}
                    modules={[Navigation]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
      {/**/}
                    {productImages.map((image, index) => (


                        <SwiperSlide>
                            <img


                                src={image} alt="'img"/>
                        </SwiperSlide>
                    ))}

    </Swiper>
            </span>
        </div>
    );
};

export default Product;