// @author ModEraNoah
//
// Feld von n x m
//
// Jede lebende oder tote Zelle hat genau 8 Nachbarzellen => die Ränder werden also nicht betrachtet
//
// Rand kann entweder dauertot sein, oder ein toroides Spielfeld => Ränder grenzen an den gegenüberliegenden Rand an
//  => hier: Ränder sind tot
//
// Spielregeln:
// ------------
// 1. eine tote Zelle mit genau (!) 3 lebenden Nachbarn (3/8) wird in der  folgegeneration geboren
//
// 2. eine lebende Zelle mit weniger als 2 lebenden Nachbarn stirbt in der Folgegeneration
// 3. eine lebende Zelle mit 2 oder 3 lebenden Nachbarn bleibt in der Folgegeneration am Leben
// 4. eine lebende Zelle mit mehr als 3 lebenden Nachbarn stirbt in der Folgegeneration

// Benötigen ein Spielfeld => setzt die größe fest
//  - hat die Zellen, die entweder tot oder lebend sind
//  - Methode, um zu prüfen, ob die Zelle in der nächsten Generation lebt oder nicht
// Benötigen Kopie des Spielfelds -> aktuelle Generation und alte/zukünftige Generation
// Ausgabe des Ganzen

type GameField = string[][];
type Cell = boolean;

function initialFillGameField(
  rows: number,
  columns: number,
  prob: number,
): GameField {
  const field: GameField = [];
  for (let i: number = 0; i < rows; i++) {
    field.push([]);
    for (let j: number = 0; j < columns; j++) {
      let alive: number = Math.random();
      if (i == 0 || i == rows - 1 || j == 0 || j == columns - 1)
        field[i][j] = "O";
      else field[i][j] = alive <= prob ? "X" : " ";
    }
  }
  return field;
}

function printGeneration(field: GameField): void {
  field.forEach((row) => {
    let s = "";
    row.forEach((col) => {
      s += col;
    });
    console.log(s);
    // console.log(JSON.stringify(row));
  });
}

function isAlive(field: GameField, row: number, column: number): boolean {
  let aliveNeighbours: number = 0;
  for (let j: number = row - 1; j <= row + 1; j++) {
    for (let i: number = column - 1; i <= column + 1; i++) {
      if (j === row && i === column) continue;
      if (field[row][i] == "X") aliveNeighbours++;
    }
  }
  if (field[row][column] == "X") {
    return aliveNeighbours == 2 || aliveNeighbours == 3;
  }
  return aliveNeighbours == 3;
}

function newGeneration(field: GameField): GameField {
  const newField: GameField = field;
  for (let i: number = 1; i < field.length - 1; i++) {
    for (let j: number = 1; j < field[i].length - 1; j++) {
      newField[i][j] = isAlive(field, i, j) ? "X" : " ";
    }
  }
  return newField;
}

// console.log(initialFillGameField(3, 10, 0.7));
let f = initialFillGameField(50, 100, 0.15);

let loading = () => {
  let i = 0;

  return setInterval(() => {
    console.clear();
    printGeneration(f);
    f = newGeneration(f);
  }, 82);
};

loading();
