import { Table } from "react-bootstrap";

export default function ClientTable(props: any) {
	return (
		<Table>
			<thead>
				<tr>
					<th>Description</th>
					<th>ip</th>
					<th>vlan</th>
					<th>namedVlan</th>
					<th>mac</th>
					<th>manufacturer</th>
				</tr>
			</thead>
			<tbody>
				{props.clients.map((client: any) => {
					return (
						<tr key={client.mac}>
							{client.description !== null ? (
								<td>{client.description}</td>
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
							{client.manufacturer !== null ? (
								<td>{client.manufacturer}</td>
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
