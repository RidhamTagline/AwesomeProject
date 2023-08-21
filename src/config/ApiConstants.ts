import { APP_URL } from "./Host";

export const ApiConstants = {
	SIGNIN: APP_URL + '/user/login',
	USERDETAILS:APP_URL + '/user/me',
	ACCOUNTLIST:APP_URL + '/app/customer',
	CREATEACCOUNT:APP_URL + '/app/customer',
	GROUPLIST:APP_URL + '/app/group',
	ITEMGROUPLIST:APP_URL + '/app/itemgroup',
	CREATEITEMS:APP_URL + '/app/inventory',
	GETALLITEMSLIST:APP_URL + '/app/inventory',
	DELETEITEMS:APP_URL + '/app/inventory',
};
