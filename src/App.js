import React, { Component } from "react";
import {
  Jumbotron,
  Container,
  Button,
  Form,
  Input,
  Card,
  CardImg,
  CardText,
  CardTitle,
  CardBody,
  Row,
  Col
} from "reactstrap";

export default class App extends Component {
  state = {
    zipCode: "",
    city: "",
    country: "",
    currentTemp: "",
    currentCondition: "",
    currentIcon: "",
    weather: [],
    loading: true,
    error: ""
  };

  async getWeather() {
    try {
      const API_KEY = "10e4c6e7a832a09119e2aff8314c5371";
      const { zipCode } = this.state;
      const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${API_KEY}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        city: data.city.name,
        country: data.city.country,
        currentTemp: data.list[0].main.temp,
        currentCondition: data.list[0].weather[0].main,
        currentIcon: data.list[0].weather[0].icon,
        weather: data.list,
        loading: false,
        error: ""
      });
      console.log(data);
      console.log(this.state);
    } catch (e) {
      console.log(e.message);
      this.setState({ error: e.message, loading: true });
    }
  }

  handleChange = event => {
    this.setState({ zipCode: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getWeather();
    console.log(this.state);
    this.setState({ zipCode: "" });
  };

  displayCurrentWeather() {
    const {
      city,
      country,
      currentTemp,
      currentCondition,
      currentIcon
    } = this.state;
    if (!this.state.loading) {
      return (
        <div>
          <Container>
            <h1>
              {city}, {country}
            </h1>
            <Row>
              <Col xs="6" sm="4" />
              <Col xs="6" sm="4">
                <Card style={{ borderColor: "#428bca", borderStyle: "solid" }}>
                  <CardBody />
                  <CardImg
                    src={`https://openweathermap.org/img/w/${currentIcon}.png`}
                    alt="Weather icon"
                    width="5%"
                  />
                  <CardBody>
                    <CardText>Temperature: {currentTemp} F</CardText>
                    <CardText>Conditions: {currentCondition}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <div />;
    }
  }

  displayError() {
    if (this.state.error) {
      return (
        <React.Fragment>
          Invalid zip, please try again, with a valid code.
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  render() {
    const { weather } = this.state;
    return (
      <div>
        <Jumbotron fluid style={{ backgroundColor: "#428bca", color: "white" }}>
          <h1 className="text-center">Local Weather</h1>
        </Jumbotron>
        <Container fluid className="text-center">
          <Form onSubmit={this.handleSubmit} className="form-inline">
            <Input
              type="text"
              placeholder="Enter US zip code"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
            <Button
              color="primary"
              onClick={this.handleSubmit}
              style={{ margin: "0 10px" }}
            >
              Submit
            </Button>
          </Form>
          {this.displayCurrentWeather()}
          {this.displayError()}
          {weather
            .filter((value, index) => {
              return index % 8 === 0;
            })
            .map(weather => {
              return (
                <div key={weather.dt}>
                  <Container>
                    <Row>
                      <Col xs="6" sm="4" />
                      <Col xs="6" sm="4">
                        <Card
                          style={{
                            borderColor: "#428bca",
                            borderStyle: "solid",
                            margin: "15px"
                          }}
                        >
                          <CardBody>
                            <CardTitle
                              style={{
                                fontWeight: "600",
                                fontSize: "16px"
                              }}
                            >
                              Date: {weather.dt_txt.slice(0, 11)}
                            </CardTitle>
                          </CardBody>
                          <CardImg
                            src={`https://openweathermap.org/img/w/${
                              weather.weather[0].icon
                              }.png`}
                            alt="weather icon"
                            width="5%"
                          />
                          <CardBody>
                            <CardText>Min: {weather.main.temp_min} F</CardText>
                            <CardText>Max: {weather.main.temp_max} F</CardText>
                            <CardText>
                              Condition: {weather.weather[0].main}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
              );
            })}
        </Container>
      </div>
    );
  }
}
