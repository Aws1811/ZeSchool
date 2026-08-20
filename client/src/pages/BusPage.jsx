import { useMemo } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getBusDataForChild } from "../data/busData";
import styles from "../styles/bus.module.css";

const busIcon = L.divIcon({
    className: styles.busMarker,
    html: "<span>BUS</span>",
    iconSize: [42, 42],
    iconAnchor: [21, 21],
});

const stopIcon = L.divIcon({
    className: styles.stopMarker,
    html: "<span></span>",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

function BusPage({ child }) {
    const bus = useMemo(() => getBusDataForChild(child), [child]);

    return (
        <section className={styles.busPage} aria-label="Bus tracking">
            {!bus.isRegistered && (
                <section className={styles.subscriptionNotice}>
                    <div>
                        <span className={styles.noticeLabel}>BUS SERVICE</span>
                        <h2>Bus service is not active for this child.</h2>
                        <p>Would you like to activate the bus subscription for {child.name}?</p>
                    </div>
                </section>
            )}

            <div className={styles.busWorkspace}>
                <section className={styles.mapPanel} aria-label="Bus route map">
                    <div className={styles.mapToolbar}>
                        <div>
                            <span className={styles.statusDot} />
                            <strong>{bus.status}</strong>
                        </div>
                        <span>Map centered near Friends School, Ramallah</span>
                    </div>
                    <MapContainer center={bus.center} zoom={14} scrollWheelZoom className={styles.map}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Polyline positions={bus.route} pathOptions={{ color: "#5865f2", weight: 5, opacity: 0.85 }} />
                        <Marker position={bus.busLocation} icon={busIcon}>
                            <Popup>{bus.busNumber} mock location</Popup>
                        </Marker>
                        {bus.stops.map((stop) => (
                            <Marker position={stop.position} icon={stopIcon} key={stop.name}>
                                <Popup>{stop.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    <div className={styles.mapDisclaimer}>Design preview: the bus position is mock data until a real GPS source is connected.</div>
                </section>

                <aside className={styles.infoPanel} aria-label="Bus information">
                    <div className={styles.panelHeading}>
                        <div>
                            <span className={styles.eyebrow}>ROUTE DETAILS</span>
                            <h2>{bus.busNumber}</h2>
                        </div>
                        <span className={styles.routeBadge}>{bus.routeName}</span>
                    </div>
                    <div className={styles.infoRows}>
                        <div><span>Next arrival</span><strong>{bus.nextArrival}</strong></div>
                        <div><span>Departure</span><strong>{bus.departureTime}</strong></div>
                        <div><span>Pickup stop</span><strong>{bus.pickupStop}</strong></div>
                        <div><span>Drop-off stop</span><strong>{bus.dropoffStop}</strong></div>
                        <div><span>Driver</span><strong>{bus.driverName}</strong></div>
                        <div><span>Last updated</span><strong>{bus.lastUpdated}</strong></div>
                    </div>
                    <div className={styles.routeStops}>
                        <h3>Route stops</h3>
                        {bus.stops.map((stop, index) => <div className={styles.stopRow} key={stop.name}><span>{index + 1}</span>{stop.name}</div>)}
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default BusPage;
