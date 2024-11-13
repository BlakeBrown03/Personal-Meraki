import { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
	const [data, setData] = useState([]);

	async function fetchData() {
		const response = await fetch("http://localhost:3000/https://api.meraki.com/api/v1/organizations", {
    headers: {
        "X-Cisco-Meraki-API-Key": "e1613b45cd4d8fe315ce194c039381176091a534"
    }
});
		const respData = await response.json();
		setData(respData);
		console.log(respData);
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