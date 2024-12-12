import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Networks from "../pages/Networks";
import Login from "../pages/Login";
import HealthCheck from "../pages/HealthCheck";
import Clients from "../pages/Clients";
import Organizations from "../pages/Organizations";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Login />} />
					<Route path="/organizations" element={<Organizations />} />
					<Route path="/networks" element={<Networks />} />
					<Route path="/clients" element={<Clients />} />
					<Route path="/health-check" element={<HealthCheck />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
