## Weather Forecast Exercise


The purpose of this project was to be able to look up a city and retrieve the five day forecast of its weather. The live demo of the project can be found here:

##### Tools/Libraries used

  - React.js library (used create-react-app tool)
  - Reactstrap (Bootstrap React components for styling)
  - Netlify for deployment


##### Notes
- I debated for a bit how to go about this. I've been building in React recently for most projects. Initially, I wanted to build in pure ES6 and just used webpack and babel to transpile code so it was compatible in all browsers. There isn't too much data involved but I thought I would be able to call the API either with zip code or longitude/latitude using the Geolocation API. With the possibility of using both methods, I thought React would be good since there is state management and that would have been necessary.
- To begin, I always try to get the data working first, then build out and render after that. I played around with the API a little bit, using fetch instead of a package like axios. The next challenge was rendering out the correct data. The 5 day API call gives a lot of data in objects, arrays, and objects. Once I managed getting all the necessary data, I played around with a simple way to style the data.
- There is a lot to improve on in this project. I would like to be able to style it a little more. I would also like to implement the geolocation API feature. Form validation would also be a good addition to this project.