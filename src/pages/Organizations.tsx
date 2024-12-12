import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

export default function Organizations() {
	const [organizations, setOrganizations] = useState<Record<string, any>>([]);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');

	async function fetchOrganizations(): Promise<void> {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations",
			{
				method: "GET",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey,
					"Content-Type": "application/json"
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
					"X-Cisco-Meraki-API-Key": apiKey,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: "Test Organization",
					management: {
						details: [
							{
								name: "Test1",
								value: "12345"
							}
						]
					}
				})
			}
		);
		const data = await response.json();
		console.log(data);
	}

	useEffect(() => {
		fetchOrganizations();
	}, [organizations]);

	return (
		<div style={{ textAlign: "center" }}>
			<h1>Organizations</h1>
			<Button onClick={createOrganization}>Create Organization</Button>
			{organizations["management"] === undefined ? (
				<h5>It looks like you do not have any organizations yet</h5>
			) : (
				organizations["management"].map((organization: any) => {
					return (
						<Table key={organization.id}>
							<tbody>
								<tr>
									<td>
										<b>Name:</b>
									</td>
									<td>{organization.name}</td>
								</tr>
							</tbody>
						</Table>
					);
				})
			)}
		</div>
	);
}
