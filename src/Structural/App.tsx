import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NetworksPage from "../pages/NetworksPage";
import Login from "../pages/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Login />} />
					<Route path="/networks" element={<NetworksPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
