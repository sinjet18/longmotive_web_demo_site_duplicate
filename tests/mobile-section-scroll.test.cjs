const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'mobile-section-scroll.js'), 'utf8');

function boot(sectionHeights) {
  const listeners = new Map();
  const timers = [];
  const scrollCalls = [];
  const root = { style: { scrollSnapType: '' } };
  let scrollY = 0;
  let top = 0;
  const nodes = sectionHeights.map((height) => {
    const absoluteTop = top;
    top += height;
    return {
      matches: () => false,
      getBoundingClientRect: () => ({ top: absoluteTop - scrollY, height })
    };
  });
  const window = {
    innerHeight: 800,
    visualViewport: { height: 800 },
    matchMedia: () => ({ matches: true }),
    getComputedStyle: () => ({ display: 'block' }),
    addEventListener(type, fn) { listeners.set(type, fn); },
    removeEventListener() {},
    setTimeout(fn) { timers.push(fn); return timers.length; },
    scrollTo(arg, y) {
      const options = typeof arg === 'object' ? arg : { top: y, behavior: 'auto' };
      scrollY = options.top;
      scrollCalls.push(options);
    }
  };
  Object.defineProperty(window, 'scrollY', { get: () => scrollY });
  const document = {
    documentElement: root,
    querySelector: () => ({ getBoundingClientRect: () => ({ height: 74 }) }),
    querySelectorAll: () => nodes
  };
  vm.runInNewContext(source, {
    window,
    document,
    clearTimeout() {},
    console
  });
  return { listeners, timers, scrollCalls, root };
}

function touchEvent(y) {
  let prevented = 0;
  return {
    touches: [{ clientX: 100, clientY: y }],
    cancelable: true,
    target: { closest: () => null },
    preventDefault() { prevented += 1; },
    prevented: () => prevented
  };
}

{
  const app = boot([726, 726, 726]);
  app.listeners.get('touchstart')(touchEvent(500));
  const firstMove = touchEvent(430);
  app.listeners.get('touchmove')(firstMove);
  const momentumMove = touchEvent(340);
  app.listeners.get('touchmove')(momentumMove);

  assert.equal(firstMove.prevented(), 1, 'the triggering move must stop native momentum');
  assert.equal(momentumMove.prevented(), 1, 'later moves in the same swipe must stay blocked');
  assert.equal(app.scrollCalls.length, 1, 'one swipe must select only one section');
  assert.equal(app.scrollCalls[0].behavior, 'smooth');
  assert.equal(app.root.style.scrollSnapType, 'none', 'CSS snapping stays off during the animation');

  app.listeners.get('touchstart')(touchEvent(500));
  const secondSwipeDuringAnimation = touchEvent(490);
  app.listeners.get('touchmove')(secondSwipeDuringAnimation);
  assert.equal(secondSwipeDuringAnimation.prevented(), 1, 'a new touch cannot interrupt an active section move');
  assert.equal(app.scrollCalls.length, 1, 'a second swipe cannot queue another section while moving');

  app.timers[0]();
  assert.equal(app.root.style.scrollSnapType, '', 'CSS snapping is restored after settling');
}

{
  const app = boot([1200, 726]);
  app.listeners.get('touchstart')(touchEvent(500));
  const moveInsideLongSection = touchEvent(420);
  app.listeners.get('touchmove')(moveInsideLongSection);

  assert.equal(moveInsideLongSection.prevented(), 0, 'long content keeps native reading scroll');
  assert.equal(app.scrollCalls.length, 0, 'a long section is not skipped before its bottom edge');
}

console.log('PASS: mobile swipe momentum cannot skip sections; tall content remains scrollable');
