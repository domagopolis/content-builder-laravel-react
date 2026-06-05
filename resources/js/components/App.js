import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ActivitiesList from './Activity/List';
import NewActivity from './Activity/New';
import EditActivity from './Activity/Edit';
import SingleActivity from './Activity/View';
import CoursesList from './Course/List';
import NewCourse from './Course/New';
import EditCourse from './Course/Edit';
import SingleCourse from './Course/View';
import CourseGroupsList from './CourseGroup/List';
import NewCourseGroup from './CourseGroup/New';
import EditCourseGroup from './CourseGroup/Edit';
import SingleCourseGroup from './CourseGroup/View';
import ElementsList from './Element/List';
import NewElement from './Element/New';
import EditElement from './Element/Edit';
import SingleElement from './Element/View';
import NewUnit from './Unit/New';
import EditUnit from './Unit/Edit';
import SingleUnit from './Unit/View';
import UnitsList from './Unit/List';
import EditVetPackage from './VetPackage/Edit';
import VetPackagesList from './VetPackage/List';
import NewVetPackage from './VetPackage/New';
import SingleVetPackage from './VetPackage/View';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={ActivitiesList} />
            <Route path='/activities/' component={ActivitiesList} />
            <Route path='/activity/create' component={NewActivity} />
            <Route path='/activity/edit-:id' component={EditActivity} />
            <Route path='/activity/:id' component={SingleActivity} />
            <Route path='/courses/' component={CoursesList} />
            <Route path='/course/edit-:id' component={EditCourse} />
            <Route path='/course/create' component={NewCourse} />
            <Route path='/course/:id' component={SingleCourse} />
            <Route path='/course_groups/' component={CourseGroupsList} />
            <Route path='/course_group/create' component={NewCourseGroup} />
            <Route path='/course_group/edit-:id' component={EditCourseGroup} />
            <Route path='/course_group/:id' component={SingleCourseGroup} />
            <Route path='/element/edit-:id' component={EditElement} />
            <Route path='/element/:id' component={SingleElement} />
            <Route path='/unit/create' component={NewUnit} />
            <Route path='/units/' component={UnitsList} />
            <Route path='/unit/edit-:id' component={EditUnit} />
            <Route path='/unit/:id' component={SingleUnit} />
            <Route path='/vet_packages/' component={VetPackagesList} />
            <Route path='/vet_package/create' component={NewVetPackage} />
            <Route path='/vet_package/edit-:id' component={EditVetPackage} />
            <Route path='/vet_package/:id' component={SingleVetPackage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
