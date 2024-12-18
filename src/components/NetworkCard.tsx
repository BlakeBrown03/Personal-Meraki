import { useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import Device from "./Device";

export default function NetworkCards(props: any) {
	const [networkData, setNetworkData] = useState<any>([]);
	const [emptyNetwork, setEmptyNetwork] = useState<boolean>(false);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const orgIds = JSON.parse(sessionStorage.getItem("orgIds") || '""');

	async function handleNetworkClick(): Promise<void> {
		const fetchData = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/${orgIds[0]}/devices/?networkIds[]=${props.id}`,
			{
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const respData = await fetchData.json();
		if (respData.length === 0) {
			setEmptyNetwork(true);
		}
		setNetworkData(respData);
		// console.log(respData);
	}

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>{props.name}</Accordion.Header>
				<Accordion.Body onEnter={handleNetworkClick}>
					{emptyNetwork ? (
						<h6>There are no devices on this network</h6>
					) : (
						<Table responsive>
							<thead>
								<tr>
									<th>hostname</th>
									<th>type</th>
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
											key={device.mac}></Device>
									);
								})}
							</tbody>
						</Table>
					)}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}
