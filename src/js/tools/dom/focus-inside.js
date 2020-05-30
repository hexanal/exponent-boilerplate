export default function focusInside(element) {
  const items = element.querySelectorAll('a, input, button, textarea, select');
  items[0].focus();
  return items[0];
}
