import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SystemContexts from "./hooks";
import SignIn from "./pages/SignIn";
import Routes from "./routes";
import GobalStyle from "./styles/global";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <SystemContexts>
                <Routes>
                    <SignIn />
                </Routes>
            </SystemContexts>

            <GobalStyle />
        </BrowserRouter>
    );
};

export default App;
