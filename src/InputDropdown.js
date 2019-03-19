import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moon from './connection/Moon';

const moon = new Moon();

export default class InputDropdown extends Component{

    state = {
        prov : [
            "",
            "Alberta",
            "British Columbia",
            "Manitoba",
            "Nova Scotia",
            "New Brunswick",
            "Newfoundland and Labrador",
            "Ontario",
            "Prince Edward Island",
            "Quebec",
            "Saskatchewan",
        ],
        areaList: [],
        items: []
    }

    disabledInput = () => {
        var element = ReactDOM.findDOMNode(this.refs.test);
        element.setAttribute('disabled', 'true');
    };


    onChange = (e) => {

        //
        e.persist();

        moon
            .get(`api/area/search/areaname/${e.target.value}`)
            .then(res =>{
                for(let i = 0; i < res.data.length; i++) {
                    // console.log(res.data[i].name);
                    this.setState({ areaList: this.state.areaList.concat([res.data[i].city])});
                    console.log(this.state.areaList);
                }

            })
            .catch(err => {
                console.log("ERROR");
                this.disabledInput();
                console.log(JSON.stringify(err));
            })
    };

    filterList = (e) => {
        const updateList = this.state.areaList.filter((item) => {
            return item.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
        })
        this.setState({items: updateList})
    }


    render() {
        return (
            <div>
                <select
                    id="errCatch"
                    value={this.state.inputProv}
                    onChange={this.onChange}
                    className="input__city-item">{
                    this.state.prov.map((prov, index) =>
                        <option key={index} name="areaList">{prov}</option>)}
                </select>

                <input id="errCatch" ref="test" className="input__city-item"　onChange={this.filterList} />
                <div>
                    {this.state.items.map((area, index) => {
                        return ( <li key={index} >{area}</li> )
                    })}
                </div>

            </div>
        );

    }
}
