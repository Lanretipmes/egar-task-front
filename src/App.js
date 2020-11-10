import './App.css';
import React, {Component} from "react";
import SecurityTable from "./SecurityTable";
import Graph from "./Graph";

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

      const {isLoaded, items, config} = this.state;

      if (!isLoaded) {
        return <div>loading</div>;
    }
    else {
      return (
          <div className="App">
              <SecurityTable data={items} addRow={this.addRow} updateRow={this.updateRow} deleteRow={this.deleteRow}/>
              <Graph data={items}/>
          </div>
      );
    }
  }
}

export default App;
