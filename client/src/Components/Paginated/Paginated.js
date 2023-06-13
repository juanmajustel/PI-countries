import React from "react";
import "./Paginated.css";

export default function Paginated({
  allCountries,
  countriesPage,
  paginatedNum,
  currPage,
  setCurrPage,
}) {
  const handlePageClick = (num) => {
    setCurrPage(num);
    paginatedNum(num);
  };

  const totalPages = Math.ceil(allCountries.length / countriesPage);
  const visiblePages = 4; // Número de páginas visibles
  const range = calculatePageRange(currPage, totalPages, visiblePages);

  function calculatePageRange(currPage, totalPages, visiblePages) {
    let startPage;
    let endPage;

    if (totalPages <= visiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currPage <= Math.ceil(visiblePages / 2)) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currPage >= totalPages - Math.floor(visiblePages / 2)) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currPage - Math.floor(visiblePages / 2);
        endPage = currPage + Math.ceil(visiblePages / 2) - 1;
      }
    }

    return { startPage, endPage };
  }

  return (
    <nav>
      <ul className="paging">
        {currPage > 1 && (
          <li>
            <button
              onClick={() => handlePageClick(currPage - 1)}
              className="page-button"
            >
              {"🡰"}
            </button>
          </li>
        )}

        {Array.from({ length: range.endPage - range.startPage + 1 }).map(
          (_, index) => {
            const num = range.startPage + index;
            return (
              <li key={num}>
                <button
                  onClick={() => handlePageClick(num)}
                  className={`page-button ${num === currPage ? "active" : ""}`}
                >
                  {num}
                </button>
              </li>
            );
          }
        )}

        {currPage < totalPages && (
          <li>
            <button
              onClick={() => handlePageClick(currPage + 1)}
              className="page-button"
            >
              {"🡲"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
//Array.from({ length: range.endPage - range.startPage + 1 }) se utiliza para crear una matriz de números que corresponde a las páginas que se mostrarán en la paginación. El rango de páginas se calcula utilizando las variables range.startPage y range.endPage, y se utiliza Array.from() para crear una matriz de longitud igual a la diferencia entre endPage y startPage más 1. Luego, se utiliza .map() para iterar sobre esta matriz y generar los elementos correspondientes para cada número de página.

//  El componente Paginated se encarga de mostrar la paginación en la interfaz de usuario y manejar las interacciones con los botones de página. Aquí está el resumen de cada parte:

// handlePageClick: Es una función que se ejecuta cuando se hace clic en un botón de página. Recibe el número de página como argumento y actualiza el estado currPage utilizando la función setCurrPage proporcionada por las props. También llama a la función paginatedNum para realizar acciones adicionales relacionadas con la página seleccionada.

// pagin: Es una variable que calcula el número total de páginas en función de la longitud de la lista de países y la cantidad de países por página. Utiliza la función Math.ceil() para redondear hacia arriba y asegurarse de tener un número entero de páginas.

// pagesNumber: Es una matriz que contiene los números de página que se mostrarán en la paginación. Utiliza un bucle for para generar los números de página del 1 al pagin y los agrega a la matriz.

// Dentro del JSX del componente, se utiliza un bucle .map() para renderizar cada botón de página. Cada botón se renderiza como un <li> con un <button> dentro. Se asigna la clase "active" al botón de página actual (num === currPage) para resaltarlo visualmente.

// Además, se agregaron los botones de navegación "←" y "→" para ir a la página anterior y siguiente respectivamente. Estos botones se renderizan condicionalmente utilizando la comparación currPage < totalPages. Al hacer clic en estos botones, se llama a la función handlePageClick con el número de página correspondiente.

// En resumen, el componente Paginated muestra los botones de página y permite al usuario navegar a través de las páginas mediante la función handlePageClick
