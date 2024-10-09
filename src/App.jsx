import { useState, useEffect } from 'react';
import Image1 from '../src/assets/capibara1.png';
import Image2 from '../src/assets/capibara2.png';
import Image3 from '../src/assets/capibara3.png';
import BuenaNota from '../src/assets/buena-nota.png'; // Imagen para notas >= 14
import MalaNota from '../src/assets/mala-nota.png';  // Imagen para notas < 14 
import './App.css';

function App() {
  const [grades, setGrades] = useState([
    { description: '', grade: '', percentage: '' },
    { description: '', grade: '', percentage: '' },
    { description: '', grade: '', percentage: '' }
  ]);

  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');
  const [randomImage, setRandomImage] = useState(null);

  // Función para seleccionar una imagen aleatoria al cargar la página
  useEffect(() => {
    const images = [Image1, Image2, Image3];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  // Función para manejar los cambios en los inputs
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
    let newError = '';
    let validEntry = false;

    for (let i = 0; i < grades.length; i++) {
      const { grade, percentage } = grades[i];

      if (!grade && percentage) {
        newError = `Debe ingresar una nota para el porcentaje en la fila ${i + 1}.`;
        break;
      }

      if (grade && !percentage) {
        newError = `Debe ingresar un porcentaje para la nota en la fila ${i + 1}.`;
        break;
      }

      if (parseFloat(grade) < 0 || parseFloat(grade) > 20) {
        newError = `La nota en la fila ${i + 1} debe estar entre 0 y 20.`;
        break;
      }

      if (parseFloat(percentage) < 0 || parseFloat(percentage) > 100) {
        newError = `El porcentaje en la fila ${i + 1} debe estar entre 0 y 100.`;
        break;
      }

      if (grade && percentage) {
        validEntry = true;
        total += parseFloat(grade) * (parseFloat(percentage) / 100);
        totalPercentage += parseFloat(percentage);
      }
    }

    if (!newError && !validEntry) {
      newError = 'Debe ingresar al menos una nota y un porcentaje.';
    }

    if (!newError && totalPercentage > 100) {
      newError = `La suma de los porcentajes no debe exceder el 100%.`;
    }

    if (!newError && totalPercentage !== 100) {
      newError = `La suma de los porcentajes debe ser exactamente 100%.`;
    }

    if (newError) {
      setError(newError);
      setAverage(null);
    } else {
      const avg = total / (totalPercentage / 100);
      setAverage(avg.toFixed(2));
      setError('');

      // Condicional para mostrar imagen según el promedio
      if (avg >= 14) {
        setRandomImage(BuenaNota); // Si el promedio es mayor o igual a 14, muestra BuenaNota
      } else {
        setRandomImage(MalaNota); // Si el promedio es menor que 14, muestra MalaNota
      }
    }
  };

  return (
    <div className="App">
      <h1>CALCULA TU PROMEDIO</h1>
      <div className="grades-container">
        <div className="grid-container header">
          <div>DESCRIPCIÓN</div>
          <div translate='no'>NOTA</div>
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
              translate='no'
              min="0"
              max="20"
            />
            <div className="percentage-container">
              <div className="percentage-input">
                <input
                  type="number"
                  name="percentage"
                  value={grade.percentage}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder="Porcentaje"
                  min="0"
                  max="100"
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
      {error && (
        <p className="error">ERROR: {error}</p>
      )}
      {average !== null && !error && (
        <p>Tu promedio es <br /> <span className='number'>{average}</span></p>
      )}
      {randomImage && (
        <img src={randomImage} alt="Resultado" className='result-img' />
      )}
      <span className='copy' translate='no'>
        Made with ❤️ by Erick DC
      </span>
    </div>
  );
}

export default App;
