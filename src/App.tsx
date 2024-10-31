import { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
	const [data, setData] = useState([]);

	async function fetchData() {
		const response = await fetch("/api/organizations", {
    headers: {
        "X-Cisco-Meraki-API-Key": "e6d6f7f6e1a2f7c6c0a8e7f6e1e6f6e1e6f6e1e6"
    }
});
		console.log("response status: ", response.status);
		console.log("response headers: ", response.headers);
		const respData = await response.json();
		setData(respData);
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