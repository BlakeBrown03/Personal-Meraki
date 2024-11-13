import { useEffect, useState } from "react";
import "./App.css";
import NetworkCard from "./NetworkCard";

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
			<h1 style={{textAlign: "center"}}>Welcome to Meraki API</h1>
			{networks.map((network: any) => <NetworkCard id={network.id}>{...network}</NetworkCard>)}
		</>
	);
}

export default App;
