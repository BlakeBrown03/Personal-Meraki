import { Container, Table } from "react-bootstrap";
import devicesEOD from "../../your-json.json";
import { useEffect, useState } from "react";

export default function HealthCheck() {
	const [devices, setDevices] = useState<any[]>([]);

	useEffect(() => {
		setDevices(devicesEOD);
	}, []);

	return (
		<>
			<Container fluid>
				<Table>
					<thead>
						<tr>
							<td>Device</td>
							<td>End of Support Date</td>
							<td>End of Sale Date</td>
							<td>EOS PID</td>
							<td>Replacement Product</td>
						</tr>
					</thead>
					<tbody>
						{devices.map((device: any, index: number) => {
							const key: string = Object.keys(device)[0];
							return (
								<tr key={`${key}-${index}`}>
									<td>{key}</td>
									<td>
										{device[key]["End-of-Support Date"]}
									</td>
									<td>{device[key]["End-of-Sale Date"]}</td>
									<td>{device[key]["EOS PID"]}</td>
									<td>
										{device[key]["Replacement-Product"]}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		</>
	);
}
