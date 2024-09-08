// A simplest reactive example

const bucket = new Set();

const data = { id: 10, name: 'Jonh'};

const effect = () => {
  console.log(`Side effect: data.name = `, dataRef.name);
};

const dataRef = new Proxy(data, {
  get(target, key) {
    bucket.add(effect);
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => {
      fn();
    });
  },
});

effect();

dataRef.name = 'Mike';
dataRef.name = 'Lyn';

console.log('Finally, data = ', data);
