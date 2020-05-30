export default function inView(element, cb, options = { threshold: 0.5 }) {
  const intersectionObserver = new IntersectionObserver(entries => {
    const { isIntersecting } = entries[0];
    cb(isIntersecting);
  }, options);
  intersectionObserver.observe(element);
  return intersectionObserver;
}
