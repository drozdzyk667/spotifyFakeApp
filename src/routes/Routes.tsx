import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Categories from '../pages/Categories/Categories';
import NewReleases from '../pages/NewReleases';
import NotFoundPage from '../pages/404';
import SearchContent from '../pages/SearchContent';
import CategoryPlaylist from '../pages/CategoryPlaylist/CategoryPlaylist';
import Trackslist from '../pages/TracksList';
import UserProfile from '../pages/UserProfile/UserProfile';
import AlbumTracks from '../pages/AlbumTracks';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" />
      <Route exact path="/user" component={UserProfile} />
      <Route exact path="/search" component={SearchContent} />
      <Route exact path="/new-releases" component={NewReleases} />
      <Route exact path="/new-releases/:album" component={AlbumTracks} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/categories/:category" component={CategoryPlaylist} />
      <Route
        exact
        path="/categories/:category/:tracks"
        component={Trackslist}
      />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
