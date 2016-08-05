import React, { Component } from 'react';
import Calendar from 'react-input-calendar'
import $ from 'jquery';
import Dropdown from 'react-drop-down';
import { Link } from 'react-router';
import Navigate from './navigate.jsx';

export default class ScriptRemindView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "currentDrug": "None",
      "dosageAmt": 0,
      "dosageMeasure": 'mg',
      "date": date,
      "scheduleFreq": "1x",
      "scheduleDayWeek": "day"
  }
  var date = new Date();
  this.updateDrugName = this.updateDrugName.bind(this);
  this.submitForm = this.submitForm.bind(this);
  this.handleFrequency = this.handleFrequency.bind(this);
  this.handleDoseAmount = this.handleDoseAmount.bind(this);
  this.handleRefillDate = this.handleRefillDate.bind(this);
  this.handleDoseMeasurement = this.handleDoseMeasurement.bind(this);
  this.handleScheduleDayWeek = this.handleScheduleDayWeek.bind(this);

}

    updateDrugName(event){
      this.setState({
          currentDrug: event.target.value
        });
    }

    handleRefillDate(date) {
      console.log("selected date", date);
      this.setState({
        "date": date
      })

    }

    handleScheduleDayWeek(dayWeek){
        this.setState({
          "scheduleDayWeek": dayWeek
        })
    }

    handleDoseMeasurement(measure) {
      this.setState({
        dosageMeasure: measure.target.value
      })

    }

    handleDoseAmount(amount) {
      this.setState({
        dosageAmt: amount.target.value
      })

    }

    handleFrequency(frequency) {
      console.log("handleFreq called with", frequency.target.value);
      this.setState({
        scheduleFreq: frequency.target.value
      })
    }

    submitForm () {
      var script = {
        "name": this.state.currentDrug,
        "dosage": this.state.dosageAmt + ' ' + this.state.dosageMeasure,
        "refill": this.state.date,
        "frequency": this.state.scheduleFreq + ' per ' + this.state.scheduleDayWeek,
        "username": window.localStorage.username
      }
      console.log("submitForm called for: ", script)

      $.ajax({
          type: 'POST',
          url: '/api/reminder/add',
          dataType: 'json',
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(script),
          success: function(data){
            alert("Your prescription was saved.");
            console.log('A reminder was set for: ', data);
          },
          error: function(err){
            console.log('Reminder not set: ', err);
          }
        });

    }

  render() {
    return (
      <div>
      <Navigate />
        <div>
          <h1> Set a Prescription Reminder </h1>
          <h2> Current Drug: {this.state.currentDrug} </h2>
          <input
          onChange={this.updateDrugName}
          placeholder='Name'
          />
        </div>
        <div>
          <input
          className='dosageInput'
          onChange={this.handleDoseAmount}
          placeholder='Dosage (e.g. if "Take 1 tablet", type "1")'
          />

          <select className="dropdown-replacement" value={this.state.dosageMeasure} onChange={this.handleDoseMeasurement}>
            <option>mg</option>
            <option>mL</option>
            <option>tablet</option>
          </select>
      </div>
        <div>
            <h1> Refill Date</h1>
            <div>
              <Calendar format='MM/DD/YYYY' date={this.state.date} onChange= {this.handleRefillDate}/>
              <h3> You selected {this.state.date} </h3>
            </div>
        </div>
        <div>
          <select className="dropdown-replacement" value={this.state.scheduleFreq} onChange={this.handleFrequency}>
            <option>1x</option>
            <option>2x</option>
            <option>3x</option>
          </select>
          <h3> per </h3>
          <select className="dropdown-replacement" value={this.state.scheduleDayWeek} onChange={this.handleScheduleDayWeek}>
            <option>day</option>
            <option>week</option>
          </select>
        </div>
        <div>
          <button className= "remindBtn" onClick={this.submitForm}> Remind Me </button>
        </div>
      </div>

    );
  }
}


/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  topbar: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 10
  },
  submit: {
    textAlign: 'center'
  },

});

*/
