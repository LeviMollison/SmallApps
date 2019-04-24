const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

class Panel extends React.Component{
  render()
  {
    return <div>Hey You</div>
  }
}

class FullApp extends React.Component {
  render(){
    return (
    <div>
      <header>{this.props.title}</header>
      <Panel />
    </div>
    )}
}

ReactDOM.render(
  <FullApp title="Levi's Example App"  />,
  mountNode
  
);