import React from 'react';

import './App.css';


type Scenario = {
  key: string
  name: string
}

function App() {

  const [scenario, setScenario] = React.useState<Scenario[] | undefined>()
  React.useEffect(() => {
    fetch('api/scenarios')
      .then((response) => response.json())
      .then((data) => {
        setScenario(data as Scenario[])
      });
  }, []
  )
  const [currentScenarioBe, setCurrentScenarioBe] = React.useState<string | undefined>()
  React.useEffect(() => {
    fetch('api/currentScenario')
      .then((response) => response.json())
      .then((data) => {
        setCurrentScenarioBe(data.value)
      });
  }, []
  )
  const [currentScenario, setCurrentScenario] = React.useState<string | undefined>()
  React.useEffect(() => {
    fetch('api/currentScenario')
      .then((response) => response.json())
      .then((data) => {
        setCurrentScenario(data.value)
      });
  }, []
  )

  const onChange = (e: React.FormEvent<HTMLSelectElement>) => setCurrentScenario(e.currentTarget.value);


  const onStartClick = () => fetch('api/scenario/' + currentScenario)
    .then((data) => {
      console.log(data)
    });

  const onStopClick = () => fetch('api/scenario/stop')
    .then((data) => {
      console.log(data)
    });

  const addOne = () => fetch('api/addOne')
    .then((data) => {
      console.log(data)
    });

  const [stopSignal, setStopSignal] = React.useState<string | undefined>();
  React.useEffect(() => {
    const get = async () => {
      try {
        const res = await fetch('api/data')
        //if (typeof res === "string") {
        setStopSignal(await res.text())

        //}
      } catch (e) {
        console.warn(e);
      }
      get();
    }
    get();
  }, []
  )
  const isWorking = stopSignal === "stop";



  return (
    <div>
      <button disabled={!isWorking} onClick={onStartClick}>start</button>
      <button disabled={isWorking} onClick={onStopClick}>stop</button>
      <button onClick={addOne}>symulacja Stop</button>
      <label>Choose a scenario:</label>
      {currentScenario && <select name="scenarios" id="scenarios" onChange={onChange} value={currentScenario} disabled={!isWorking}>
        {scenario?.map((scenario) => <option value={scenario.key}>{scenario.name}</option>)}
      </select>}
      <div>Current scenario {currentScenarioBe}</div>
      <div>data: {stopSignal}</div>

    </div>
  );
}


export default App;
function props(props: any) {
  throw new Error('Function not implemented.');
}
//for while
//{currentScenario?.map((currentScenario) => currentScenario.value)}
//defaultValue={currentScenario.value}
//<div>selected scenario: {currentScenario}</div>
//return (
//  <div>
//    <button onClick={start}>start</button>
//    <button onClick={getData}>getData</button>
//    <label>Choose a scenario:</label>
//    {currentValue?.map((currentValue) => <select name="cars" id="cars" defaultValue={currentValue.key}>
//      {scenario?.map((scenario) => <option value={scenario.key}>{scenario.name}</option>)}
//    </select>)}
//  </div>
//);

//const currentValue = React.useState();
  //React.useEffect(() =>{
  //  fetch('api/scenario/current')
  //  .then((response) => response.json())
  //
  //},[]);

  //const [currentValue, setCurrentValue] = React.useState<Scenario1[] | undefined>();
  //React.useEffect(() => {
  //  fetch('api/scenario/current')
  //    .then((response) => response.json())
  //    .then((data) => {
  //      console.log(data)
  //      setCurrentValue(data as Scenario1[])
  //
  //    })
  //}, []);

  //const Dropdown = ({options}) => {
  //  const [selectedOption, setSelectedOption] = React.useState<Options[] | undefined>(options[0].value);
  //  return (
  //      <select
  //        value={selectedOption}
  //        onChange={e => setSelectedOption(e.target.value)}>
  //        {options.map(o => (
  //          <option key={o.value} value={o.value}>{o.label}</option>
  //        ))}
  //      </select>
  //  );
  //};

  //const onChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setCurrentValue(event.target.value);
