import axios from "axios";
import React from "react";

const API_URL = 'http://api.exchangeratesapi.io/v1/';
const API_KEY = 'ad783febbb71e54b42c834cade94eec0';

export default class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    source: '',
    destination: '',
    date: '',
    conversionResult: ''
  };

  handleCurrencyChange = (e, string) => {
    const inputValue = e.target.value;
    const reg = /^[a-z]+$/i;
    if (reg.test(inputValue) || !inputValue.length) {
      this.setState({ [string]: inputValue.toUpperCase().slice(0, 3) });
    }
  };

  handleDateChange = (e) => {
    const inputValue = e.target.value;
    const reg = /^[\d-]+$/;
    if (reg.test(inputValue) || !inputValue.length) {
      this.setState({ date: inputValue.slice(0, 10) });
    }
  };

  onReset = () => {
    this.setState({
      source: '',
      destination: '',
      date: '',
      conversionResult: ''
    })
  };

  getRate = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}${this.state.date}`,
        {
          params: {
            base: this.state.source,
            symbols: this.state.destination,
            access_key: API_KEY
          }
        }
      );

      this.setState({conversionResult: Object.values(data.rates)[0]});
    } catch (e) {
      console.log(e.response);
      const errorMessage = e.response.data.error.message;
      this.setState({conversionResult: errorMessage});
    }
  };

  onFindRate = () => {
    if(!this.validate()) {
      this.setState({conversionResult: 'Please complete each field'});
      return;
    }

    this.getRate();
  };

  validate = () => {
    if(this.state.source.length !== 3) {
      return false;
    }

    if(this.state.destination.length !== 3) {
      return false;
    }

    return this.state.date.length === 10;
  };

  render() {
    return (
        <div className="form">
          <h2>Currency Converter</h2>
          <div className="form-item">
            <label htmlFor="">Source symbol:</label>
            <input
              className="currency-source"
              placeholder='EUR'
              value={this.state.source}
              onChange={(e) => this.handleCurrencyChange(e, 'source')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="">Destination symbol:</label>
            <input
              className="currency-destination"
              placeholder='USD'
              value={this.state.destination}
              onChange={(e) => this.handleCurrencyChange(e, 'destination')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="">Date:</label>
            <input
              className="currency-date"
              placeholder='YYYY-MM-DD'
              value={this.state.date}
              onChange={this.handleDateChange}

            />
          </div>
          <div className="form-buttons">
            <button
              className="find-rate"
              onClick={this.onFindRate}>Find rate
            </button>
            <button
              className="reset-fields"
              onClick={this.onReset}>Reset
            </button>
          </div>

          <div className="conversion-result">
            {this.state.conversionResult}
          </div>
        </div>
    );
  }
}
