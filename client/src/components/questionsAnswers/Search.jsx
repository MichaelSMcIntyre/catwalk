import React, { useRef } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export default function Search({ handleChange }) {
  const searchRef = useRef(null);

  return (
    <Container>
      <SearchBar
        type='text'
        color='#B1A9AC'
        ref={searchRef}
        placeholder='Have a question? Search for answers…'
        onChange={() => handleChange(searchRef.current.value)}
        data-testid='searchBar'
      />
      <MagnifyGlassIcon />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  min-width: 100px;
  top: 0;
  z-index: 100;
  padding-bottom: 10px;
`;

const SearchBar = styled.input`
  border: 1px solid grey;
  border-radius: 5px;
  height: 25px;
  width: 100%;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #B1A9AC;
  ::placeholder{
    color: #38062B;
  }
`;

const MagnifyGlassIcon = styled(SearchIcon)`
  position: absolute;
  right: 0.5rem;
  top: 36%;
  transform: translateY(-50%);

  && {
    color: #38062B;
  }
`;
