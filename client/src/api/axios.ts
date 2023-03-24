import NotificationService from '../services/notificationService';
import CommonMessage from '../constants/commonMessage';
import { ValidateRefreshToken } from '../models/auth/validateRefreshToken';
import axios from 'axios';
import BrowserStorageService from '../services/shared/browserStorageService'
import Router from 'next/router';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { MethodResult } from 'src/models/shared/crud/methodResult';

const API_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL
});
 
axiosInstance.interceptors.request.use(
    (config: any) => {
      const accessToken: string = BrowserStorageService.getLocal('accessToken');
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Accept-Language'] = 'en-US'
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
  
  axiosInstance.interceptors.response.use(
    (response: any) => {
      const methodResult = (<MethodResult<any>>response?.data);
      if (methodResult?.type === CRUDResultEnum.SuccessWithNotification) {
        const message = methodResult.message;
        NotificationService.showSuccessMessage(message || CommonMessage.SuccessOperation)
      }
      return response;
    },
    async (error: any) => {
      const errorMessage: string = error?.response?.data?.message;
      if (error && error.response && error.response.status) {
        const status = error.response.status;
        switch (status) {
          case 400:
            {
              NotificationService.showErrorMessage(errorMessage || CommonMessage.ModelIsNotValid);
              break
            }
          case 401:
            {
              let originalRequest = error.config;
                if (error.config && !error.config.__isRetryRequest) {
                  originalRequest._retry = true;
                  const token = await getRefreshToken()
                  if (token) {
                    originalRequest.headers = {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*',
                      'Accept-Language': 'en-US'
                    };
                    return axiosInstance.request(originalRequest); 
                  }
                  else{
                    Router.push('/login'); 
                }
                  
              }
              else{
                Router.push('/login')
              }
          }
            break
          case 404:
            NotificationService.showErrorMessage(errorMessage || CommonMessage.AdressNotFound);
            break
          case 500:
            NotificationService.showErrorMessage(errorMessage || CommonMessage.ServerSideErrorHappended);
            break

          default:
            NotificationService.showErrorMessage(CommonMessage.UnknownErrorHappened);
            break
        }
      }
      else {
        NotificationService.showErrorMessage(CommonMessage.UnknownErrorHappened);
      }
      //return Promise.reject(error);
    }
  )

  async function getRefreshToken(): Promise<string | null> {
    const refreshToken = BrowserStorageService.getLocal('refreshToken');
    const jwtToken = BrowserStorageService.getLocal('accessToken');
    if (refreshToken && jwtToken) {
      const validateRefreshToken = new ValidateRefreshToken();
      validateRefreshToken.refreshToken = refreshToken;
      validateRefreshToken.token = jwtToken;
    const fetchRes = await fetch(`${API_URL}/auth/getRefreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validateRefreshToken),
    })
    const res: MethodResult<ValidateRefreshToken> = await fetchRes.json();
      if (res.type === CRUDResultEnum.Success && res.result) {
          BrowserStorageService.setLocal('accessToken', res.result.token);
          BrowserStorageService.setLocal('refreshToken', res.result.refreshToken);
          return res.result.token;  
        }
        else{
          BrowserStorageService.removeLocal('accessToken');
          BrowserStorageService.removeLocal('refreshToken');
          return null;
        } 
    }
    return null
  }

export default axiosInstance;
