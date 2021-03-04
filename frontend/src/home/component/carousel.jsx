import React from "react";
import { Link } from "react-router-dom";
import  style from './carousel.module.css';
const CarouselComponent = () => (
	
	<div className={style.carouselContainer} style={{ marginleft: "0" }}>
		<div className={style.mainSlider} style={{
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat'
		}} >
			<div className="container fill_height">
				<div className="row align-items-center fill_height">
					<div className="col">
						<div className={style.mainSliderContent}>
							<h6 style={{color:'white'}}>We find the best for your PET</h6>
							<h1 style={{color:'white'}}>Get up to 30% Off New Arrivals</h1>
							<div className={style.redButton}><Link to="shop">shop now</Link></div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

);

export default CarouselComponent;