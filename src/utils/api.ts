interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const getAccessToken = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'access_token') {
      return value || null;
    }
  }
  return null;
};

export const clearAuthData = () => {
  localStorage.removeItem('user');
  document.cookie =
    'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const authenticatedFetch = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const token = getAccessToken();

  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', token);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, the token is expired or invalid
  if (response.status === 401) {
    console.log('Token expired or invalid, clearing auth data');
    clearAuthData();

    // Dispatch a custom event to notify AuthContext
    window.dispatchEvent(new CustomEvent('auth:unauthorized'));

    // Redirect to login
    window.location.href = '/login';

    throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
  }

  return response;
};
