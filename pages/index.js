import Layout from '../components/Layout'
import axios from 'axios';
import { Key } from '../key'; 

const Index = (props) => (
  <Layout>
    <div className="navbar navbar-expand-lg navbar-dark bg-primary">
    <form className="form-inline mr-auto">
      {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" name="query" value={this.query} /> */}
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
    </form>
    </div>
    {props.stations.map(station =>         
      <div key={station.id} className="card border-primary mb-3">
        <div className="card-header">Fuel Type: {station.fuel_type_code}</div>
          <div className="card-body">
            <h5 className="card-title">{station.station_name}</h5>
              <p className="card-text">Available: {station.access_days_time}</p>
              <p className="card-text">Charging Instructions: {station.intersection_directions}</p>
              <p className="card-text">EV Price: {station.ev_pricing}</p>
              <p className="card-text">Address: {station.street_address}, {station.zip}</p>
          </div>
        </div>)}
<style jsx>{`
.card{
  /* width: 50%; */
  margin: 1em;
  opacity: 0.7
}
.card:hover {
  opacity: 1.0;
}
`}</style>
</Layout>
)

Index.getInitialProps = async function () {
    const q = 'Austin TX'
    const res_station = await axios.get(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${Key}&location=${q}`)
    const stations = await res_station.data.fuel_stations

    console.log(`Show data fetched. Count: ${JSON.stringify(stations[0])}`)

    return {stations: stations}
}

export default Index