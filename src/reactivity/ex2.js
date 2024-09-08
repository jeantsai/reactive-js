// A simplest reactive example

const bucket = new WeakMap();
let activeEffect;

const data = { id: 10, name: 'Jonh'};

const effect = (fn) => {
  activeEffect = fn;
  fn();
};

const dataRef = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});

function track(target, key) {
  let depsMap = bucket.get(target);
  if (!depsMap) {
    depsMap = new Map();
    bucket.set(target, depsMap);
  }
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  const deps = depsMap.get(key);
  deps && deps.forEach(fn => fn());
}

effect(() => {
  console.log(`Side effect: data.name = `, dataRef.name);
});

dataRef.name = 'Mike';
dataRef.name = 'Lyn';

console.log('Finally, data = ', data);
