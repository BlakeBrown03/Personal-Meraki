import { useEffect, useState } from "react";
import {
	Button,
	Col,
	Container,
	Form,
	Modal,
	Row,
	Table
} from "react-bootstrap";

export default function Organizations() {
	const [organizations, setOrganizations] = useState<Record<string, any>>([]);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const [organizationName, setOrganizationName] = useState<string>("");
	const [detailsName, setDetailsName] = useState<string>("");
	const [detailsValue, setDetailsValue] = useState<string>("");
	const [createShow, setCreateShow] = useState<boolean>(false);
	const [deleteShow, setDeleteShow] = useState<boolean>(false);
	const [pickedOrg, setPickedOrg] = useState<string>("");

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
		sessionStorage.setItem(
			"organizations",
			JSON.stringify(data.map((org: any) => [org.id, org.name]))
		);
		setOrganizations(data);
	}

	async function createOrganization(): Promise<void> {
		if (
			detailsName === "" ||
			detailsValue === "" ||
			organizationName === ""
		) {
			alert("Please fill out all fields");
			return;
		}
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations",
			{
				method: "POST",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: organizationName,
					management: {
						details: [
							{
								name: detailsName,
								value: detailsValue
							}
						]
					}
				})
			}
		);
		fetchOrganizations();
		const data = await response.json();
		console.log(data);
	}

	async function deleteOrganization(org: string): Promise<void> {
		const response = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/${org}`,
			{
				method: "DELETE",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		if (response.status !== 204) {
			alert("Error deleting organization");
			return;
		}
		setOrganizations(
			organizations.filter((organization: any) => organization.id !== org)
		);
		fetchOrganizations();
	}

	useEffect(() => {
		fetchOrganizations();
	}, []);

	return (
		<div style={{ textAlign: "center" }}>
			<h1>Organizations</h1>
			<Container fluid>
				<Row>
					<Col>
						<Button
							style={{}}
							variant="danger"
							onClick={() => setDeleteShow(!deleteShow)}>
							Delete an organization
						</Button>
						<Modal show={deleteShow}>
							<Modal.Dialog>
								<Modal.Header>
									<Modal.Title>
										Delete Organization
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form>
										<Form.Label>
											Select an organization to delete
										</Form.Label>
										<Form.Control
											as="select"
											onChange={e =>
												setPickedOrg(e.target.value)
											}>
											{organizations.map(
												(organization: any) => (
													<option
														key={organization.id}
														value={organization.id}>
														{organization.name}
													</option>
												)
											)}
										</Form.Control>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button
										variant="secondary"
										onClick={() =>
											setDeleteShow(!deleteShow)
										}>
										Close
									</Button>
									<Button
										variant="primary"
										onClick={() => {
											deleteOrganization(pickedOrg);
											setDeleteShow(!deleteShow);
										}}>
										Delete
									</Button>
								</Modal.Footer>
							</Modal.Dialog>
						</Modal>
						<Button
							onClick={() => setCreateShow(!createShow)}
							style={{ paddingInline: 21 }}
							variant="success">
							Create Organization
						</Button>
						<Modal show={createShow}>
							<Modal.Dialog>
								<Modal.Header>
									<Modal.Title>
										Create Organization
									</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<Form>
										<Form.Label>Name</Form.Label>
										<Form.Control
											type="text"
											placeholder="Organization Name"
											onChange={e =>
												setOrganizationName(
													e.target.value
												)
											}
										/>
										<Form.Label>Details</Form.Label>
										<Form.Control
											type="text"
											placeholder="Name"
											onChange={e =>
												setDetailsName(e.target.value)
											}
										/>
										<Form.Control
											style={{ marginTop: "10px" }}
											type="text"
											placeholder="Value"
											onChange={e =>
												setDetailsValue(e.target.value)
											}
										/>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button
										variant="secondary"
										onClick={() =>
											setCreateShow(!createShow)
										}>
										Close
									</Button>
									<Button
										variant="primary"
										onClick={() => {
											createOrganization();
											setCreateShow(!createShow);
										}}>
										Save changes
									</Button>
								</Modal.Footer>
							</Modal.Dialog>
						</Modal>
					</Col>
					<Col xs={8}>
						{organizations.length === 0 ? (
							<h5>
								It looks like you do not have any organizations
								yet
							</h5>
						) : (
							<Table>
								<thead>
									<tr>
										<th>Name</th>
									</tr>
								</thead>
								<tbody>
									{organizations.map((organization: any) => {
										return (
											<tr key={organization.id}>
												<td>{organization.name}</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
