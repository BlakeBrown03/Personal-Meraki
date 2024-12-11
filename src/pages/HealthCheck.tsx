import { Container, Table } from "react-bootstrap";
import devicesEOD from "../../your-json.json";
import { useEffect, useState } from "react";
import { createPath } from "react-router-dom";

export default function HealthCheck() {
	const [devices, setDevices] = useState<any[]>([]);
	const [day, setDay] = useState<number>(0);
	const [month, setMonth] = useState<number>(0);
	const [year, setYear] = useState<number>(0);
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
		setDay(currDate.getDate());
		setMonth(currDate.getMonth());
		setYear(Number(String(currDate.getFullYear()).substring(2)));
	}, []);

	return (
		<>
			<Container fluid>
				<Table bordered>
					<thead>
						<tr>
							<th>
								<b>Device</b>
							</th>
							<th>
								<b>End of Support Date</b>
							</th>
							<th>
								<b>End of Sale Date</b>
							</th>
							<th>
								<b>EOS PID</b>
							</th>
							<th>
								<b>Replacement Product</b>
							</th>
						</tr>
					</thead>
					<tbody>
						{devices.map((device: any, index: number) => {
							const key: string = Object.keys(device)[0];
							let currColor: string = "";
							const eosDate: string[] =
								device[key]["End-of-Support Date"].split("-");
							if (year > Number(eosDate[2])) {
								currColor = "red";
							} else if (
								month >= Number(eosDate[1]) &&
								day > Number(eosDate[0])
							) {
								currColor = "red";
							} else {
								currColor = "green";
							}
							return (
								<tr key={`${key}-${index}`}>
									<td>{key}</td>
									<td style={{ backgroundColor: currColor }}>
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
