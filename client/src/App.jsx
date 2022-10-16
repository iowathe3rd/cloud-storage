import React from "react";
import "./index.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/registration/Registration";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<div>
					<Routes>
						<Route path="/registration" element={<Registration />} />
						<Route path="/auth" element={<Registration />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
