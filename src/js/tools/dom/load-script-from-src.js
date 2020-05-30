export default function loadScriptFromSrc(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      resolve();
    });
  });
}
