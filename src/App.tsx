import Table from './Table';
import Button from './components/Button';

function App() {
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
