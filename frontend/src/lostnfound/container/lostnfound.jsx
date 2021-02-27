import React, { useState } from "react";
import { Tabs, Tab, Container, Button } from "react-bootstrap";
import Lost from "../components/lost";
import Found from "../components/found";

const LostNFound = ({ currentUser }) => {
	const [key, setKey] = useState("lost");

	return (
		<Container>
			<Tabs
				id="controlled-tab-example"
				activeKey={key}
				onSelect={(k) => setKey(k)}
			>
				<Tab
					eventKey="lost"
					title={<Button variant="dark"> Lost </Button>}
				>
					<Lost />
				</Tab>
				<Tab
					eventKey="found"
					title={<Button variant="dark"> Found </Button>}
				>
					<Found />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default LostNFound;
