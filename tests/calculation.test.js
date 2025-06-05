const assert = require('assert');
const fs = require('fs');

function parseCSV(path) {
  const lines = fs.readFileSync(path, 'utf8').trim().split('\n');
  return lines.slice(1).map(line => {
    const [species, n] = line.split(';');
    return { species, n: Number(n) };
  });
}

function totalIndividuals(data) {
  return data.reduce((sum, sp) => sum + sp.n, 0);
}

function shannonIndex(data) {
  const total = totalIndividuals(data);
  const prop = data.map(sp => sp.n / total);
  return -prop.reduce((sum, p) => sum + p * Math.log(p), 0);
}

function simpsonD(data) {
  const total = totalIndividuals(data);
  const prop = data.map(sp => sp.n / total);
  return prop.reduce((sum, p) => sum + p * p, 0);
}

const dataset = parseCSV('comunidade.csv');

const expectedTotal = 514;
const expectedShannon = 3.33; // rounded to two decimals
const expectedSimpson = 0.06; // Simpson's D rounded to two decimals

const total = totalIndividuals(dataset);
assert.strictEqual(total, expectedTotal, 'Total individuals mismatch');

const shannon = parseFloat(shannonIndex(dataset).toFixed(2));
assert.strictEqual(shannon, expectedShannon, 'Shannon index mismatch');

const simpson = parseFloat(simpsonD(dataset).toFixed(2));
assert.strictEqual(simpson, expectedSimpson, 'Simpson index mismatch');

console.log('All tests passed.');
