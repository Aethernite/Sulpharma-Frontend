import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    withCredentials: false
});

instance.interceptors.request.use(
    async config => {
      const token = localStorage.getItem('token');

      if(token) {
        config.headers = { 
            'Authorization': `Bearer ${token}`,
        }
      }
      
      return config;
    },
    error => {
      Promise.reject(error)
  });

instance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      await instance.post('/auth/refresh-token', { refreshToken })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return instance(originalRequest);
      }).catch(err => {
        if(err.response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
      });
     
    }
    return Promise.reject(error);
  });

export const register = async ({ email, password }) => {
    const res = await instance.post('/auth/register', { username: email, password, confirmPassword: password });
    return res.data;
};

export const logout = async () => {
    const res = await instance.post('/auth/logout');
    localStorage.clear();
    return res.data;
};

export const login = async ({ email, password }) => {
    const res = await instance.post('/auth/login', { username: email, password });
    return res.data;
};


//User related
export const getMe = async () => {
    const res = await instance.get('/auth/me');
    return res.data;
}

export const getProducts = async ({ cursor, category, subcategory, query, sort, order }) => {
    const res = await instance.get(`/products`, { params: { page: cursor, category, subcategory, query, sort, order } });
    return res.data;
}

export const getPromotions = async ({ cursor }) => {
    const res = await instance.get(`/promotions`, { params: { page: cursor } })
    return res.data;
}

export const getLocations = async () => {
  const res = await instance.get(`/locations`)
  return res.data;
}

export const getUser = async (identifier) => {
    const res = await instance.get(`/users/${identifier}`);
    return res.data;
};

export const refreshToken = async ({refreshToken}) => {
    const res = await instance.post('/auth/refresh-token', { refreshToken });
    return res.data;
}