//File quản lý tất cả hằng số của hệ thống
import moment from 'moment';
import 'moment/locale/vi'

export const domain = 'http://movie0706.cybersoft.edu.vn/api';
export const groupID = 'GP01';
export const userLogin = 'userLogin';
export const accessToken = 'token';
export const currentDate = moment(Date()).format('L');

let splitCurrentDate = currentDate.split("/", 3)
export const nextDate = `${Number(splitCurrentDate[0]) + 1}/${splitCurrentDate[1]}/${splitCurrentDate[2]}`