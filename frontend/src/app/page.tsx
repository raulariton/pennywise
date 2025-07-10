import Home from "@/components/pages/Home/Home";
import React, {StrictMode} from "react";
import {AuthProvider} from "@/context/AuthContext";

const App = () => {
	return (
		<StrictMode>
			<AuthProvider>
				<Home/>
			</AuthProvider>
		</StrictMode>
	);
};

export default App;
