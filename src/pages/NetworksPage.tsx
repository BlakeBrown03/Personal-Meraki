import { useEffect, useState } from "react";
import NetworkCard from "../components/NetworkCard";
import { Card, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NetworksPage() {
	const [networks, setNetworks] = useState([]);
	const [shownNetworks, setShownNetworks] = useState([]);
	const [page, setPage] = useState(1);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const [typeFilter, setTypeFilter] = useState(["user", "site", "other"]);
	const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();
	const availableTypes: string[] = ["user", "site", "other"];

	async function fetchData(): Promise<void> {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/networks",
			{
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		if (response.status !== 200) {
			alert("Invalid API Key");
			navigate("/");
			return;
		}
		const respData = await response.json();
		setNetworks(respData);
		setShownNetworks(respData);
	}

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

	function handleCheckboxChange(type: string): void {
		setTypeFilter((prev: string[]) => {
			return prev.includes(type)
				? prev.filter(element => element !== type)
				: [...prev, type];
		});
	}

	useEffect(() => {
		setShownNetworks(
			networks.filter((network: any) => {
				const name = network.name.toLowerCase();
				if (typeFilter.includes("site") && name.startsWith("site")) {
					return true;
				}
				if (typeFilter.includes("user") && name.startsWith("usr")) {
					return true;
				}
				if (
					typeFilter.includes("other") &&
					!name.startsWith("usr") &&
					!name.startsWith("site")
				) {
					return true;
				}
				return false;
			})
		);
	}, [typeFilter]);

	useEffect(() => {
		setShownNetworks(
			networks.filter((network: any) => {
				if (network.name.includes(searchValue)) {
					return network;
				}
			})
		);
	}, [searchValue]);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<h1 style={{ textAlign: "center", fontSize: "30px" }}>
				Welcome to Meraki Dashboard
			</h1>
			{networks.length > 0 ? (
				<>
					<Container fluid>
						<Row>
							<Col xs={3} md="auto">
								<Card
									style={{
										paddingTop: 5,
										paddingBottom: 5,
										textAlign: "center"
									}}>
									<Form>
										{availableTypes.map((type: string) => (
											<Form.Check
												key={type}
												inline
												type="checkbox"
												label={type}
												onChange={() =>
													handleCheckboxChange(type)
												}
												checked={typeFilter.includes(
													type
												)}
											/>
										))}
									</Form>
								</Card>
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
			) : (
				<h4 style={{ textAlign: "center" }}>loading...</h4>
			)}
		</>
	);
}

export default NetworksPage;
