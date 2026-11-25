import Puzzle from './components/Puzzle';
import './App.css';

function App() {
  return (
    <main className="main">
      <h1 className="title">Найдовший однорядний цифровий пазл</h1>
      <p className="description">
        Чи любите ви пазли? Давайте складемо з вами цифровий пазл, де елементами
        з'єднання будуть перші або останні ДВІ цифри. Для спрощення завдання
        будемо використовувати однорядний пазл, де його фрагменти можуть
        розміщуватись тільки слідуючи один за одним.
      </p>
      <Puzzle />
    </main>
  );
}

export default App;
