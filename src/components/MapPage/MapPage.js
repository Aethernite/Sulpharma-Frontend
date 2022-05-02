import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FlyToInterpolator } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchlocations } from "../../state/reducers/locationReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, ListGroup } from "react-bootstrap";
import Map from "../Map/Map";

const MapPage = () => {
    const [viewport, setViewport] = useState({
        latitude: 42.609706,
        longitude: 25.321679,
        zoom: 7
      });
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    dispatch(fetchlocations());
  }, [dispatch]);

  return (
    <Container className="d-block justify-content-center mt-2" >
      <Row>
        <Col
          style={{ height: "100%", border: "1px solid #91c84c" }}
          md={3}
          sm={3}
          className="p-0 rounded d-none d-xl-block"
        >
          <div className="p-2" style={{ backgroundColor: "#91c84c" }}>
            <h1 style={{ color: "white" }}>Търси</h1>
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Въведете име на локация..."
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={(event) => setQuery(event.target.value)}
              />
              <span class="input-group-text border-0" id="search-addon">
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </span>
            </div>
          </div>
          <ListGroup
            style={{
              overflow: "scroll",
              overflowX: "hidden",
              height:"33rem"
            }}
          >
            {locations
              .filter((location) =>
                query ? location.name.includes(query) : location
              )
              .map((location) => {
                return (
                  <ListGroup.Item 
                  className="location-tile"
                  onClick={() => setViewport({
                    ...viewport,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    zoom: 15,
                    transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                  })
                }
                  >
                    <span
                      className="d-block"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      {location.name}
                    </span>
                    <span
                      className="d-block"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "300",
                      }}
                    >
                      {location.address}
                    </span>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Col>
        <Col className="p-0" style={{height:"40rem"}}>
          <Map viewport={viewport} setViewport={setViewport}></Map>
        </Col>
      </Row>
    </Container>
  );
};

export default MapPage;
