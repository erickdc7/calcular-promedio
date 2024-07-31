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
    grades.forEach(({ grade, percentage }) => { // Itera sobre cada objeto de notas
      if (grade && percentage) { // Si hay valores para la nota y el porcentaje
        total += parseFloat(grade) * (parseFloat(percentage) / 100); // Calcula el valor ponderado y lo suma al total
        totalPercentage += parseFloat(percentage); // Suma el porcentaje al total de porcentajes
      }
    });
    const avg = total / (totalPercentage / 100); // Calcula el promedio
    setAverage(avg.toFixed(2)); // Actualiza el estado con el promedio, redondeado a dos decimales
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
      {average !== null && ( // Muestra el promedio si está calculado
        <p>Tu promedio es <br /> <span className='number'>{average}</span></p>
      )}
      <span className='copy'>
        Made with ❤️ by Erick DC
      </span>
    </div>
  );
}

export default App;
