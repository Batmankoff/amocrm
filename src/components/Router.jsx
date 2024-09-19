import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "../App.jsx";
import TokenPage from "./TokenPage.jsx";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/token" element={<TokenPage/>}/>

            </Routes>
        </BrowserRouter>
    );
};
export default Router;
