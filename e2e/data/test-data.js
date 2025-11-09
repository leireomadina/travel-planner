export const ROUTES = {
  register: '/register',
  login: '/login',
  home: '/home',
}

export const API_ENDPOINTS = {
  register: '**/auth/v1/signup',
  login: '**/auth/v1/token?grant_type=password',
}

export const TEST_USER = {
  id: 'mock-id',
  email: 'test@test.com',
  password: 'password123',
}
