import { Container, Table } from "react-bootstrap";
import devicesEOD from "../../your-json.json";
import { useEffect, useState } from "react";

export default function HealthCheck() {
	const [devices, setDevices] = useState<any[]>([]);
	const [date, setDate] = useState<string>("");
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];

	useEffect(() => {
		setDevices(devicesEOD);
		const currDate = new Date();
		setDate(
			`${currDate.getDate()}-${months[currDate.getMonth()]}-${String(
				currDate.getFullYear()
			).substring(2)}`
		);
	}, []);

	return (
		<>
			<Container fluid>
				<Table bordered>
					<thead>
						<tr>
							<th>
								<b>
									<i>Device</i>
								</b>
							</th>
							<th>
								<b>
									<i>End of Support Date</i>
								</b>
							</th>
							<th>
								<b>
									<i>End of Sale Date</i>
								</b>
							</th>
							<th>
								<b>
									<i>EOS PID</i>
								</b>
							</th>
							<th>
								<b>
									<i>Replacement Product</i>
								</b>
							</th>
						</tr>
					</thead>
					<tbody>
						{devices.map((device: any, index: number) => {
							const key: string = Object.keys(device)[0];
							let currColor: string = "";
							date.substring(0, 2) >
							device[key]["End-of-Support Date"].substring(0, 2)
								? (currColor = "red")
								: (currColor = "green");
							console.log(currColor);
							return (
								<tr
									key={`${key}-${index}`}
									style={{
										backgroundColor: "black"
									}}>
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
