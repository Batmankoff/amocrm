import  { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import {useToken} from "./TokenContext.jsx";

function TokenPage() {
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {accessToken, refreshToken, updateTokens} = useToken();

    const isTokenExpired = (token) => {
        if (!token) return true;
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    };

    const client_id = '8d49dac0-0743-42a7-b966-8d75ab370702';
    const client_secret = '56EyQNQcsMGu6707q1OQJQpJIzNdGpy5U9DWNN03R7Fkqmkoyo2N1add5mYbdLPy';
    const refresh_token = refreshToken;
    const redirect_uri = 'http://localhost:5173/token/status';

    const refreshAccessToken = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/oauth2/access_token', {
                client_id,
                client_secret,
                grant_type: 'refresh_token',
                refresh_token,
                redirect_uri
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                updateTokens(response.data.access_token, response.data.refresh_token)

                setIsTokenValid(true);
            } else {
                console.error('Ошибка при обновлении токена:', response);
                setError('Ошибка при обновлении токена');
                setIsTokenValid(false);
            }
        } catch (err) {
            console.error('Ошибка при запросе токена:', err);
            setError('Не удалось обновить токен');
            setIsTokenValid(false);
        } finally {
            setLoading(false);
        }
    };

    const checkTokenValidity = () => {
        const tokenExpired = isTokenExpired(accessToken);
        setIsTokenValid(!tokenExpired);

        if (tokenExpired) {
            refreshAccessToken();
        }
    };

    return (
        <div className='token'>
            <h1>Проверка токена</h1>

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div>
                    {isTokenValid ? (
                        <p>Токен действителен.</p>
                    ) : (
                        <p>Токен истек или недействителен.</p>
                    )}

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <button onClick={checkTokenValidity}>
                        {isTokenValid ? 'Проверить токен' : 'Получить новый токен'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default TokenPage;
