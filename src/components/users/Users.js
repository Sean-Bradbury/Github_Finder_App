import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);

  if (githubContext.loading === true) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {githubContext.users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const width = window.innerWidth;

const userStyle = {
  display: 'grid',
  gridTemplateColumns:
    width > 768 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
  gridGap: '20px',
};

export default Users;
