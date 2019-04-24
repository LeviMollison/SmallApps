// const testData = [
//     {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
//     {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
//     {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// ];

// What didn't we do: handle errors
/*
  What if they input invalid handle?
  What should UI do if request fails over the network?
  What should UI do if request taking too long?
*/

const CardList = (props) => (
  // passing key gives react the value to use as the primary-key for the data
  <div> 
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />) }
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

// Form is doing too much: getting the data, then handling it. Component shouldnt have
// this much responibilty
// Entire app shouldnt rely directly on axios library, should have small agent type module that has
// one responsibility to communicate with external API, then have code rely on that instead

/*
  Exercise: convert class components into function components
*/
class Form extends React.Component {
  // userNameInput = React.createRef();
  // Fetch is good, but there's also axios
  state = {userName: ''}
  // need async keyword to use await
  handleSubmit = async (event) => {
    event.preventDefault();
    // returns a promise
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    // console.log(
    //   //this.userNameInput.current.value
    //   //this.state.userName
    //   resp.data // axios returns data object with json data parsed for us
    // )
    this.props.onSubmit(resp.data);
    this.setState({userName: ''}) //Resets username getting tracked by react
  };
  render(){
    return (
      <form onSubmit={this.handleSubmit} action="">
        <input 
          type="text" 
          placeholder="Github username" 
          value={this.state.userName}
          // Below makes react aware of changes instead
          onChange={event => this.setState({ userName: event.target.value})} 
          // ref={this.userNameInput} 
          required
        />
        <button>Add Card</button>
      </form>
  )}
}

class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     profiles: testData
  //   };
  // }
  state = {profiles: []};
  // use this to allow children to change parent's state
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      // spread operator syntax for contatenating data
      profiles: [...prevState.profiles, profileData]
    })) // need this func to change state of a react component
  };
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles}/>
      </div>
    );
  } 
}

ReactDOM.render(
  <App title="The GitHub Cards App" />,
  mountNode,
);