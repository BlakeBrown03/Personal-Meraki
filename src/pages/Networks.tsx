import { useEffect, useState } from "react";
import NetworkCard from "../components/NetworkCard";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NetworksPage() {
	const [networks, setNetworks] = useState([]);
	const [shownNetworks, setShownNetworks] = useState([]);
	const [page, setPage] = useState(1);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const [orgFilter, setOrgFilter] = useState(["user", "site", "other"]);
	const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();
	const availableOrgs = JSON.parse(
		sessionStorage.getItem("organizations") || "[]"
	);

	/**
	 * Fetches the networks from the Meraki API
	 */
	async function fetchData(): Promise<void> {
		const response = await fetch(
			`http://localhost:3000/https://api.meraki.com/api/v1/organizations/${availableOrgs[0]}/networks`,
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
				? prev.filter(element => element !== type)
				: [...prev, type];
		});
	}

	/**
	 * Filters the networks based on the type
	 */
	useEffect(() => {
		setShownNetworks(
			networks.filter((network: any) => {
				const name = network.name.toLowerCase();
				if (orgFilter.includes("site") && name.startsWith("site")) {
					return true;
				}
				if (orgFilter.includes("user") && name.startsWith("usr")) {
					return true;
				}
				if (
					orgFilter.includes("other") &&
					!name.startsWith("usr") &&
					!name.startsWith("site")
				) {
					return true;
				}
				return false;
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
			<h1 style={{ textAlign: "center", fontSize: "30px" }}>Networks</h1>
			<Container fluid>
				<Row>
					<Col xs={3} md="auto">
						<Form>
							{availableOrgs.map((type: string) => (
								<Form.Check
									key={type}
									inline
									type="checkbox"
									label={type}
									onChange={() => handleCheckboxChange(type)}
									checked={orgFilter.includes(type)}
								/>
							))}
						</Form>
						<Button>Create Network</Button>
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
			<Container fluid>
				<Row>
					{shownNetworks
						.slice(24 * (page - 1), 24 * page)
						.map((network: any) => (
							<Col
								style={{
									paddingTop: 10,
									paddingBottom: 10
								}}
								key={network.id}
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
	);
}

export default NetworksPage;
