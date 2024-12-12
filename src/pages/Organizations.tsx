import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function Organizations() {
	const [organizations, setOrganizations] = useState<Record<string, any>>([]);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');

	async function fetchOrganizations(): Promise<void> {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations",
			{
				method: "GET",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const data = await response.json();
		setOrganizations(data);
	}

	async function createOrganization(): Promise<void> {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations",
			{
				method: "POST",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const data = await response.json();
		console.log(data);
	}

	useEffect(() => {
		fetchOrganizations();
	}, []);
	return (
		<div style={{ textAlign: "center" }}>
			<h1>Organizations</h1>
			<Button onClick={createOrganization}>Create Organization</Button>
			{organizations["management"] === undefined ? (
				<h5>It looks like you do not have any organizations yet</h5>
			) : (
				<></>
			)}
		</div>
	);
}
