import { test, expect } from '@playwright/test';
import { users } from '../test-data/users';

test('Login - valid user lands on products page', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill(users.standard.username);
  await page.getByTestId('password').fill(users.standard.password);
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('title')).toHaveText('Products');
  await expect(page).toHaveURL('/inventory.html');
});

test('Login - locked out user sees error message', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill(users.lockedOut.username);
  await page.getByTestId('password').fill(users.lockedOut.password);
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  await expect(page).toHaveURL('/');
});

test('Login - wrong credentials sees error message', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('invalid_user');
  await page.getByTestId('password').fill('invalid_password');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page).toHaveURL('/');
});

test('Login - empty username sees error message', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('password').fill(users.standard.password);
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username is required');
  await expect(page).toHaveURL('/');
});

test('Login - empty password sees error message', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill(users.standard.username);
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('error')).toHaveText('Epic sadface: Password is required');
  await expect(page).toHaveURL('/');
});