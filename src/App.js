import './App.css';
import React, {Component} from "react";
import SecurityTable from "./SecurityTable";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isLoaded: false,
    }
  }

  componentDidMount() {

    fetch('http://localhost:8080')
        .then(res => res.json())
        .then(json => {
        this.setState(
            {
              isLoaded: true,
              items: json,
            })
    });

  }


  render() {

      const {isLoaded, items} = this.state;

      if (!isLoaded) {
        return <div>loading</div>;
    }

    else {
      return (
          <div className="App">
              <SecurityTable data={items} />
          </div>
      );
    }
  }
}

export default App;
