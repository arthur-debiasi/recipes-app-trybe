import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import MyContext from '../context/MyContext';
import '../css/Header.css';
import logozinho from '../images/logozinho.png';

function Header(props) {
  const [visibleInput, setVisibleInput] = useState(false);
  const { setInputSearch } = useContext(MyContext);
  const { history } = props;
  const title = history.location.pathname;
  const trueFalse = () => {
    switch (title) {
    case '/profile':
      return false;
    case '/done-recipes':
      return false;
    case '/favorite-recipes':
      return false;
    default:
      return true;
    }
  };
  const newTitle = title[1].toUpperCase() + title.substring(2);
  const temTraco = () => {
    switch (title) {
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return newTitle;
    }
  };
  const finalTitle = temTraco();

  const onInputSearchChenage = ({ target }) => {
    setInputSearch(target.value);
  };

  const handleProfileBtn = () => {
    history.push('/profile');
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link to="/meals">
          <img src={ logozinho } alt="logo" width="80px" />
        </Link>
        <Typography variant="h5" data-testid="page-title">{finalTitle}</Typography>
        <Stack
          direction="collumn"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          spacing={ 2 }
          width="60px"
          sx={ { height: '80px', flexWrap: 'wrap' } }
          marginRight="5px"
          marginTop="5px"
        >
          <Button variant="contained" size="small" fullWidth onClick={ handleProfileBtn }>
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile"
            />
          </Button>
          {
            trueFalse() && (
              <Button
                margin="dense"
                variant="contained"
                fullWidth
                size="small"
                onClick={ () => setVisibleInput(!visibleInput) }
                type="button"
              >
                <img
                  src={ searchIcon }
                  data-testid="search-top-btn"
                  alt="busca"
                />
              </Button>
            )
          }
        </Stack>
      </Stack>
      {
        visibleInput && <TextField
          variant="outlined"
          margin="dense"
          fullWidth
          onChange={ onInputSearchChenage }
          data-testid="search-input"
          type="text"
          placeholder="Search"
        />
      }
      {
        trueFalse() && (<SearchBar history={ history } />)
      }
    </div>

  );
}

Header.propTypes = {
  history: PropTypes.shape,
}.isRequired;

export default Header;
