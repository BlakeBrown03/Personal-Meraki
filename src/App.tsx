import { useEffect, useState } from "react";
import "./App.css";
import NetworkCard from "./NetworkCard";
import { Row } from "react-bootstrap";

function App() {
	const [networks, setNetworks] = useState([]);

	async function fetchData() {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/networks",
			{
				headers: {
					"X-Cisco-Meraki-API-Key":
						"e1613b45cd4d8fe315ce194c039381176091a534"
				}
			}
		);
		const respData = await response.json();
		setNetworks(respData);
		console.log(respData);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Welcome to Meraki API</h1>
			{networks.map((network: any) => (
				<Row key={network.id} xs={12} s={6} m={4} l={4} xl={4}>
					<NetworkCard {...network}></NetworkCard>
				</Row>
			))}
		</>
	);
}

export default App;
