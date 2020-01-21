import functionalModifier from 'ember-functional-modifiers';

/**
 *
 * @param {HTMLElement} element
 * @param {*} _
 * @param {*} param2
 */
export function blink(element, _, { duration = 500 }) {
  debugger;
  const task = setInterval(() => {
    element.style.visibility = element.style.visibility ? '' : 'hidden';
  }, duration);
  return () => clearInterval(task);
}

export default functionalModifier(blink);
