import { useEffect, useState } from "react";
import NetworkCard from "../components/NetworkCard";
import {
	Button,
	Col,
	Container,
	Form,
	Modal,
	Pagination,
	Row
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NetworksPage() {
	const [networks, setNetworks] = useState<any[]>([]);
	const [shownNetworks, setShownNetworks] = useState<any[]>([]);
	const [page, setPage] = useState(1);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();
	const availableOrgs = JSON.parse(
		sessionStorage.getItem("organizations") || "[]"
	);
	const [orgFilter, setOrgFilter] = useState<string[]>(
		availableOrgs.map((org: any[]) => org[0])
	);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	const [selectedOrg, setSelectedOrg] = useState<string>("");
	const [selectedNetwork, setSelectedNetwork] = useState<string>("");
	const [, setNewNetworkData] = useState<any>({});

	/**
	 * Fetches the networks from the Meraki API
	 */
	async function fetchData(): Promise<void> {
		for (let i: number = 0; i < availableOrgs.length; i++) {
			const response = await fetch(
				`http://localhost:3000/https://api.meraki.com/api/v1/organizations/${availableOrgs[i][0]}/networks`,
				{
					headers: {
						"X-Cisco-Meraki-API-Key": apiKey
					}
				}
			);
			if (response.status === 404) {
				alert("It looks like you haven't created any networks yet");
			} else if (response.status !== 200) {
				alert("Invalid API Key");
				sessionStorage.removeItem("apiKey");
				sessionStorage.removeItem("organizations");
				navigate("/");
				return;
			}
			const respData = await response.json();
			setNetworks(respData);
			setShownNetworks(respData);
		}
	}

	/**
	 * Splits the up the data into equal parts of 24
	 * @returns {JSX.Element[]} an array of JSX elements representing the pagination
	 */
	function buildPaginator(): JSX.Element[] {
		const pages: number = Math.ceil(shownNetworks.length / 24);
		const paginator = [];
		for (let i = 1; i <= pages; i++) {
			paginator.push(
				<Pagination.Item
					key={i}
					active={page === i}
					onClick={() => setPage(i)}>
					{i}
				</Pagination.Item>
			);
		}
		return paginator;
	}

	/**
	 * Handles the filtering of the networks based on the type
	 * @param type the type of network to filter by
	 */
	function handleCheckboxChange(type: string): void {
		setOrgFilter((prev: string[]) => {
			return prev.includes(type)
				? prev.filter((element: string) => element !== type)
				: [...prev, type];
		});
	}

	async function createNetwork(network: any): Promise<void> {
		console.log(selectedOrg);
		const response = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/${selectedOrg}/networks`,
			{
				method: "POST",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				},
				body: JSON.stringify({
					name: network
				})
			}
		);
		console.log(response.status);
		fetchData();
	}

	async function deleteNetwork(network: any): Promise<void> {
		const response = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/${selectedOrg}/${network}`,
			{
				method: "DELETE",
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				},
				body: JSON.stringify({})
			}
		);
		if (response.status !== 204) {
			alert("Error deleting network");
			return;
		}
		fetchData();
	}

	/**
	 * Filters the networks based on the type
	 */
	useEffect(() => {
		setShownNetworks(
			networks.filter((network: any) => {
				const orgId: string = network.organizationId.toLowerCase();
				return orgFilter.includes(orgId);
			})
		);
	}, [orgFilter]);

	/**
	 * Filters the networks based on the search value
	 */
	useEffect(() => {
		setShownNetworks(
			networks.filter((network: any) => {
				if (network.name.includes(searchValue)) {
					return network;
				}
			})
		);
	}, [searchValue]);

	/**
	 * Fetches the data when the page loads
	 */
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div
				style={{
					marginBottom: "10px",
					display: "flex",
					justifyContent: "center"
				}}>
				<Button
					onClick={() => setShowDeleteModal(true)}
					variant="danger">
					Delete a network
				</Button>
				<Modal show={showDeleteModal}>
					<Modal.Dialog>
						<Modal.Header>Delete a network</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group>
									<Form.Label>Organization</Form.Label>
									<Form.Control
										as="select"
										value={selectedOrg}
										onChange={e =>
											setSelectedOrg(e.target.value)
										}>
										{availableOrgs.map((org: any[]) => (
											<option key={org[0]} value={org[0]}>
												{org[1]}
											</option>
										))}
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>Networks</Form.Label>
									<Form.Control
										as="select"
										value={selectedNetwork}
										onChange={e =>
											setSelectedNetwork(e.target.value)
										}>
										{networks.map((network: any) => (
											<option
												key={network.id}
												value={network.id}>
												network.name
											</option>
										))}
									</Form.Control>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowDeleteModal(false)}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={() => {
									deleteNetwork(selectedNetwork);
									setShowDeleteModal(false);
								}}>
								Delete
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal>
				<Button
					onClick={() => setShowCreateModal(true)}
					variant="success"
					style={{ marginLeft: "10px" }}>
					Create a network
				</Button>
				<Modal show={showCreateModal}>
					<Modal.Dialog>
						<Modal.Header>Create a network</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group>
									<Form.Label>Organization</Form.Label>
									<Form.Control
										as="select"
										value={selectedOrg}
										onChange={e =>
											setSelectedOrg(e.target.value)
										}>
										<option value="">
											Select an organization
										</option>
										{availableOrgs.map((org: any[]) => (
											<option key={org[0]} value={org[0]}>
												{org[1]}
											</option>
										))}
									</Form.Control>
								</Form.Group>
								<Form.Group>
									<Form.Label>Network Name</Form.Label>
									<Form.Control
										type="text"
										onChange={e =>
											setNewNetworkData((prev: any) => ({
												...prev,
												name: e.target.value
											}))
										}
										placeholder="Network Name"
									/>
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowCreateModal(false)}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={() => {
									createNetwork(selectedNetwork);
									setShowCreateModal(false);
								}}>
								Create
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal>
			</div>
			<Container fluid>
				<Row>
					<Col xs={3} md="auto">
						<Form>
							{availableOrgs.map((org: string[]) => (
								<Form.Check
									key={org[0]}
									inline
									type="checkbox"
									label={org[1]}
									onChange={() =>
										handleCheckboxChange(org[0])
									}
									checked={orgFilter.includes(org[0])}
								/>
							))}
						</Form>
					</Col>
					<Col>
						<Form.Control
							type="text"
							placeholder="Search..."
							onChange={e =>
								setSearchValue(e.target.value)
							}></Form.Control>
					</Col>
				</Row>
			</Container>
			{networks.length === 0 ? (
				<p style={{ textAlign: "center", marginTop: "20px" }}>
					No Networks found
				</p>
			) : (
				<>
					<Container fluid>
						<Row>
							{shownNetworks
								.slice(24 * (page - 1), 24 * page)
								.map((network: any, index: number) => (
									<Col
										style={{
											paddingTop: 10,
											paddingBottom: 10
										}}
										key={network.id || index}
										fluid="md"
										md={12}
										xl={6}>
										<NetworkCard {...network}></NetworkCard>
									</Col>
								))}
						</Row>
					</Container>
					<Pagination size="sm">
						<Pagination.Item
							onClick={() => setPage(page - 1)}
							disabled={page === 1}>
							Back
						</Pagination.Item>
						{buildPaginator()}
						<Pagination.Item
							onClick={() => setPage(page + 1)}
							disabled={page === Math.ceil(networks.length / 24)}>
							Next
						</Pagination.Item>
					</Pagination>
				</>
			)}
		</>
	);
}

export default NetworksPage;
