import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { searchProduct } from '../../api';
import ProductCard from "../../components/cards/ProductsCard";
import animationData from "../../utils/Lotties/no_order.json";
import Lottie from "lottie-react";
import { CardWrapper } from '../HomePage/style';

const SearchPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #EB0029;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #EB0029;
  }
`;

const NoOrderAnimationContainer = styled.div`
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SearchResults = styled.div`
  margin-top: 20px;
`;

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        const token = localStorage.getItem("food-app-token");
        if (!token) {
            toast.error("You must be logged in to search for products.");
            return;
        }
        if (!query) {
            toast.error("Please enter a product name to search.");
            return;
        }
        setLoading(true);
        try {
            const data = await searchProduct(token, query);
            setResults(data.data);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchPageContainer>
            <SearchBar>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter product name"
                />
                <SearchButton onClick={handleSearch} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </SearchButton>
            </SearchBar>
            <SearchResults>
                {loading && <p>Loading...</p>}
                {!loading && results.length === 0 &&
                    <NoOrderAnimationContainer>
                        <Lottie
                            animationData={animationData}
                            autoplay
                            loop
                        />
                    </NoOrderAnimationContainer>}
                {results.length > 0 && (
                    <CardWrapper>
                        {results.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </CardWrapper>
                )}
            </SearchResults>
        </SearchPageContainer>
    );
};

export default SearchPage;
