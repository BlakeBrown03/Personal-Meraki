import { useEffect, useState } from "react";
import NetworkCard from "../components/NetworkCard";
import { Col, Container, Pagination, Row } from "react-bootstrap";

function NetworksPage() {
	const [networks, setNetworks] = useState([]);
	// const [shownNetworks, setShownNetworks] = useState([]);
	const [page, setPage] = useState(1);
	const apiKey = JSON.parse(sessionStorage.getItem("apiKey") || '""');

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
		// console.log(respData);
	}

	function buildPaginator() {
		const pages: number = Math.ceil(networks.length / 24);
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
		fetchData();
	}, []);

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Welcome to Meraki API</h1>
			{networks.length > 0 ? (
				<>
					<Container fluid>
						<Row>
							{networks
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