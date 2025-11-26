import {
  authSliceReducer,
  logout,
  restoreSession,
  clearError,
} from '../authSlice';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('authSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  const mockUser = {
    email: 'test@example.com',
    username: 'testuser',
    _id: '123',
  };

  it('должен возвращать начальное состояние', () => {
    const state = authSliceReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      user: null,
      access: null,
      refresh: null,
      loading: false,
      error: null,
      isAuth: false,
    });
  });

  it('должен обрабатывать выход из системы', () => {
    const initialState = {
      user: mockUser,
      access: 'token',
      refresh: 'refresh-token',
      loading: false,
      error: null,
      isAuth: true,
    };

    const state = authSliceReducer(initialState, logout());

    expect(state.user).toBeNull();
    expect(state.access).toBeNull();
    expect(state.refresh).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('refresh_token');
  });

  it('должен восстанавливать сессию с валидными данными', () => {
    const mockAuthData = {
      user: mockUser,
      tokens: {
        access: 'access-token',
        refresh: 'refresh-token',
      },
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAuthData));

    const state = authSliceReducer(undefined, restoreSession());

    expect(state.user).toEqual(mockUser);
    expect(state.access).toBe('access-token');
    expect(state.refresh).toBe('refresh-token');
    expect(state.isAuth).toBe(true);
  });

  it('должен обрабатывать восстановление сессии с невалидными данными', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');

    const state = authSliceReducer(undefined, restoreSession());

    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('должен обрабатывать восстановление сессии без данных', () => {
    localStorageMock.getItem.mockReturnValue(null);

    const state = authSliceReducer(undefined, restoreSession());

    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('должен очищать ошибку', () => {
    const initialState = {
      user: null,
      access: null,
      refresh: null,
      loading: false,
      error: 'Какая-то ошибка',
      isAuth: false,
    };

    const state = authSliceReducer(initialState, clearError());

    expect(state.error).toBeNull();
  });
});
