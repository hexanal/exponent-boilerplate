import stater from 'tools/stater';

import shaperCell from './shaper-cell';
import './shaper.scss';

export default ({element, ui, control, children}) => {
  const { grid, template } = ui;
  const state = stater({
    cells: [],
    rows: 10,
    cols: 10
  });

  state.rows.changed(build);
  state.cols.changed(build);

  function build() {
    const { rows, cols, cells } = state.get();

    grid.innerHTML = '';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const newCell = template.content.cloneNode(true);
        const id = r+'-'+c;

        newCell.children[0].dataset.cellId = id;

        grid.appendChild(newCell);

        const cell = grid.querySelector(`[data-cell-id="${id}"]`);

        cells.push({
          id,
          component: shaperCell({
            element: cell
          })
        });

        state.cells.set(cells);
      }
    }
  }

  build();
}

