import { useState } from "react";
import { Accordion } from "react-bootstrap";
import Device from "./Device";

export default function NetworkCards(props: any) {
	const [networkData, setNetworkData] = useState<any>([]);

	async function handleNetworkClick(): Promise<void> {
		console.log("Network clicked");
		const fetchData = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/devices/?networkIds[]=${props.id}`,
			{
				headers: {
					"X-Cisco-Meraki-API-Key":
						"e1613b45cd4d8fe315ce194c039381176091a534"
				}
			}
		);
		const respData = await fetchData.json();
		setNetworkData(respData);
		// console.log(respData);
	}

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header onClick={handleNetworkClick}>
					{props.name}
				</Accordion.Header>
				<Accordion.Body>
					{networkData.map((device: any) => {
						return <Device key={device.name} {...device}></Device>
					})}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}
