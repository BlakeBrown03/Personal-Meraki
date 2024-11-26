import { Table } from "react-bootstrap";

export default function ClientTable(props: any) {
	return (
		<Table>
			<tr>
				<th>dhcpHostname</th>
				<th>mdnsName</th>
				<th>ip</th>
				<th>vlan</th>
				<th>namedVlan</th>
				<th>mac</th>
			</tr>
			{props.clients.map((client: any) => {
				return (
					<tr>
						<td>{client.dhcpHostname}</td>
						<td>{client.mdnsName}</td>
						<td>{client.ip}</td>
						<td>{client.vlan}</td>
						<td>{client.namedVlan}</td>
						<td>{client.mac}</td>
					</tr>
				);
			})}
		</Table>
	);
}
