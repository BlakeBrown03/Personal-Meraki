import "../components/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NetworksPage from "../components/NetworksPage";
import Login from "../components/Login";

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
