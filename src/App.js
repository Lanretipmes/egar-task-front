import './App.css';
import React, {Component} from "react";
import SecurityTable from "./SecurityTable";
import Graph from "./Graph";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isLoaded: false,
    }
  }

  componentDidMount() {
    this.reloadData();
  }

    reloadData = () => {
        fetch('http://localhost:8080')
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        isLoaded: true,
                        items: json,
                    })
            });
    };

    addRow = (row) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(row)
        };
        fetch('http://localhost:8080/add', requestOptions)
            .then(res => res.json())
            .then(json => {
            this.setState(
                {
                    isLoaded: true,
                    items: json,
                })
        });
    };

    updateRow = (row) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(row)
        };
        fetch('http://localhost:8080/update', requestOptions)
            .then(res => res.json())
            .then(json => {
            this.setState(
                {
                    isLoaded: true,
                    items: json,
                })
        });
    };

    deleteRow = (row) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(row)
        };
        fetch('http://localhost:8080/delete', requestOptions)
            .then(res => res.json())
            .then(json => {
            this.setState(
                {
                    isLoaded: true,
                    items: json,
                })
        });
    };

  render() {

      const {isLoaded, items} = this.state;

      const divStyle = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      };

      const imgStyle = {
          width: '450px',
          alt: 'pic'

      };

      if (!isLoaded) {
        return (
            <div style={divStyle}>
                <img
                    style={imgStyle} src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/synchronize_ccxk.svg" alt={'pic'}/>
                <h3>Loading Data...</h3>
                <h4>If it takes too long, you should check your backend app</h4>
            </div>
        )
    }
    else {
      return (
          <div className="App">
              <AppBar position="static">
                  <Typography variant="h6">
                      Security Data Table
                  </Typography>
              </AppBar>
              <SecurityTable data={items} addRow={this.addRow} updateRow={this.updateRow} deleteRow={this.deleteRow}/>
              <Graph data={items}/>
          </div>
      );
    }
  }
}

export default App;
