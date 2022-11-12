import { readSync } from 'fs';
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
    let prevSignal = "stop";
    const controller = new AbortController();
    const get = async () => {
      try {
        const res = await fetch(`api/data/${prevSignal}`, { signal: controller.signal })
        if (res.status != 200) {
          await get();
        } else {
          console.log("sygnał po fetch data, a przed set response")
          prevSignal = await res.text()
          setStopSignal(prevSignal)
          await get();
        }
      } catch (e) {
        console.warn(e);
      }
    }
    get();
    return () => {
      controller.abort();
    }
  }, []
  )
  React.useEffect(() => {
    fetch('api/currentScenario')
      .then((response) => response.json())
      .then((data) => {
        setStopSignal(data.value)
      });
  }, []
  )
  const isWorking = stopSignal !== "stop";

  return (
    <div className="ui hidden divider">
      <p>
        <div>
          <label>Choose a scenario: </label>
          {currentScenario && <select className="ui selection dropdown" name="scenarios" id="scenarios" onChange={onChange} value={currentScenario} disabled={isWorking}>
            {scenario?.map((scenario) => <option value={scenario.key}>{scenario.name}</option>)}
          </select>}
        </div>
        <div>
          <button className="ui primary button" disabled={isWorking} onClick={onStartClick}>start</button>
          <button className="ui button" disabled={!isWorking} onClick={onStopClick}>stop</button>
        </div>
      </p>

      <div>
        <button className="ui button" onClick={addOne}>symulacja Stop</button>
      </div>

      <div>data z fetch async api: {stopSignal}</div>

    </div>
  );
}

export default App;
