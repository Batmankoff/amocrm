import {useState, useEffect} from 'react';
import axios from 'axios';
import {useToken} from "./TokenContext.jsx";

const SingleDeals = ({id}) => {
    const {accessToken} = useToken();
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [taskStatusColor, setTaskStatusColor] = useState(null);
    const getApiData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/leads/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const dealData = response.data;
            setDeal(dealData);

            const today = new Date();
            if (dealData.closest_task_at) {
                const taskDate = new Date(dealData.closest_task_at * 1000);

                if (taskDate.toDateString() === today.toDateString()) {
                    setTaskStatusColor("green");
                } else if (taskDate < today) {
                    setTaskStatusColor("red");
                } else {
                    setTaskStatusColor("yellow");
                }
            } else {
                setTaskStatusColor("red");
            }
        } catch (error) {
            console.error('Ошибка при получении данных из API:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getApiData();
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h2>{deal.name}</h2>
            <p>Бюджет: {deal.price}</p>
            <p>ID: {deal.id}</p>
            <p>Дата создания: {new Date(deal.created_at * 1000).toLocaleDateString('ru-RU')}</p>
            <p>Ближайшая задача:</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <svg height="20" width="20">
                    <circle cx="10" cy="10" r="10" fill={taskStatusColor}/>
                </svg>
                <p style={{marginLeft: '10px'}}>
                    {deal.closest_task_at
                        ? new Date(deal.closest_task_at * 1000).toLocaleDateString('ru-RU')
                        : 'Задач нет'}
                </p>
            </div>
        </div>
    );
};

export default SingleDeals;
