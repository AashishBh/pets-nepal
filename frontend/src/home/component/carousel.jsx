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
							<h1 style={{color:'white'}}>We find the best for your PET</h1>
							<div className={style.redButton}><a href="/shop">shop now</a></div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

);

export default CarouselComponent;