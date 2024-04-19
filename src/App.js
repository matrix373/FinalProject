import React from 'react'; 
import './App.css';


// - Here we have an array of objects
// - We might see this when we have multiple rows of results from our database or API
const beans = [
  { id: 1, title: 'Arabica', origin: 'Native to Ethiopia', flavor: 'Varaible-distinctly not bitter', bestuse: 'Brewed coffee', isBrewedCoffe: true },
  { id: 2, title: 'Robusta', origin: 'Native to sub-Saharan Africa', flavor: 'Bitter, woody or nutty', bestuse: 'Coffee blends and espresso', isBrewedCoffe: false  },
  { id: 3, title: 'Excelsa', origin: 'South Asia', flavor: 'Complex, tart, fruity and dark', bestuse: 'Brewed coffee and blends', isBrewedCoffe: true },
  { id: 4, title: 'Liberica', origin: 'South Asia', flavor: 'Unusual, nutty and woody', bestuse: 'Brewed coffee and desserts', isBrewedCoffe: true  },
];


function CoffeTypes() {
  return (
    <div>
      {beans.map(bean => <BeanDetail key={bean.id} bean={bean} />)}
    </div>
  );
}

function BeanDetail({bean}) {
  return (
    <div>
      <BeanTitle bean={bean} />
      <ul>
        <li>Origin: {bean.origin}</li>
        <li>Flavor: {bean.flavor}</li>
        <li>Best Used By: {bean.bestuse}</li>
      </ul>
    </div>
  );
}

function BeanTitle({bean}) {
  return (
    <>
      <h2 style={{
        color: bean.isBrewedCoffe ? 'brown' : 'red'
      }}>{bean.title}</h2>
      
    </>
  );
}



// This is the main component in the file
// It's called below using the 'export default' keywords
function App() {
  return (
    // Use className for CSS and HTML classes
    <div className="App">
      <CoffeTypes />
    </div>
  );
}

// The export default keywords specifiy the main component in the file
export default App;