import styled from "styled-components";
export const SearchPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
`;

export const SearchResults = styled.div``;

export const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ResultItem = styled.li`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ResultImage = styled.img`
  max-width: 100px;
  display: block;
`;