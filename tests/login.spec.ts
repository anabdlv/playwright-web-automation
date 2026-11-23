import { test, expect } from '@playwright/test';
import { users } from '../test-data/users';

test('Login - valid user lands on products page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Login - locked out user sees error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(users.lockedOut.username);
  await page.locator('[data-test="password"]').fill(users.lockedOut.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('Login - wrong credentials sees error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('invalid_user');
  await page.locator('[data-test="password"]').fill('invalid_password');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login - empty username sees error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
});

test('Login - empty password sees error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
});