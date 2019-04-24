// v1 STAR MATCH - Starting Template
// Items that share similar Data or Behaviors are good candidates for

/* Buttons need to do multiple things, good clue that it might need to be a component
  Gotcha: By naming component number, you're overwriting the native JS class Number!!!
  How to avoid this? Always name your components with 2 words instead of one
*/
const PlayNumber = props => (
  // Why does the onclick work? Javascript Closures
  <button className="number" onClick={() => console.log('Num', props.number)}>
    {props.number}
  </button>
);

const StarsDisplay = props => (
  <React.Fragment>
    {utils.range(1,props.count).map(starId => 
      <div key={starId} className="star" /> // Key always associated with the dynamic portion of map
    )}
  </React.Fragment>
);

const StarMatch = () => {
  // Whenever u identify a data element that's used in the ui and is going to change value, should make it into a state element
  const [stars, setStars] = useState(utils.random(1,9)); // Avoid for and while loops in react if you can: map/filter/reduce work better
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars}/>
        </div>
        <div className="right">
          {utils.range(1,9).map(number =>
            <PlayNumber key={number} number={number} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

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

ReactDOM.render(<StarMatch />, mountNode);
