import axios, { AxiosRequestHeaders } from 'axios';
import { store } from '../redux/Store';
import { ApiConstants } from './ApiConstants';
import { APP_URL } from './Host';

export const axiosClient = axios.create({
	baseURL: APP_URL,
});

const blacklistUrls = [
	ApiConstants.SIGNIN,
];

const whiteListUrls = [
	ApiConstants.CREATEACCOUNT,
	ApiConstants.CREATEITEMS
]

axiosClient.interceptors.request.use(async (config) => {
	try {
		const token = store.getState().AuthSlice.tokenDetail;
		if (token && !blacklistUrls.includes(config.url || '')) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			} as AxiosRequestHeaders
		}
		if(whiteListUrls.includes(config.url || '') && config.method === "post" || config.method == "patch"){
			config.headers = {
				...config.headers,
				"Content-Type": 'application/json',
				Accept: 'application/json'
			} as AxiosRequestHeaders
		}else{
			config.headers = {
				...config.headers,
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
			} as AxiosRequestHeaders
		}
		if (config.method == "put") {
			config.headers = {
				...config.headers,
				"Content-Type": 'application/json',
				Accept: 'application/json',
			} as AxiosRequestHeaders
		}

	} catch (e) {
		console.error({ e });
	}
	console.log('AAA config', config)
	return config;
});
