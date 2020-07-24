import reefer from 'tools/reefer';

import './reefer-example.scss';

export default ({element, ui, control}) => {
  const dot = reefer({
    x: 0,
    y: 0,
    scale: 1,
  })
    .onFrame(({x, y, scale}) => {
      ui['dot'].style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      ui['dot'].style.backgroundColor = 'var(--color-bright)';
    });

  element.addEventListener('dblclick', e => {
    const scale = dot.get().scale === 1 ? 5 : 1;
    dot.set({scale}, { stiffness: 100, damping: 10 });
  });

  element.addEventListener('mousedown', e => {
    const { clientX, clientY } = e;
    dot.set({x: clientX, y: clientY});
  });
  element.addEventListener('mousemove', e => {
    if (e.buttons === 0) return;
    const { clientX, clientY } = e;
    dot.set({x: clientX, y: clientY}, { stiffness: 330, damping: 18 });
  });
}
