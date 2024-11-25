import { useEffect, useState } from "react";
import NetworkCard from "../components/NetworkCard";
import { Card, Col, Container, Form, Pagination, Row } from "react-bootstrap";

function NetworksPage() {
	const [networks, setNetworks] = useState([]);
	const [shownNetworks, setShownNetworks] = useState([]);
	const [page, setPage] = useState(1);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');
	const [typeFilter, setTypeFilter] = useState(["user", "site", "other"]);
	const [searchValue, setSearchValue] = useState("");

	async function fetchData() {
		const response = await fetch(
			"http://localhost:3000/https://api.meraki.com/api/v1/organizations/289024/networks",
			{
				headers: {
					"X-Cisco-Meraki-API-Key": apiKey
				}
			}
		);
		const respData = await response.json();
		setNetworks(respData);
		setShownNetworks(respData);
		// console.log(respData);
	}

	function buildPaginator() {
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

	useEffect(() => {
		setShownNetworks(
			networks.filter((network: any) => {
				if (
					typeFilter.some(element => element === "site") &&
					network.name.substring(0, 4) === "site"
				) {
					return network;
				} else if (
					typeFilter.some(element => element === "user") &&
					network.name.substring(0, 3) === "usr"
				) {
					return network;
				} else if (
					typeFilter.some(element => element === "other") &&
					network.name.substring(0, 3) !== "usr" &&
					network.name.substring(0, 4) !== "site"
				) {
					return network;
				}
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
				Welcome to Meraki API
			</h1>
			{networks.length > 0 ? (
				<>
					<Container>
						<Row>
							<Col xs={3}>
								<Card style={{paddingTop: 5, paddingBottom: 5, textAlign: "center"}}>
									<Form>
										<Form.Check
											inline
											type="checkbox"
											label="user"
											onChange={
												typeFilter.some(
													element =>
														element === "user"
												)
													? () =>
															setTypeFilter(
																typeFilter.filter(
																	element =>
																		element !==
																		"user"
																)
															)
													: () =>
															setTypeFilter([
																...typeFilter,
																"user"
															])
											}
											checked={typeFilter.includes(
												"user"
											)}
										/>
										<Form.Check
											inline
											type="checkbox"
											label="site"
											onChange={
												typeFilter.some(
													element =>
														element === "site"
												)
													? () =>
															setTypeFilter(
																typeFilter.filter(
																	element =>
																		element !==
																		"site"
																)
															)
													: () =>
															setTypeFilter([
																...typeFilter,
																"site"
															])
											}
											checked={typeFilter.includes(
												"site"
											)}
										/>
										<Form.Check
											inline
											type="checkbox"
											label="other"
											onChange={
												typeFilter.some(
													element =>
														element === "other"
												)
													? () =>
															setTypeFilter(
																typeFilter.filter(
																	element =>
																		element !==
																		"other"
																)
															)
													: () =>
															setTypeFilter([
																...typeFilter,
																"other"
															])
											}
											checked={typeFilter.includes(
												"other"
											)}
										/>
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
					<Pagination>
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
				<h1 style={{ textAlign: "center" }}>Loading...</h1>
			)}
		</>
	);
}

export default NetworksPage;
