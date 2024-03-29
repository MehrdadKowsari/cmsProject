import NotificationService from '../services/shared/notificationService';
import CommonMessage from '../constants/commonMessage';
import { ValidateRefreshToken } from '../models/auth/validateRefreshToken';
import axios from 'axios';
import BrowserStorageService from '../services/shared/browserStorageService'
import Router from 'next/router';
import { CRUDResultEnum } from '../models/shared/enums/crudResultEnum';
import { MethodResult } from 'src/models/shared/crud/methodResult';
import ErrorHandlerService from 'src/services/shared/errorHandler.service';
import { ReactNode } from 'react';

const API_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(
    (config: any) => {
      const accessToken: string = BrowserStorageService.getLocal('accessToken');
      const locale: string = BrowserStorageService.getLocal('locale') || 'en';
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Accept-Language'] = locale;
      config.headers['Cache-Control'] = 'no-cache'
      config.headers['Expires'] = '0'
      config.headers['Pragma'] = 'no-cache'
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
      const errorMessage: string | ReactNode | undefined = error?.response?.data?.errors?.length > 0 ? ErrorHandlerService.GetErrorElement(error.response.data.errors) : error?.response?.data?.message;
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
              const locale: string = BrowserStorageService.getLocal('locale') || 'en';
                if (error.config && !error.config._isRetry) {
                  originalRequest._isRetry = true;
                  const token = await getRefreshToken()
                  if (token) {
                    originalRequest.headers = {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*',
                      'Accept-Language': locale
                    };
                    return axiosInstance.request(originalRequest); 
                  }
              }
              Router.push('/login')
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
