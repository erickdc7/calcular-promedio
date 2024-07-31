import { useState } from 'react';
import './App.css';

function App() {
  const [grades, setGrades] = useState([
    { description: '', grade: '', percentage: '' },
    { description: '', grade: '', percentage: '' },
    { description: '', grade: '', percentage: '' }
  ]);
  const [average, setAverage] = useState(null);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newGrades = [...grades];
    newGrades[index][name] = value;
    setGrades(newGrades);
  };

  const handleAddGrade = () => {
    setGrades([...grades, { description: '', grade: '', percentage: '' }]);
  };

  const handleRemoveGrade = (index) => {
    if (grades.length > 1) {
      const newGrades = grades.filter((_, i) => i !== index);
      setGrades(newGrades);
    }
  };

  const calculateAverage = () => {
    let total = 0;
    let totalPercentage = 0;
    grades.forEach(({ grade, percentage }) => {
      if (grade && percentage) {
        total += parseFloat(grade) * (parseFloat(percentage) / 100);
        totalPercentage += parseFloat(percentage);
      }
    });
    const avg = total / (totalPercentage / 100);
    setAverage(avg.toFixed(2));
  };

  return (
    <div className="App">
      <h1>CALCULA TU PROMEDIO 📝</h1>
      <div className="grades-container">
        <div className="grid-container header">
          <div>DESCRIPCIÓN</div>
          <div>NOTA</div>
          <div>PORCENTAJE</div>
        </div>
        {grades.map((grade, index) => (
          <div className="grid-container" key={index}>
            <input
              type="text"
              name="description"
              value={grade.description}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Descripción"
            />
            <input
              type="number"
              name="grade"
              value={grade.grade}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Nota"
            />
            <div className="percentage-container">
              <div className="percentage-input">
                <input
                  type="number"
                  name="percentage"
                  value={grade.percentage}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder="Porcentaje"
                />
                <div className="percentage-symbol">%</div>
              </div>
              <div className="buttons">
                <button onClick={handleAddGrade}>+</button>
                <button
                  onClick={() => handleRemoveGrade(index)}
                  disabled={grades.length === 1}
                >-</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="calculate-button" onClick={calculateAverage}>
        Calcular
      </button>
      {average !== null && (
        <p>Tu promedio es <br /> <span className='number'>{average}</span></p>
      )}
      <span className='copy'>
        Made with ❤️ by Erick DC
      </span>
    </div>
  );
}

export default App;
