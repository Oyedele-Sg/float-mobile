import axios from 'axios';
import { MMKV } from './mmkv';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import { fetchPublicIP } from './fetchIPAddress';
import {  encryptData, generateNonce } from './headerEncryption';
import { displayErrorMessage } from './toast';

export type DeviceInfoData = {
    device_id: string | undefined;
    ip_address: string | undefined | null;
};

const BASE_API = 'https://float-transfer-fa9e38b6b8a2.herokuapp.com/';

const deviceId = DeviceInfo.getUniqueIdSync();

let deviceIP: string | null = null;

// @ts-ignore
let deviceInfo: DeviceInfoData | null = MMKV.getMap('deviceInfo');

const nonceStr = generateNonce();
const signature = encryptData(nonceStr)

const initializeDeviceInfo = async () => {
    deviceIP = await fetchPublicIP();

    if (deviceInfo === null) {
        deviceInfo = {
            device_id: deviceId,
            ip_address: deviceIP,
        };
        MMKV.setMap('deviceInfo', deviceInfo);
    } else if (
        deviceInfo.device_id !== deviceId || deviceInfo.ip_address !== deviceIP
    ) {
        deviceInfo = {
            ...deviceInfo,
            device_id: deviceId,
            ip_address: deviceIP,
        };
        MMKV.setMap('deviceInfo', deviceInfo);
    }
};

void initializeDeviceInfo();

const handleResponse = (requestConfig: any) => requestConfig;

const handleError = async (error: any) => {
    console.log(JSON.stringify(error, null, 2));

    if (!error.response) {
        // Network error or timeout
    } else {
        const { data: result } = error.response;
        // eslint-disable-next-line no-param-reassign
        error.response.data = { data: result };
        displayErrorMessage(`${error.response.data.data.message}`);
    }

    return Promise.reject(error.response?.data?.data || { message: error.message });
};

export const PublicAxios = axios.create({
    baseURL: BASE_API,
});

export const AuthAxios = axios.create({
    baseURL: BASE_API,
});

export const checkNetworkConnection = async () => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
        const error = new Error('Network not connected');
        error.name = 'NetworkError';
        throw error;
    }
};

const addNetworkCheckInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.request.use(
        async (requestConfig: any) => {
            try {
                await checkNetworkConnection();
                const cancelTokenSource = axios.CancelToken.source();

                // eslint-disable-next-line no-param-reassign
                requestConfig.cancelToken = cancelTokenSource.token;

                // eslint-disable-next-line no-param-reassign
                requestConfig.headers['device-id'] = deviceId;
                // eslint-disable-next-line no-param-reassign
                requestConfig.headers['ip-address'] = deviceIP;
                // eslint-disable-next-line no-param-reassign
                requestConfig.headers['nonce-str'] = nonceStr;
                // eslint-disable-next-line no-param-reassign
                requestConfig.headers['signature'] = signature;

                console.log(JSON.stringify(requestConfig, null, 2));
                return requestConfig;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        (error: any) => Promise.reject(error),
    );
};

addNetworkCheckInterceptor(PublicAxios);
addNetworkCheckInterceptor(AuthAxios);

AuthAxios.interceptors.request.use(
    async (requestConfig: any) => {
        try {
            // @ts-ignore
            const loginData: { access_token: string } | null =
                MMKV.getMap('TokenData');
            let token = null;

            if (loginData) {
                token = loginData.access_token;
            }

            // eslint-disable-next-line no-param-reassign
            requestConfig.headers.Authorization = `Bearer ${token}`;
            // eslint-disable-next-line no-param-reassign
            requestConfig.headers['device-id'] = deviceId;
            // eslint-disable-next-line no-param-reassign
            requestConfig.headers['ip-address'] = deviceIP;
            // eslint-disable-next-line no-param-reassign
            requestConfig.headers['nonce-str'] = nonceStr;
            // eslint-disable-next-line no-param-reassign
            requestConfig.headers['signature'] = signature;

            return requestConfig;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error) => Promise.reject(error),
);

PublicAxios.interceptors.response.use(handleResponse, handleError);
AuthAxios.interceptors.response.use(handleResponse, handleError);
