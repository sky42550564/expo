import dayjs from 'dayjs'; // 直接使用路径，不然小程序编译不过发，所以小程序处理该文件
import isBetween from 'dayjs/plugin/isBetween.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isToday from 'dayjs/plugin/isToday.js';
import isTomorrow from 'dayjs/plugin/isTomorrow.js';
import isYesterday from 'dayjs/plugin/isYesterday.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';

dayjs.locale('zh-cn', {
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  meridiem: function (hour, minute) {
    const hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
});
dayjs.extend(isBetween); // 和开始结束时间都不相等，在他们中间
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(isLeapYear);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);

const myPlugin = (option, dayjsClass, dayjsFactory) => {
  // extend dayjs()
  // e.g. add dayjs().isSameOrBefore()
  dayjsClass.prototype.ds = function () {
    return this.format('YYYY-MM-DD');
  }
  dayjsClass.prototype.ts = function () {
    return this.format('YYYY-MM-DD HH:mm:ss');
  }
  dayjsClass.prototype.isSameDay = function (d) {
    return this.format('YYYY-MM-DD') === dayjs(d).format('YYYY-MM-DD');
  }
}
dayjs.extend(myPlugin) // use plugin

export default dayjs;
