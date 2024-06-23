import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query');
        const fetchResults = async () => {
            try {
                const response = await axios.get(`/api/search?query=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Ошибка поиска:', error);
            }
        };
        fetchResults();
    }, [location]);

    return (
        <div>
            <h1>Результаты поиска</h1>
            <ul>
                {results.map(result => (
                    <li key={result.id}>{result.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;