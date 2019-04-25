/* Buttons need to do multiple things, good clue that it might need to be a component
  Gotcha: By naming component number, you're overwriting the native JS class Number!!!
  How to avoid this? Always name your components with 2 words instead of one
*/
const PlayNumber = props => (
  // Why does the onclick work? Javascript Closures
  <button 
    className="number" 
    onClick={() => props.onClick(props.number, props.status)}
    style={{backgroundColor: colors[props.status] }}
  >
      {props.number}
  </button>
);

const PlayAgain = props => (
  <div className="game-done">
    <div 
      class="message"
      style={{ color:props.gameStatus === 'lost' ? 'red' : 'green'}}
    >
      {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
)

const StarsDisplay = props => (
  <React.Fragment>
    {utils.range(1,props.count).map(starId => 
      <div key={starId} className="star" /> // Key always associated with the dynamic portion of map
    )}
  </React.Fragment>
);

// This is entirely too big; manages the states and renders everything based on states
const Game = (props) => {
  // Whenever u identify a data element that's used in the ui and is going to change value, should make 
  // it into a state element
  // Avoid for and while loops in react if you can: map/filter/reduce work better
  const [stars, setStars] = useState(utils.random(1,9)); 
  const [availableNums, setAvailableNums] = useState(utils.range(1,9)); //Mock data is good for pre-testing ui
  const [candidateNums, setCandidateNums] = useState([]); // React.useState() available globally in plygrnd
  const [secondsLeft, setSecondsLeft] = useState([10]);
  // Some other hook functions other than useState like useEffect
  // Will run the function passed every time owner component renders itself
  /* 
    Runs every time a state is changed which causes component to render
    so every time you click something. Can create bugs like creating extra timeouts
    When you create side effect, clean it when no longer needed
    
    Introduce side effect in code block, clean up in return function
  */
  // Available globally in the playground
  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0){
       const timerId = setTimeout(()=>{
        setSecondsLeft(secondsLeft - 1);
      }, 1000); 
      // will run the returned function when it's about to unmount / re-render component
      return () => clearTimeout(timerId);
    }
  }); 
  
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // const gameIsWon = availableNums.length === 0;
  // const gameIsLost = secondsLeft === 0;
  const gameStatus =  availableNums.length === 0 ? 'won':
    secondsLeft === 0 ? 'lost' : 'active'
  
  // const resetGame = () => {
  //   setStars(utils.random(1,9));
  //   setAvailableNums(utils.range(1,9));
  //   setCandidateNums([]);
  //   // better to unmount components than reset their states to clean code up
  // }
  
  // by returning a string, can use as a key directly to style array
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) return 'used';
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }
  
  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== 'active' || currentStatus == 'used'){
      return;
    } 
    const newCandidateNums = 
          currentStatus === 'available' ? 
            // If it's part of the candidate numbers array, need to remove it
            candidateNums.concat(number) : candidateNums.filter(cn => cn !== number)
    
          candidateNums.concat(number);
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else { 
      /* Sum of candidates = number of stars; we have a correct pick
         If the number is not included in the new candidate numbers, keep it in the available numbers. Otherwise
         Remove it
      */
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9)); //Redraws number of stars that are playable
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };
  
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? 
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} /> :
            <StarsDisplay count={stars}/>
          }
        </div>
        <div className="right">
          {utils.range(1,9).map(number =>
            <PlayNumber 
              key={number} 
              status={numberStatus(number)}
              number={number} 
              onClick={onNumberClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(max * Math.random()),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length)];
  },
};

// Unmount and remount for proper resetting
ReactDOM.render(<StarMatch />, mountNode);
