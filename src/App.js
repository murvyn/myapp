import "./App.css";
import { React, useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monster, setMonster] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setMonster(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();

    //this is the promise one
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((users) => setMonster(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monster.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monster, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeHolder="search monster"
        className="monsters-search-box"
      />
      <CardList monster={filteredMonsters} />
    </div>
  );
};

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       monster: [],
//       searchField: "",
//     };

//   }

//   async componentDidMount() {

//     try {
//       const userInfo = await fetch(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       const users = await userInfo.json();
//       await this.setState({
//         monster: users,
//       });

//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   onSearchChange = (event) => {
//     console.log(event.target.value);
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monster, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monster.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox
//         onChangeHandler = {onSearchChange}
//         placeHolder = 'search monster'
//         className= 'monsters-search-box'
//         />
//         <CardList monster={filteredMonsters} />
//       </div>
//     );
//   }
// }

//export default App;
