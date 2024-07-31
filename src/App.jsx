import { useState } from 'react';
import './App.css';

function App() {
  // Define el estado inicial para las notas
  const [grades, setGrades] = useState([
    { description: '', grade: '', percentage: '' },
    { description: '', grade: '', percentage: '' },
    { description: '', grade: '', percentage: '' }
  ]);

  // Define el estado inicial para el promedio
  const [average, setAverage] = useState(null);
  // Define el estado inicial para los errores
  const [error, setError] = useState('');

  // Función para manejar los cambios en los inputs
  const handleInputChange = (index, event) => {
    const { name, value } = event.target; // Obtiene el nombre y el valor del input
    const newGrades = [...grades]; // Crea una copia del array de notas
    newGrades[index][name] = value; // Actualiza el valor correspondiente en la copia
    setGrades(newGrades); // Actualiza el estado con la nueva copia
  };

  // Función para agregar una nueva fila de notas
  const handleAddGrade = () => {
    setGrades([...grades, { description: '', grade: '', percentage: '' }]); // Agrega un nuevo objeto de notas vacío al array
  };

  // Función para eliminar una fila de notas
  const handleRemoveGrade = (index) => {
    if (grades.length > 1) { // Solo permite eliminar si hay más de una fila
      const newGrades = grades.filter((_, i) => i !== index); // Filtra el array para eliminar el elemento en el índice dado
      setGrades(newGrades); // Actualiza el estado con la nueva copia
    }
  };

  // Función para calcular el promedio
  const calculateAverage = () => {
    let total = 0; // Inicializa la suma total de las notas
    let totalPercentage = 0; // Inicializa la suma total de los porcentajes
    let newError = ''; // Inicializa el mensaje de error

    // Validar que todas las notas sean entre 0 y 20 y que los porcentajes estén entre 0 y 100
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
        total += parseFloat(grade) * (parseFloat(percentage) / 100); // Calcula el valor ponderado y lo suma al total
        totalPercentage += parseFloat(percentage); // Suma el porcentaje al total de porcentajes
      }
    }

    // Validar que la suma de los porcentajes no exceda el 100%
    if (!newError && totalPercentage > 100) {
      newError = `La suma de los porcentajes no debe exceder el 100%.`;
    }

    // Validar que la suma de los porcentajes sea exactamente 100%
    if (!newError && totalPercentage !== 100) {
      newError = `La suma de los porcentajes debe ser exactamente 100%.`;
    }

    if (newError) {
      setError(newError); // Establece el mensaje de error
      setAverage(null); // Borra el promedio anterior
    } else {
      const avg = total / (totalPercentage / 100); // Calcula el promedio
      setAverage(avg.toFixed(2)); // Actualiza el estado con el promedio, redondeado a dos decimales
      setError(''); // Borra cualquier mensaje de error previo
    }
  };

  return (
    <div className="App">
      <h1>CALCULA TU PROMEDIO</h1>
      <div className="grades-container">
        <div className="grid-container header">
          <div>DESCRIPCIÓN</div>
          <div>NOTA</div>
          <div>PORCENTAJE</div>
        </div>
        {grades.map((grade, index) => ( // Mapea cada objeto de notas a una fila de inputs
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
              min="0" // Asegura que el valor mínimo sea 0
              max="20" // Asegura que el valor máximo sea 20
            />
            <div className="percentage-container">
              <div className="percentage-input">
                <input
                  type="number"
                  name="percentage"
                  value={grade.percentage}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder="Porcentaje"
                  min="0" // Asegura que el valor mínimo sea 0
                  max="100" // Asegura que el valor máximo sea 100
                />
                <div className="percentage-symbol">%</div>
              </div>
              <div className="buttons">
                <button onClick={handleAddGrade}>+</button>
                <button
                  onClick={() => handleRemoveGrade(index)} // Botón para eliminar una fila
                  disabled={grades.length === 1} // Deshabilita el botón si solo hay una fila
                >-</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="calculate-button" onClick={calculateAverage}>
        Calcular
      </button>
      {error && ( // Muestra el mensaje de error si hay alguno
        <p className="error">ERROR: {error}</p>
      )}
      {average !== null && !error && ( // Muestra el promedio si está calculado y no hay error
        <p>Tu promedio es <br /> <span className='number'>{average}</span></p>
      )}
      <span className='copy' translate='no'>
        Made with ❤️ by Erick DC
      </span>
    </div>
  );
}

export default App;
