import React, { useEffect, useContext, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const User = ({ repos, user, loading }) => {
  const githubContext = useContext(GithubContext);

  const { login: loginName } = useParams();

  useEffect(() => {
    githubContext.getUser(loginName);
    githubContext.getUsersRepos(loginName);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = githubContext.user;

  if (githubContext.loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="avatar"
              className="round-img"
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>
            <ul>
              {login && (
                <li className="text-bold">
                  Name: <span className="text-caps">{login}</span>
                </li>
              )}
              {company && (
                <li className="text-bold">Company: {company}</li>
              )}
              {blog && <li className="text-bold">Blog: {blog}</li>}
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">
            Followers: {followers}
          </div>
          <div className="badge badge-success">
            Following: {following}
          </div>
          <div className="badge badge-light">
            Public Repos: {public_repos}
          </div>
          <div className="badge badge-dark">
            Public Gists: {public_gists}
          </div>
        </div>
        <Repos />
      </Fragment>
    );
  }
};

export default User;
