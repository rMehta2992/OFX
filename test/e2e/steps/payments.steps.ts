import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import axios, { AxiosResponse } from 'axios';
import * as assert from 'assert';

setDefaultTimeout(20 * 1000);

let baseUrl: string;
let lastResponse: AxiosResponse;
let createdId: string;

Given('the API is running at {string}', (url: string) => {
  baseUrl = url;
});

When('I create a payment with amount {int} and currency {string}', async (amount, currency) => {
  lastResponse = await axios.post(`${baseUrl}/payments`, { amount, currency });
  createdId = lastResponse.data.result;
});

Then('the response status should be {int}', (status: number) => {
  assert.strictEqual(lastResponse.status, status);
});

Then('the JSON response should contain a field {string}', (field: string) => {
  assert.ok(field in lastResponse.data);
});

When('I retrieve the payment by ID', async () => {
  lastResponse = await axios.get(`${baseUrl}/payments/${createdId}`);
});

Then('the JSON response should contain {string}, {string}, and {string}', (f1, f2, f3) => {
  const data = lastResponse.data;
  [f1, f2, f3].forEach((f) => assert.ok(f in data));
});

When('I list payments filtered by currency {string}', async (currency: string) => {
  lastResponse = await axios.get(`${baseUrl}/payments`, { params: { currency } });
});

Then('the JSON response should include my payment in the data array', () => {
  const arr = lastResponse.data.data;
  assert.ok(arr.some((p: any) => p.id === createdId));
});
