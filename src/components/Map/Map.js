import React, { useState, useRef } from "react";
import ReactMapGL, {
  Marker,
  FlyToInterpolator,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { useSelector } from "react-redux";
import useSupercluster from "use-supercluster";
import pin from "../../assets/pin.png";
import clusterPin from "../../assets/cluster.png";

const API_KEY =
  "pk.eyJ1IjoiYWV0aGVybml0ZSIsImEiOiJja3Q4ZTM2cTgwNTNxMnFvOWNkYmxnenQ2In0.aal3HKqtqT4LYrj3GU8zzQ";
const Map = ({ viewport, setViewport }) => {
  const locations = useSelector((state) => state.locations.locations);

  const mapRef = useRef();
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const points = locations.map((location) => ({
    type: "Feature",
    properties: {
      cluster: false,
      locationId: location.id,
      name: location.name,
      description: location.description,
      city: location.city,
      address: location.address,
    },
    geometry: {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    },
  }));

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: {
      radius: 100,
      maxZoom: 20,
    },
  });


  const [popupInfo, setPopupInfo] = useState(null);

  

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      maxZoom={20}
      minZoom={5}
      mapboxApiAccessToken={API_KEY}
      mapStyle="mapbox://styles/aethernite/ckt8ejazx4v6x17o5mhne8j85"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      touchRotate={false}
      dragRotate={false}
      ref={mapRef}
    >
      <NavigationControl style={navControlStyle} />

      {popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={setPopupInfo}
          className="popup-bubble"
          dynamicPosition={false}
        >
          <span className="d-block primary-text">{popupInfo.name}</span>
          <span className="d-block primary-text">Град</span>
          <span className="d-block secondary-text">{popupInfo.city}</span>
          <span className="d-block primary-text">Адрес на аптеката</span>
          <span className="d-block secondary-text">{popupInfo.address}</span>
          <span className="d-block primary-text">Работно време</span>
          <span className="d-block secondary-text">
            Понеделник - Петък 08:00 - 17:00
          </span>
          <span className="d-block secondary-text">
            Събота - Неделя почивни дни
          </span>
          <span className="d-block primary-text">Контакти</span>
          <span className="d-block secondary-text">sulpharma@domain.bg</span>
          <span className="d-block secondary-text">0888888888</span>
          <span className="d-block secondary-text">
            - Работи с НЗОК и предлага инсулини и скъпоструващи лекарства
            <br />
            - Кликни на sulpharma.bg и Вземи от избрана аптека
            <br />- Може да се използва клубна карта Sulpharma
          </span>
        </Popup>
      )}

      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              latitude={latitude}
              longitude={longitude}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                );

                setViewport({
                  ...viewport,
                  latitude,
                  longitude,
                  zoom: expansionZoom,
                  transitionInterpolator: new FlyToInterpolator({
                    speed: 1,
                  }),
                  transitionDuration: "auto",
                });
              }}
            >
              <div className="hoverable">
                <img
                  src={clusterPin}
                  style={{ width: "3rem" }}
                  alt="cluster marker"
                ></img>
                <span className="cluster-number">
                  {pointCount > 99 ? "99+" : pointCount}
                </span>
              </div>
            </Marker>
          );
        }

        return (
          <div
            onMouseOver={() =>
              setPopupInfo({
                name: cluster.properties.name,
                description: cluster.properties.description,
                latitude,
                longitude,
                city: cluster.properties.city,
                address: cluster.properties.address,
              })
            }
            onMouseOut={() => setPopupInfo(null)}
          >
            <Marker
              key={`location-${cluster.properties.locationId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="location-marker hoverable">
                <img src={pin} alt="location marker" />
              </button>
            </Marker>
          </div>
        );
      })}
    </ReactMapGL>
  );
};

export default Map;
