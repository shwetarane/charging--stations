import React from 'react';
import Layout from '../components/Layout'
import axios from 'axios';
import { Key } from '../key'; 

export default class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      stations: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log(this.state.value)
    let q = this.state.value
    let url = `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${Key}&location=${q}`
    // console.log(url)
    axios.get(url)
      .then(res => {
        const stations = res.data.fuel_stations;
        this.setState({ stations });
      })
      .catch((error)=> {
        console.log({...error})
   });
}

  handleChange(event){
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event){
    this.componentDidMount();
    event.preventDefault();
  }

  render() {
    return (
      <Layout>
        <div className="container-fluid navbar bg-primary">
        <form 
        className="form-inline "
        onSubmit={this.handleSubmit}
        >
        Look up Electric Charging Stations at   ::
        <input 
          className="form-control mr-sm-2" 
          type="text" 
          placeholder="Austin TX or 78758"
          value={this.state.value}
          onChange={this.handleChange.bind(this)} />
        <button 
          className="btn btn-secondary my-sm-0" 
          type="submit">
            Search
        </button>
        </form>
        </div>
       
        { this.state.stations.map(station =>
        <div key={station.id} className="card border-primary mb-4">
        <div className="card-header">Fuel Type: {station.fuel_type_code}</div>
          <div className="card-body">
            <h5 className="card-title">{station.station_name}</h5>
              <p className="card-text">Available: {station.access_days_time}</p>
              <p className="card-text">Charging Instructions: {station.intersection_directions}</p>
              <p className="card-text">EV Price: {station.ev_pricing}</p>
              <p className="card-text">Address: {station.street_address}, {station.zip}</p>

          </div>
        </div>)}
    
      </Layout>
      
    )
  }
}
