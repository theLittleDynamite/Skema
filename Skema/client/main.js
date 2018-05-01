import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Home from '../imports/ui/pages/Home.js';
 
Meteor.startup(() => {
	render(<Home />, document.getElementById('render-target'));
});