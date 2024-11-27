import { Table } from "react-bootstrap";

export default function ClientTable(props: any) {
	return (
		<Table>
			<thead>
				<tr>
					<th>dhcpHostname</th>
					<th>mdnsName</th>
					<th>ip</th>
					<th>vlan</th>
					<th>namedVlan</th>
					<th>mac</th>
				</tr>
			</thead>
			<tbody>
				{props.clients.map((client: any) => {
					return (
						<tr key={client.mac}>
							{client.dhcpHostname !== null ? (
								<td>{client.dhcpHostname}</td>
							) : (
								<td>NA</td>
							)}
							{client.mdnsName !== null ? (
								<td>{client.mdnsName}</td>
							) : (
								<td>NA</td>
							)}
							{client.ip !== null ? (
								<td>{client.ip}</td>
							) : (
								<td>NA</td>
							)}
							{client.vlan !== null ? (
								<td>{client.vlan}</td>
							) : (
								<td>NA</td>
							)}
							{client.namedVlan !== null ? (
								<td>{client.namedVlan}</td>
							) : (
								<td>NA</td>
							)}
							{client.mac !== null ? (
								<td>{client.mac}</td>
							) : (
								<td>NA</td>
							)}
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}
