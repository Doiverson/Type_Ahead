import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Moon from './connection/Moon';

const moon = new Moon();

export default class InputDropdown extends Component{

    state = {
        prov : [
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
        inputProv: "",
        areaList: [],
        inputValue: ""
    }

    // disabledInput = () => {
    //     var element = ReactDOM.findDOMNode(this.refs.test);
    //     element.setAttribute('disabled', 'true');
    // };

    selectedProv = (e) => {
        console.log(e.target.value);

        this.setState({
            inputProv: e.target.value
        })}

    // componentDidMount () {
    //     moon
    //     // .get(`api/area/search/${this.state.inputValue}`)
    //         .get("api/area/search/du")
    //         .then(res =>{
    //             // console.log(JSON.stringify(data));
    //             for(let i = 0; i < res.data.length; i++) {
    //                 // console.log(res.data[i].name);
    //                 this.setState({ prov: this.state.prov.concat([res.data[i].admin])});
    //                 // this.setState({ areaList:[res.data[i].name] });
    //             }
    //
    //             // console.log(this.state.prov);
    //         })
    //         .catch(err => {
    //             console.log("ERROR");
    //             // this.disabledInput();
    //             console.log(JSON.stringify(err));
    //         })
    // }

    onChange = (e) => {
        this.setState({inputProv: e.target.value});
            moon
                .get(`api/area/search/${this.state.inputProv}`)
            //     .get("api/area/search/du")
                .then(res =>{
                    // console.log(JSON.stringify(data));
                    for(let i = 0; i < res.data.length; i++) {
                        // console.log(res.data[i].name);
                        this.setState({ prov: this.state.prov.concat([res.data[i].admin])});
                        // this.setState({ areaList:[res.data[i].name] });
                    }

                    // console.log(this.state.prov);
                })
                .catch(err => {
                    console.log("ERROR");
                    // this.disabledInput();
                    console.log(JSON.stringify(err));
                })
    };


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

                {/*<input id="errCatch" ref="test" className="input__city-item"　onChange={this.filterList} />*/}
                {/*<div>*/}
                    {/*{this.state.items.map((area, index) => {*/}
                        {/*return (*/}
                            {/*<li value={this.state.areaList} key={index} name="areaList">{area}</li>*/}
                        {/*)*/}
                    {/*})}*/}
                {/*</div>*/}

            </div>
        );

    }
}
