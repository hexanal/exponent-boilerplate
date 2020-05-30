import inView from 'tools/dom/in-view';
import './lazy-image.scss';

export default ({element, ui}) => {
  const state = {
    loading: false,
    loaded: false,
    // todo: middleware to grab all the `data-` attributes from element
    // possibly for ui/control elements as well
    source: element.dataset.source,
    ratio: element.dataset.ratio
  };

  const loadSource = function(src) {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      img.src = src;
      img.style.position = 'absolute';
      img.style.opacity = 0;
      img.style.pointerEvents = 'none';
      document.head.appendChild(img);

      img.addEventListener('load', () => {
        resolve( img.getAttribute('src') );
      });
    });
  }

  inView(element, visible => {
    const { loading, loaded, source } = state;
    if ( !visible || loading || loaded) return;

    if (!loaded) {
      state.loading = true;

      loadSource( source )
        .then(src => {
          state.loaded = true;
          state.loading = false;
          element.dataset.loaded = state.loaded;
          ui['img'].setAttribute('src', src);
        });
    }
  });

  const getPaddingForAspectRatio = function(ratio) {
    return `${ratio * 100}%`;
  }

  element.style.paddingBottom = getPaddingForAspectRatio(state.ratio);
}
