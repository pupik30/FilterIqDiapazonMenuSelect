import { useEffect, useState } from 'react';
import './App.css'

const LIMIT = 200;

function App() {

  const [students, setStudents] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(LIMIT);
  // const filtered = students.filter(s => s.iq >= min && s.iq <= max);

  const [sexes, setSexes] = useState([]);

  const [status, setStatus] = useState('all');

  // const filtered = students.filter(s => s.iq >= min && s.iq <= max && (sexes.length === 0 || sexes.includes(s.sex)));

  const filtered = students.filter(s =>
    s.iq >= min &&
    s.iq <= max &&
    (sexes.length === 0 || sexes.includes(s.sex)) &&
    (status === 'all' || s.status === status)
  );


useEffect (() => {
  fetch('http://localhost:3000/api/students')
  .then(r => r.json())
  .then(data => setStudents(data.records));
}, []);


function moveMin(value) {
  setMin(Math.min(value, max));
}

function moveMax(value) {
  setMax(Math.max(value, min));
}



function toggleSex(value) {
  setSexes(prev =>
    prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]
  );
}

return (
<section className='main'>

  <h1>Iq Группы:</h1>

  <div className='panel'>
    
    <div className='inputs'>

      <input
        type='number' min='0'
        value={min}
        onChange={e => setMin(Number(e.target.value))}
      />

      <span>of</span>

      <input
        type='number' min='0'
        value={max}
        onChange={e => setMax(Number(e.target.value))}
      />
    </div>

    <div className='range'>

        <div className='fill'
        style={{
          left: `${(Math.min(min, LIMIT) / LIMIT) * 100}%`,
          right: `${100 - (Math.min(max, LIMIT) / LIMIT) * 100}%`
        }}
        />

        <input 
        type="range"
        min="0"
        max={LIMIT}
        value={Math.min(min,LIMIT)}
        onChange={e => moveMin(Number(e.target.value))}
        />
        
        <input 
        type="range"
        min="0"
        max={LIMIT}
        value={Math.min(max,LIMIT)}
        onChange={e => moveMax(Number(e.target.value))}
        />
 
      </div> 



        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value='all'>Все</option>
          <option value='был'>Был</option>
          <option value='оп'>Опоздал</option>
          <option value='н'>Не был</option>
          <option value='б'>Болеет</option>
        </select>


        <div className='sexes'>
          
          <label>
            <input
              type='checkbox'
              checked={sexes.includes('male')}
              onChange={() => toggleSex('male')}
            />
            Male
          </label>
          <label>
            <input
              type='checkbox'
              checked={sexes.includes('female')}
              onChange={() => toggleSex('female')}
            />
            Female
          </label>
        </div>
  </div>

  <p  className='count'>Найдено {filtered.length} из {students.length}</p>


  <ul className='list'>
    {filtered.map(s => (
      <li key={s.id} className='card'>
        <span>{s.name}</span>
        <b>{s.iq}iq</b>
        <b>{s.sex}</b>
        <b>{s.status}</b>

      </li>
    ))}
  </ul>

</section>
)
}

export default App
