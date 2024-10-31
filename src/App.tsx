import { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
	const [data, setData] = useState([]);

	async function fetchData() {
		const response = await fetch(
			"https://api.meraki.com/api/v1/organizations",
			{
				headers: {
					"X-Cisco-Meraki-API-Key":
						"e6d6f7f6e1a2f7c6c0a8e7f6e1e6f6e1e6f6e1e6"
				}
			}
		);
		const data = await response.json();
		setData(data);
		console.log(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Button>Hello</Button>
		</>
	);
}

export default App;