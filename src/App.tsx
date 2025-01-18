import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Table from './Table';
import Button from './components/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="p-6">
        <section>
          <Button onClick={() => {}}>Add Expense</Button>
        </section>
        <Table />
      </section>
    </>
  );
}

export default App;
