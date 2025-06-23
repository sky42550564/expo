import { post } from '../net/post.js';

export default function (url) {
    return (...params) => post(url, ...params);
};
