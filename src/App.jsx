import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {useToken} from './components/TokenContext';
import Deals from "./components/Deals.jsx";

function App() {
    const [deals, setDeals] = useState([]);
    const {accessToken} = useToken();

    const getApiData = async () => {
        try {
            const response = await axios.get('/api/leads', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setDeals(response.data._embedded.leads);
        } catch (error) {
            console.error('Ошибка при получении данных из API:', error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className="app">
            <Deals deals={deals}/>
        </div>
    );
}

export default App;
