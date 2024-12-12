import { useEffect, useState } from "react";

export default function Organizations() {
	const [organizations, setOrganizations] = useState([]);
	const apiKey = sessionStorage.getItem("apiKey");

	async function fetchOrganizations(): Promise<void> {
		console.log(apiKey);
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations",
			{
				method: "GET",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey || ""
				}
			}
		);
		const data = await response.json();
		console.log(data);
		setOrganizations(data);
	}

	useEffect(() => {
		fetchOrganizations();
	}, []);
	return (
		<div style={{ textAlign: "center" }}>
			<h1>Organizations</h1>
			{organizations.length === 0 ? (
				<h5>It looks like you do not have any organizations yet</h5>
			) : (
				organizations.map((organization: any) => {
					return (
						<div key={organization.id}>
							<h2>{organization.name}</h2>
							<p>{organization.id}</p>
						</div>
					);
				})
			)}
		</div>
	);
}
