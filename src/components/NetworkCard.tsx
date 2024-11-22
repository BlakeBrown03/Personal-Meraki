import { useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import Device from "./Device";

export default function NetworkCards(props: any) {
	const [networkData, setNetworkData] = useState<any>([]);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');

	async function handleNetworkClick(): Promise<void> {
		const fetchData = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/devices/?networkIds[]=${props.id}`,
			{
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const respData = await fetchData.json();
		setNetworkData(respData);
		console.log(respData);
	}

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>{props.name}</Accordion.Header>
				<Accordion.Body onEnter={handleNetworkClick}>
					<Table>
						<thead>
							<tr>
								<th>hostname</th>
								<th>product type</th>
								<th>model</th>
								<th>lan IP</th>
								<th>mac</th>
								<th>serial</th>
							</tr>
						</thead>
						<tbody>
							{networkData.map((device: any) => {
								return (
									<Device
										{...device}
										key={device.name}></Device>
								);
							})}
						</tbody>
					</Table>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}
