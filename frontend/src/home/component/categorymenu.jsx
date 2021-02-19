import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";

const CategoryMenu = () => (
	<Container>
		<Row>
			<Col><Link to="/shop/cats"><Image src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg" roundedCircle style={{"width":"200px","height":"200px"}} /></Link></Col>
			<Col><Link to="/shop/dogs"><Image src="https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186__340.jpg" roundedCircle style={{"width":"200px","height":"200px"}} /></Link></Col>
			<Col><Link to="/shop/fish"><Image src="https://cdn.pixabay.com/photo/2016/12/31/21/22/discus-fish-1943755__340.jpg" roundedCircle style={{"width":"200px","height":"200px"}} /></Link></Col>
			<Col><Link to="/shop/others"><Image src="https://cdn.pixabay.com/photo/2016/10/26/22/00/hamster-1772742__340.jpg" roundedCircle style={{"width":"200px","height":"200px"}} /></Link></Col>
		</Row>
	</Container>
);

export default CategoryMenu;
