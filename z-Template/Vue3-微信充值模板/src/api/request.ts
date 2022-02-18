/* eslint-disable no-case-declarations */
import axios, { AxiosRequestConfig } from "axios";
import { Toast } from "vant";
import { Notify } from "vant";
import router from "../router/index";
import store from "../store/index";
import base from "./base";

export function request(config: AxiosRequestConfig) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL: base.production,
        timeout: 30000
    });

    axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";

    Toast.allowMultiple(true);
    const toastloading = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        overlay: true,
        duration: 0,
        loadingType: "spinner"
    });

    //2.axios的拦截
    //2.1请求拦截
    instance.interceptors.request.use(
        config => {
            if (localStorage.getItem("tenantId")) {
                config.headers["Abp.TenantId"] = localStorage.getItem("tenantId");
            }
            if (localStorage.getItem("token")) {
                config.headers["Authorization"] =
                    "Bearer " + localStorage.getItem("token");
            }
            return config;
        },
        err => {
            console.log(err);
        }
    );

    //2.2响应拦截
    instance.interceptors.response.use(
        res => {
            toastloading.clear();
            return res.data;
        },
        err => {
            toastloading.clear();
            // if (err) {
            if (err.response.status) {
                switch (err.response.status) {
                    // 401: 未登录 token过期
                    // 未登录则跳转登录页面，并携带当前页面的路径
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                    case 401:
                        router.replace({
                            path: "/login",
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                        break;
                    // 403 没有权限
                    case 403:
                        Toast.fail("没有权限");
                        store.commit("changeApplyPermission", true);
                        break;
                    // 404 请求不存在
                    case 404:
                        Toast({
                            message: "网络请求不存在",
                            duration: 1500,
                            forbidClick: true
                        });
                        break;
                    // 500
                    case 500:
                        let message = err.response.data.error.message;
                        if (message) {
                            const reg = /^\[/gi;
                            const reg2 = /\]$/gi;
                            message = message.replace(reg, "");
                            message = message.replace(reg2, "");
                            Notify(message);
                        }
                        break;
                    // 其他错误，直接抛出错误提示
                    default:
                    // Toast({
                    //     message: err.response.data.message,
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
                }
            }
        }
    );

    //3.发送网络请求
    return instance(config);
}
