import _ from 'lodash'
const removeOne = (list, iteratee) => { const index = _.findIndex(list, iteratee); if (index === -1) { return [] } const r = list[index]; list.splice(index, 1); return [r] }
const formatUnit = s => /^-?\d+(\.\d+)?$/.test(s) ? `${s * 2}rpx` : s; // 默认单位为rpx
const colorDefineList = ['cmain', 'csub', 'ctext', 'chigh', 'primary', 'success', 'info', 'warning', 'error', 'danger', 'link', 'red', 'blue', 'green', 'orange', 'yellow', 'purple', 'black', 'white', 'gold', 'gray', 'magenta', 'cyan', 'pink', 'transparent']; // 颜色列表，可以跟一个透明度，如white80 = #FFFFFF80
const isHexColor = s => /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/.test(s) || /^#[a-fA-F0-9]{3}/.test(s); // 判断是否是16进制的颜色
const isColor = s => isHexColor(s) || !!(_.find(colorDefineList, o => _.startsWith(s, o))); // 判断是否是16进制的颜色
const colorMap = { red: '#ff0000', blue: '#0000ff', green: '#008000', orange: '#ffa500', yellow: '#ffff00', purple: '#800080', black: '#000000', white: '#ffffff', gold: '#ffd700', gray: '#808080', magenta: '#ff00ff', cyan: '#00ffff', pink: '##ffc0cb' };
const formatColor = (sr, s) => { // 格式化颜色 // 如果是16进制的颜色，需要添加#
  if (!s) return s;
  if (s === 'transparent') return 'transparent';
  if (isHexColor(s) && !s.startsWith('#')) return `#${s}`;
  if (_.startsWith(s, 'cmain')) return s.replace('cmain', sr.cmain);
  if (_.startsWith(s, 'csub')) return s.replace('csub', sr.csub);
  if (_.startsWith(s, 'ctext')) return s.replace('ctext', sr.ctext);
  if (_.startsWith(s, 'chigh')) return s.replace('chigh', sr.chigh);
  if (_.startsWith(s, 'primary')) return s.replace('primary', sr.primary);
  if (_.startsWith(s, 'success')) return s.replace('success', sr.success);
  if (_.startsWith(s, 'info')) return s.replace('info', sr.info);
  if (_.startsWith(s, 'warning')) return s.replace('warning', sr.warning);
  if (_.startsWith(s, 'error')) return s.replace('error', sr.error);
  if (_.startsWith(s, 'link')) return s.replace('link', sr.link);
  const key = _.findKey(colorMap, (o, k) => _.startsWith(s, k));
  if (key) return s.replace(key, colorMap[key]);
  return s;
};
const getDefaultBackColor = (sr, list) => { // 获取默认的背景色
  if (!list.length && sr.cmain) { // 如果没有指定颜色，则使用主题颜色，如果有主题次色，则显示渐变
    list = sr.cmain === sr.csub || !sr.csub ? [sr.cmain] : [sr.cmain, sr.cmain + '80'];
  }
  return list;
}

const _r = (s, sss) => new RegExp(`^(${sss['!']})?_${s}(_${sss['.'] === '.' ? '[^$]' : '[^.%!#$]'}*)?$`) // 生成匹配的正则表达式，其中在开头添加!表示important，如 !_w_100 => { width: 200rpx !important; }

const getRules = ({ $, sr, sss }) => {
  let rules = {
    // 只有设置为border-box后才能正常使用padding, 默认所有的view已经在App.vue中设置了，这个主要是设置其他如scroll-view等组件
    border_box: () => ({ 'box-sizing': 'border-box' }),
    // overflow: _of_y_auto _of_hidden_x _of_scroll
    of: ([s]) => {
      const list = s.split('_');
      const dir = removeOne(list, o => o === 'x' || o === 'y')[0] || '';
      const type = removeOne(list, o => o === 'auto' || o === 'hidden' || o === 'scroll')[0] || 'auto';
      return { [`overflow${dir ? `-${dir}` : ''}`]: type };
    },

    // 浮动 _float_right
    float: ([s]) => ({ 'float': s }),
    // 显示 _display_inline-block _display_table
    display: ([s]) => ({ 'display': s }),
    // 位置: _po | _po_b100_r100
    po: ([s]) => {
      const obj = {};
      if (s) {
        const list = s.split('_');
        const bc = removeOne(list, o => isColor(o))[0];
        const t = removeOne(list, o => /^t-?[.\d]+(px)?$/.test(o))[0]; // top
        const b = removeOne(list, o => /^b-?[.\d]+(px)?$/.test(o))[0]; // bottom
        const l = removeOne(list, o => /^l-?[.\d]+(px)?$/.test(o))[0]; // left
        const r = removeOne(list, o => /^r-?[.\d]+(px)?$/.test(o))[0]; // right
        const h = removeOne(list, o => /^h-?[.\w]+/.test(o))[0]; // 横向
        const v = removeOne(list, o => /^v-?[.\w]+/.test(o))[0]; // 纵向
        t && (obj.top = formatUnit(t?.slice(1)));
        b && (obj.bottom = formatUnit(b?.slice(1)));
        l && (obj.left = formatUnit(l?.slice(1)));
        r && (obj.right = formatUnit(r?.slice(1)));
        if (h) {
          obj.left = formatUnit(h?.slice(1));
          obj.right = formatUnit(h?.slice(1));
        }
        if (v) {
          obj.top = formatUnit(v?.slice(1));
          obj.bottom = formatUnit(v?.slice(1));
        }
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 绝对布局 _poa | _poa_b100_r100
    poa: ([s]) => {
      const obj = { 'position': 'absolute !important' };
      if (s) {
        const list = s.split('_');
        const bc = removeOne(list, o => isColor(o))[0];
        const t = removeOne(list, o => /^t-?[.\dp]+(px)?$/.test(o))[0]; // top
        const b = removeOne(list, o => /^b-?[.\dp]+(px)?$/.test(o))[0]; // bottom
        const l = removeOne(list, o => /^l-?[.\dp]+(px)?$/.test(o))[0]; // left
        const r = removeOne(list, o => /^r-?[.\dp]+(px)?$/.test(o))[0]; // right
        const h = removeOne(list, o => /^h-?[.\w]+/.test(o))[0]; // 横向
        const v = removeOne(list, o => /^v-?[.\w]+/.test(o))[0]; // 纵向
        t && (obj.top = formatUnit(t?.slice(1)));
        b && (obj.bottom = formatUnit(b?.slice(1)));
        l && (obj.left = formatUnit(l?.slice(1)));
        r && (obj.right = formatUnit(r?.slice(1)));
        if (h) {
          obj.left = formatUnit(h?.slice(1));
          obj.right = formatUnit(h?.slice(1));
        }
        if (v) {
          obj.top = formatUnit(v?.slice(1));
          obj.bottom = formatUnit(v?.slice(1));
        }
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 绝对布局 _pof | _pof_b100_r100
    pof: ([s]) => {
      const obj = { 'position': 'fixed !important' };
      if (s) {
        const list = s.split('_').filter(o => o);
        const bc = removeOne(list, o => isColor(o))[0];
        const t = removeOne(list, o => /^t-?[.\d]+(px)?$/.test(o))[0]; // top
        const b = removeOne(list, o => /^b-?[.\d]+(px)?$/.test(o))[0]; // bottom
        const l = removeOne(list, o => /^l-?[.\d]+(px)?$/.test(o))[0]; // left
        const r = removeOne(list, o => /^r-?[.\d]+(px)?$/.test(o))[0]; // right
        const h = removeOne(list, o => /^h-?[.\w]+/.test(o))[0]; // 横向
        const v = removeOne(list, o => /^v-?[.\w]+/.test(o))[0]; // 纵向
        t && (obj.top = formatUnit(t?.slice(1)));
        b && (obj.bottom = formatUnit(b?.slice(1)));
        l && (obj.left = formatUnit(l?.slice(1)));
        r && (obj.right = formatUnit(r?.slice(1)));
        if (h) {
          obj.left = formatUnit(h?.slice(1));
          obj.right = formatUnit(h?.slice(1));
        }
        if (v) {
          obj.top = formatUnit(v?.slice(1));
          obj.bottom = formatUnit(v?.slice(1));
        }
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 相对布局
    por: () => ({ 'position': 'relative !important' }),
    // 绝对铺面
    full: ([s]) => {
      const obj = { 'position': 'absolute', 'top': 0, 'right': 0, 'bottom': 0, 'left': 0 };
      if (s) {
        const list = s.split('_').filter(o => o);
        const bc = removeOne(list, o => isColor(o))[0];
        const t = removeOne(list, o => /^t-?[.\d]+(px)?$/.test(o))[0]; // top
        const b = removeOne(list, o => /^b-?[.\d]+(px)?$/.test(o))[0]; // bottom
        const l = removeOne(list, o => /^l-?[.\d]+(px)?$/.test(o))[0]; // left
        const r = removeOne(list, o => /^r-?[.\d]+(px)?$/.test(o))[0]; // right
        const h = removeOne(list, o => /^h-?[.\w]+/.test(o))[0]; // 横向
        const v = removeOne(list, o => /^v-?[.\w]+/.test(o))[0]; // 纵向
        t && (obj['top'] = formatUnit(t?.slice(1)));
        b && (obj['bottom'] = formatUnit(b?.slice(1)));
        l && (obj['left'] = formatUnit(l?.slice(1)));
        r && (obj['right'] = formatUnit(r?.slice(1)));
        if (h) {
          obj.left = formatUnit(h?.slice(1));
          obj.right = formatUnit(h?.slice(1));
        }
        if (v) {
          obj.top = formatUnit(v?.slice(1));
          obj.bottom = formatUnit(v?.slice(1));
        }
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 绝对铺面滚动
    scroll: () => ({ 'position': 'absolute', 'top': 0, 'bottom': 0, 'left': 0, 'right': 0, 'overflow': 'auto' }),
    // 绝对铺面x滚动 
    scroll_x: () => ({ 'position': 'absolute', 'top': 0, 'bottom': 0, 'left': 0, 'right': 0, 'overflow-x': 'auto' }),
    // 绝对铺面y滚动  
    scroll_y: () => ({ 'position': 'absolute', 'top': 0, 'bottom': 0, 'left': 0, 'right': 0, 'overflow-y': 'auto' }),
    as_end: () => ({ 'align-self': 'self-end' }), // 自身的布局
    // _fx_1 _fx_1, flex: 1, 如果有数字项
    // flex: 横向 ja|jb|jc|js|je|j0 as|ac|ae|a0，j0为没有justify-content，a0为没有align-items
    // justify-content：a:space-around,b:space-between,c:center,s:flex-start,e:flex-end
    // align-items：s:flex-start,c:center,e:flex-end
    // _fx_ja _fx_ha_as _fx_c_ha_as_1
    // _fx_g100px | fx_g100 设置gap
    fx: ([s]) => {
      let obj = {};
      if (s) {
        const list = s.split('_').filter(o => o);
        const bc = removeOne(list, o => isColor(o))[0];
        const d = removeOne(list, o => /^\d+$/.test(o))[0]; // flex
        const j = removeOne(list, o => /^(ja|jb|jc|js|je|j0)$/.test(o))[0]; // justify-content
        const a = removeOne(list, o => /^(as|ac|ae|a0)$/.test(o))[0]; // align-items
        const wrap = removeOne(list, o => /^(w|wrap)$/.test(o))[0]; // 断行
        const mowrap = removeOne(list, o => /^(nw|mowrap)$/.test(o))[0]; // 断行
        const dir = removeOne(list, o => /^(ccc|cc|c|rb|ra|rc|r|r0)$/.test(o))[0]; // 方向
        const gap = removeOne(list, o => /^g\d+(px)?$/.test(o))[0]; // 空格
        if (dir === 'r') { // 默认垂直居中
          obj = { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center' };
        } else if (dir === 'rc') { // flex-row-center
          obj = { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'justify-content': 'center' };
        } else if (dir === 'ra') { // flex-row-space-around
          obj = { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'justify-content': 'space-around' };
        } else if (dir === 'rb') { // flex-row-space-between
          obj = { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'justify-content': 'space-between' };
        } else if (dir === 'r0') { // 只是 flex-row
          obj = { 'display': 'flex', 'flex-direction': 'row' };
        } else if (dir === 'c') { // flex-column，默认水平居中
          obj = { 'display': 'flex', 'flex-direction': 'column' };
        } else if (dir === 'cc') { // flex-column 水平居中
          obj = { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center' };
        } else if (dir === 'ccc') { // flex-column 水平居中，垂直居中
          obj = { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center' };
        }
        d && (obj['flex'] = d);
        j && (obj['justify-content'] = { ja: 'space-around', jb: 'space-between', jc: 'center', js: 'flex-start', je: 'flex-end' }[j]);
        a && (obj['align-items'] = { as: 'flex-start', ac: 'center', ae: 'flex-end' }[a]);
        wrap && (obj['flex-wrap'] = 'wrap');
        mowrap && (obj['flex-wrap'] = 'nowrap');
        gap && (obj['gap'] = formatUnit(gap?.slice(1)));
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 宽100%(width-full)
    // _wf _wf_100 _wf_100px _wf_100_red _wf_f1
    wf: ([s]) => {
      const obj = { 'width': '100%' };
      let height, bc, flex;
      if (s) {
        const list = s.split('_').filter(o => o);
        bc = removeOne(list, o => isColor(o))[0];
        height = removeOne(list, o => /^[.\d]+(px)?$/.test(o) && !isColor(o))[0];
        flex = removeOne(list, o => /^f\d+$/.test(o))[0];
      }
      if (height) {
        obj['height'] = formatUnit(height);
      }
      if (flex) {
        obj['flex'] = +flex?.slice(1);
      }
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 高100%(height-full)
    // _hf _hf_100 _hf_100px _hf_100_red
    // hf: ()=>( { 'flex': 1, 'height': '100%' },
    // hf: ([s]) => ({ 'width': formatUnit(s), 'height': '100%', 'position': 'relative' })],
    hf: ([s]) => {
      const obj = { 'height': '100%' };
      let width, bc, flex;
      if (s) {
        const list = s.split('_').filter(o => o);
        bc = removeOne(list, o => isColor(o))[0];
        width = removeOne(list, o => /^[.\d]+(px)?$/.test(o) && !isColor(o))[0];
        flex = removeOne(list, o => /^f\d+$/.test(o))[0];
      }
      if (width) {
        obj['width'] = formatUnit(width);
      }
      if (flex) {
        obj['flex'] = +flex?.slice(1);
      }
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 宽度 _w_20 _w_100% _w_20vw
    w: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'width': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    wmin: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = list[0] === 'content' ? { 'min-width': 'max-content' } : { 'min-width': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    wmax: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = list[0] === 'content' ? { 'max-width': 'max-content' } : { 'max-width': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    wm: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = list[0] === 'content' ? { 'width': 'max-content', 'min-width': 'max-content', 'max-width': 'max-content' } : { 'width': formatUnit(list[0]), 'min-width': formatUnit(list[0]), 'max-width': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 高度 _h_20 _h_100% _h_20vw
    h: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'height': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    hmin: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = list[0] === 'content' ? { 'min-height': 'max-content' } : { 'min-height': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    hmax: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = list[0] === 'content' ? { 'max-height': 'max-content' } : { 'max-height': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    hm: ([s]) => {
      if (!s) return {};
      let bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      const obj = list[0] === 'content' ? { 'height': 'max-content', 'min-height': 'max-content', 'max-height': 'max-content' } : { 'height': formatUnit(list[0]), 'min-height': formatUnit(list[0]), 'max-height': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 方形: _s_32_red | _s_32_16_red
    // 圆形: _r_32_red
    // 固定大小: _sm_32_red | _rmin_32 |_rmax_32
    '([sr])(m|min|max)?': ([t, st, s]) => {
      if (!s) return {};
      let width, height, bc;
      const list = s.split('_').filter(o => o);
      bc = removeOne(list, o => isColor(o))[0];
      width = removeOne(list, o => /^[.\d]+(px|p)?$/.test(o) && !isColor(o))[0];
      height = removeOne(list, o => /^[.\d]+(px|p)?$/.test(o) && !isColor(o))[0] || width;
      const obj = {};

      (!st || st === 'm') && width && (obj['width'] = formatUnit(width));
      (!st || st === 'm') && height && (obj['height'] = formatUnit(height));
      (st === 'min' || st === 'm') && width && (obj['min-width'] = formatUnit(width));
      (st === 'min' || st === 'm') && height && (obj['min-height'] = formatUnit(height));
      (st === 'max' || st === 'm') && width && (obj['max-width'] = formatUnit(width));
      (st === 'max' || st === 'm') && height && (obj['max-height'] = formatUnit(height));
      bc && (obj['background-color'] = formatColor(sr, bc));
      t === 'r' && (obj['border-radius'] = formatUnit(Math.min(width, height))); // 圆形
      return obj;
    },
    // 按钮 _button_20_20_c_bc_r20_b2_fs14 ，color在前，backgroundColor在后 如果有border，则为空心的按钮
    button: ([s]) => {
      let width, height, fs, r, c, b;
      let obj = { 'cursor': 'pointer' };
      if (s) {
        let list = s.split('_').filter(o => o);
        width = removeOne(list, o => /^[.\d]+(px|p)?$/.test(o) && !isColor(o))[0];
        height = removeOne(list, o => /^[.\d]+(px|p)?$/.test(o) && !isColor(o))[0] || width;
        r = removeOne(list, o => /^r([.\d]+(px)?)?$/.test(o))[0]; // border-radius
        b = removeOne(list, o => /^b([.\d]+(px)?)?$/.test(o))[0]; // border
        fs = removeOne(list, o => /^fs([.\d]+(px)?)?$/.test(o))[0]; // font-size
        obj = { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'justify-content': 'center', 'cursor': 'pointer', 'white-space': 'nowrap' };
        c = list[0];
        list.splice(0, 1);
        if (b) {
          if (b === 'b') b = 'b1px';
          obj['border'] = `${formatUnit(b?.slice(1))} solid ${formatColor(sr, c)}`;
        }
        width && (obj['min-width'] = formatUnit(width));
        width && (obj['max-width'] = formatUnit(width));
        height && (obj['min-height'] = formatUnit(height));
        height && (obj['max-height'] = formatUnit(height));
        height && (obj['line-height'] = formatUnit(height));
        fs && (obj['font-size'] = formatUnit(fs?.slice(2)));
        if (r === 'r') {
          obj['border-radius'] = formatUnit(Math.min(width, height)); // 圆形
        } else if (r) {
          obj['border-radius'] = formatUnit(r?.slice(1));
        }
        obj['color'] = formatColor(sr, c || 'ctext'); // 默认是主题文字色
        list = getDefaultBackColor(sr, list);
        if (list.length === 1) {
          obj['background-color'] = formatColor(sr, list[0]);
        } else {
          obj['background-image'] = `linear-gradient(to bottom, ${list.map(o => formatColor(sr, o)).join(',')})`;
        }
      }
      return obj;
    },
    // 外边距( _m_t10_l20，如果指定了tblr,则不再指定margin
    // 外边距(全，上下，左右，上右下左)，_m_1 -> margin:1px | _m_1_1 -> margin:1px 1px | _m_1_1_1_1 -> margin:1px 1px 1px 1px | _m__1 -> margin:0px 1px | _m___1 -> margin:0px 0px 1px
    m: ([s]) => {
      const obj = {};
      if (s) {
        const list = s.split('_').map(o => o || 0);
        const bc = removeOne(list, o => isColor(o))[0];
        const t = removeOne(list, o => /^t-?[.\w]+/.test(o))[0]; // top
        const b = removeOne(list, o => /^b-?[.\w]+/.test(o))[0]; // bottom
        const l = removeOne(list, o => /^l-?[.\w]+/.test(o))[0]; // left
        const r = removeOne(list, o => /^r-?[.\w]+/.test(o))[0]; // right
        const h = removeOne(list, o => /^h-?[.\w]+/.test(o))[0]; // 横向
        const v = removeOne(list, o => /^v-?[.\w]+/.test(o))[0]; // 纵向
        t && (obj['margin-top'] = formatUnit(t?.slice(1)));
        b && (obj['margin-bottom'] = formatUnit(b?.slice(1)));
        l && (obj['margin-left'] = formatUnit(l?.slice(1)));
        r && (obj['margin-right'] = formatUnit(r?.slice(1)));
        if (h) {
          obj['margin-left'] = formatUnit(h?.slice(1));
          obj['margin-right'] = formatUnit(h?.slice(1));
        }
        if (v) {
          obj['margin-top'] = formatUnit(v?.slice(1));
          obj['margin-bottom'] = formatUnit(v?.slice(1));
        }
        if (!_.size(obj)) {
          obj['margin'] = _.dropRightWhile(list, o => o === undefined).map(o => formatUnit(!o ? 0 : o)).join(' ');
        }
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 上下外边距
    mv: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'margin-top': formatUnit(list[0]), 'margin-bottom': formatUnit(list[1] || list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 左右外边距
    mh: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'margin-left': formatUnit(list[0]), 'margin-right': formatUnit(list[1] || list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 上外边距
    mt: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'margin-top': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 下外边距
    mb: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'margin-bottom': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 左外边距
    ml: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'margin-left': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 右外边距
    mr: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'margin-right': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 外边距( _p_t10_l20，如果指定了tblr,则不再指定padding
    // 内边距
    p: ([s]) => {
      const obj = {};
      if (s) {
        const list = s.split('_').map(o => o || 0);
        const bc = removeOne(list, o => isColor(o))[0];
        const t = removeOne(list, o => /^t-?[.\w]+/.test(o))[0]; // top
        const b = removeOne(list, o => /^b-?[.\w]+/.test(o))[0]; // bottom
        const l = removeOne(list, o => /^l-?[.\w]+/.test(o))[0]; // left
        const r = removeOne(list, o => /^r-?[.\w]+/.test(o))[0]; // right
        const h = removeOne(list, o => /^h-?[.\w]+/.test(o))[0]; // 横向
        const v = removeOne(list, o => /^v-?[.\w]+/.test(o))[0]; // 纵向
        t && (obj['padding-top'] = formatUnit(t?.slice(1)));
        b && (obj['padding-bottom'] = formatUnit(b?.slice(1)));
        l && (obj['padding-left'] = formatUnit(l?.slice(1)));
        r && (obj['padding-right'] = formatUnit(r?.slice(1)));
        if (h) {
          obj['padding-left'] = formatUnit(h?.slice(1));
          obj['padding-right'] = formatUnit(h?.slice(1));
        }
        if (v) {
          obj['padding-top'] = formatUnit(v?.slice(1));
          obj['padding-bottom'] = formatUnit(v?.slice(1));
        }
        if (!_.size(obj)) {
          obj['padding'] = _.dropRightWhile(list, o => o === undefined).map(o => formatUnit(!o ? 0 : o)).join(' ');
        }
        bc && (obj['background-color'] = formatColor(sr, bc));
      }
      return obj;
    },
    // 上下内边距
    pv: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'padding-top': formatUnit(list[0]), 'padding-bottom': formatUnit(list[1] || list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 左右内边距
    ph: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'padding-left': formatUnit(list[0]), 'padding-right': formatUnit(list[1] || list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 上内边距
    pt: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'padding-top': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 下内边距
    pb: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'padding-bottom': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 左内边距
    pl: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'padding-left': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 右内边距
    pr: ([s]) => {
      if (!s) return {};
      const list = s.split('_').filter(o => o);
      const bc = removeOne(list, o => isColor(o))[0];
      const obj = { 'padding-right': formatUnit(list[0]) };
      bc && (obj['background-color'] = formatColor(sr, bc));
      return obj;
    },
    // 颜色可以设置为渐变色 _c_red | _c_red_blue | _c_ob_red_blue | _c_-ob_red_blue | _c_45deg_red_blue
    c: ([s]) => {
      const list = (s || '').split('_').filter(o => o);
      let dir = removeOne(list, o => /^-?(v|h|c|ob|\d+deg)$/.test(o))[0]; // 渐变的方向,v从左到右，h从上到下，从左上到右下45deg,从右上到左下-45deg
      if (list.length > 1) {
        let bc;
        const obj = { 'background-clip': 'text', 'color': 'transparent' };
        !dir && (dir = 'h');
        if (dir === 'c') { // 径向渐变
          return { ...obj, 'background-image': `radial-gradient(${list.map(o => formatColor(sr, o)).join(',')})` };
        }
        if (dir === 'ob') { // 斜向左上到右下
          return { ...obj, 'background-image': `linear-gradient(to bottom right, ${list.map(o => formatColor(sr, o)).join(',')})` };
        }
        if (dir === '-ob') { // 反斜向右上到左下
          return { ...obj, 'background-image': `linear-gradient(to bottom left, ${list.map(o => formatColor(sr, o)).join(',')})` };
        }
        dir = { 'v': 'to bottom', '-v': 'to top', 'h': 'to right', '-h': 'to left' }[dir] || dir; // 线性渐变
        return { ...obj, 'background-image': `linear-gradient(${dir}, ${list.map(o => formatColor(sr, o)).join(',')})` };
      }
      const color = removeOne(list, o => isColor(o))[0] || 'ctext';
      return { 'color': formatColor(sr, color) };
    },
    // 背景(渐变)颜色 _bc (主题色) | _bc_v (主题色纵向渐变) |  _bc_red | _bc_c0c0c0 | _bc_v_red_blue | _bc_v_red_blue | _bc_ob_red_blue | _bc_-ob_red_blue | _bc_45deg_red_blue
    bc: ([s]) => {
      let list = (s || '').split('_').filter(o => o);
      let dir = removeOne(list, o => /^-?(v|h|c|ob|\d+deg)$/.test(o))[0]; // 渐变的方向,v从左到右，h从上到下，从左上到右下45deg,从右上到左下-45deg
      list = getDefaultBackColor(sr, list);
      if (list.length > 1) {
        !dir && (dir = 'h');
        if (dir === 'c') { // 径向渐变
          return { 'background-image': `radial-gradient(${list.map(o => formatColor(sr, o)).join(',')})` };
        }
        if (dir === 'ob') { // 斜向左上到右下
          return { 'background-image': `linear-gradient(to bottom right, ${list.map(o => formatColor(sr, o)).join(',')})` };
        }
        if (dir === '-ob') { // 反斜向右上到左下
          return { 'background-image': `linear-gradient(to bottom left, ${list.map(o => formatColor(sr, o)).join(',')})` };
        }
        dir = { 'v': 'to bottom', '-v': 'to top', 'h': 'to right', '-h': 'to left' }[dir] || dir; // 线性渐变
        return { 'background-image': `linear-gradient(${dir}, ${list.map(o => formatColor(sr, o)).join(',')})` };
      }
      return { 'background-color': formatColor(sr, list[0]) }; // 纯色背景
    },
    // 背景图片：_bi_xx.png _bi_[cover|full|contain]_xx.png 如果包含有变量的情况，智能使用stle，如：:style="_u(`_bi_${url}`)"
    bi: ([s]) => {
      let size = '100% 100%', url;
      if (s) {
        const list = s.split('_').filter(o => o);
        removeOne(list, o => o === 'full')[0] && (size = '100% 100%');
        removeOne(list, o => o === 'cover')[0] && (size = 'cover');
        removeOne(list, o => o === 'contain')[0] && (size = 'contain');
        url = list[0];
      }
      const obj = { 'background-position': 'center', 'background-size': size, 'background-repeat': 'no-repeat' };
      if (url) obj['background-image'] = `url(${url})`;
      return obj;
    },
    // -----------------------------------> 边框
    // 圆角 _br_1_2 _br_1_2_3
    br: ([s]) => {
      if (s) {
        const list = s.split('_');
        return { 'border-radius': _.dropRightWhile(list, o => o === '').map(o => formatUnit(!o ? 0 : +o)).join(' ') }
      }
    },
    // 上圆角
    brt: ([s]) => ({ 'border-top-left-radius': formatUnit(s), 'border-top-right-radius': formatUnit(s) }),
    // 下圆角
    brb: ([s]) => ({ 'border-bottom-left-radius': formatUnit(s), 'border-bottom-right-radius': formatUnit(s) }),
    // 左圆角
    brl: ([s]) => ({ 'border-top-left-radius': formatUnit(s), 'border-bottom-left-radius': formatUnit(s) }),
    // 右圆角
    brr: ([s]) => ({ 'border-top-right-radius': formatUnit(s), 'border-bottom-right-radius': formatUnit(s) }),
    // 边框: _bo_red_1 | _bo_red_1_1 | _bo_red_1_1_solid  | _bo_1_1_solid_red
    bo: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      if (list.length < 2) {
        if (list[0] == 0) {
          return { 'border': 0 };
        }
        return { 'border': `${formatUnit(list[0] || 1)} ${style} ${color}` };
      }
      return { 'border-top': `${formatUnit(list[0] || 0)} ${style} ${color}`, 'border-bottom': `${formatUnit(list[2] || list[0] || 0)} ${style} ${color}`, 'border-right': `${formatUnit(list[1] || 0)} ${style} ${color}`, 'border-left': `${formatUnit(list[3] || list[1] || 0)} ${style} ${color}` };
    },
    // 上下边框: _bov[_1_1_solid_red]
    bov: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      return { 'border-top': `${formatUnit(list[0] || 1)} ${style} ${color}`, 'border-bottom': `${formatUnit(list[1] || list[0] || 1)} ${style} ${color}` };
    },
    // 左右边框:_boh[_1_1_solid_red]
    boh: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      return { 'border-left': `${formatUnit(list[0] || 1)} ${style} ${color}`, 'border-right': `${formatUnit(list[1] || list[0] || 1)} ${style} ${color}` };
    },
    // 上边框 _bot[_1_solid_red]
    bot: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      return { 'border-top': `${formatUnit(list[0] || 1)} ${style} ${color}` };
    },
    // 下边框 _bob[_1_solid_red]
    bob: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      return { 'border-bottom': `${formatUnit(list[0] || 1)} ${style} ${color}` };
    },
    // 左边框 _bol[_1_solid_red]
    bol: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      return { 'border-left': `${formatUnit(list[0] || 1)} ${style} ${color}` };
    },
    // 右边框 _bor[_1_solid_red]
    bor: ([s]) => {
      let style = 'solid', color = 'e8e8e8', list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        style = removeOne(list, o => o === 'dashed' || o === 'solid')[0] || style;
        color = removeOne(list, o => isColor(o))[0] || color;
      }
      color = formatColor(sr, color);
      return { 'border-right': `${formatUnit(list[0] || 1)} ${style} ${color}` };
    },
    // 阴影: _shadow_color_blur_spread | _shadow_1_5_v0_h0_red | _shadow_in_1_5_red
    // 默认为四周外边框阴影，blur:模糊距离 spread阴影大小，添加上in为内边阴影
    // _h0_v2:下 _h0_v-2:上 _h-2_v0:左  _h2_v0:右 _h2_v2:右下
    shadow: ([s]) => {
      let inset = '', color = 'e8e8e8', h = 0, v = 0, blur = 10, spread = 4; // blur:模糊距离 spread阴影大小
      if (s) {
        const list = s.split('_').filter(o => o);
        h = removeOne(list, o => o[0] === 'h')[0] || h;
        h && (h = +h?.slice(1));
        v = removeOne(list, o => o[0] === 'v')[0] || v;
        v && (v = +v?.slice(1));
        inset = removeOne(list, o => o === 'in' || o === 'inset')[0] ? 'inset' : '';
        color = removeOne(list, o => isColor(o))[0] || color;
        blur = list[0] || blur;
        spread = list[1] || spread;
      }
      color = formatColor(sr, color);
      return { 'box-shadow': `${inset} ${formatUnit(h)} ${formatUnit(v)} ${formatUnit(blur)} ${formatUnit(spread)} ${color}` };
    },
    // -----------------------------------> 文字
    // 标签 _label | _label_12 | _label_12_m10
    label: ([s]) => {
      let size = 14, marginRight = 16;
      if (s) {
        const list = s.split('_').filter(o => o);
        const m = removeOne(list, o => /^m[.\w]+/.test(o))[0];
        m && (marginRight = m?.slice(1));
        size = list[0] || size;
      }
      return { 'color': '#3d3d3d', 'font-size': formatUnit(size), 'margin-right': formatUnit(marginRight), 'font-weight': '400' };
    },
    // 值 _value | _value_12
    value: ([s]) => {
      let size = 12;
      if (s) {
        const list = s.split('_').filter(o => o);
        size = list[0] || size;
      }
      return { 'color': '#3d3d3d', 'font-size': formatUnit(size), 'font-weight': '400' };
    },
    // z-index
    zi: ([d]) => ({ 'z-index': d }),
    // 字体大小 _fs_14 | _fs_14_red | _fs_14_bold
    fs: ([s]) => {
      let size, color, bold, weight, nowrap, italic, through, underline, tc, ti, ls, upper, lower, list = [];
      if (s) {
        list = s.split('_').filter(o => o);
        weight = removeOne(list, o => /^\d00$/.test(o))[0];
        bold = removeOne(list, o => o === 'bold')[0];
        nowrap = removeOne(list, o => o === 'nowrap')[0];
        italic = removeOne(list, o => o === 'italic')[0];
        through = removeOne(list, o => o === 'through')[0];
        underline = removeOne(list, o => o === 'underline')[0];
        tc = removeOne(list, o => o === 'tc')[0];
        ti = removeOne(list, o => /^ti\d+/.test(o))[0];
        ls = removeOne(list, o => /^ls\d+/.test(o))[0];
        upper = removeOne(list, o => o === 'upper')[0];
        lower = removeOne(list, o => o === 'lower')[0];
        color = removeOne(list, o => isColor(o))[0];
        size = list[0];
      }
      color = formatColor(sr, color);
      const obj = {};
      size && (obj['font-size'] = formatUnit(size));
      weight && (obj['font-weight'] = weight);
      bold && (obj['font-weight'] = bold);
      color && (obj['color'] = color);
      nowrap && (obj['white-space'] = 'nowrap');
      italic && (obj['font-style'] = 'italic');
      through && (obj['text-decoration'] = 'line-through');
      underline && (obj['text-decoration'] = 'underline');
      tc && (obj['text-align'] = 'center');
      ti && (obj['text-indent'] = formatUnit(ti?.slice(2) + 'em'));
      ls && (obj['letter-spacing'] = formatUnit(ls?.slice(2)));
      upper && (obj['text-transform'] = 'uppercase');
      lower && (obj['text-transform'] = 'lowercase');
      return obj;
    },
    // 加粗
    bold: () => ({ 'font-weight': 'bold' }),
    // 斜体
    italic: () => ({ 'font-style': 'italic' }),
    // 字体加粗
    fw: ([d]) => ({ 'font-weight': `${d}` }),
    // 行距
    lh: ([s]) => ({ 'line-height': formatUnit(s) }),
    // 字距
    ls: ([s]) => ({ 'letter-spacing': formatUnit(s) }),
    // 文字不自动断行
    nowrap: () => ({ 'white-space': 'nowrap' }),
    // 转大写
    upper: () => ({ 'text-transform': 'uppercase' }),
    // 转小写
    lower: () => ({ 'text-transform': 'lowercase' }),
    // 文字居中
    tc: () => ({ 'text-align': 'center' }),
    ta: ([s]) => ({ 'text-align': formatUnit(s) }),
    // 省略文字多了使用...
    dot: () => ({ 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }),
    // 文字段落缩进
    ti: ([s]) => ({ 'text-indent': formatUnit(s + 'em') }),
    cursor: ([s]) => ({ 'cursor': s }),
    // 文字删除线 _through_thickness_color _through_red _through_2_red
    through: ([s]) => {
      let color, thickness = 1;
      if (s) {
        const list = s.split('_').filter(o => o);
        color = removeOne(list, o => isColor(o))[0];
        thickness = list[1] || thickness;
      }
      const obj = { 'text-decoration': 'line-through', 'text-decoration-thickness': formatUnit(thickness) };
      if (color) {
        obj['text-decoration-color'] = formatColor(sr, color);
      }
      return obj;
    },
    // 文字删除线 _overline_thickness_color _overline_red _overline_2_red
    overline: ([s]) => {
      let color, thickness = 1;
      if (s) {
        const list = s.split('_').filter(o => o);
        color = removeOne(list, o => isColor(o))[0];
        thickness = list[1] || thickness;
      }
      const obj = { 'text-decoration': 'overline', 'text-decoration-thickness': formatUnit(thickness) };
      if (color) {
        obj['text-decoration-color'] = formatColor(sr, color);
      }
      return obj;
    },
    // 文字下划线 _underline_offset_thickness_color _underline_red _underline_4_red _underline_4_1_red
    underline: ([s]) => {
      let color, offset = 4, thickness = 1;
      if (s) {
        const list = s.split('_').filter(o => o);
        color = removeOne(list, o => isColor(o))[0];
        offset = list[0] || offset;
        thickness = list[1] || thickness;
      }
      const obj = { 'text-decoration': 'underline', 'text-underline-offset': formatUnit(offset), 'text-decoration-thickness': formatUnit(thickness) };
      if (color) {
        obj['text-decoration-color'] = formatColor(sr, color);
      }
      return obj;
    },
    td: ([s]) => ({ 'text-decoration': s.split('_').join(' ') }), // _td_underline_line-through
    // 可见 _vi_hidden
    vi: ([s]) => ({ 'visibility': s }),
    // 透明度0-100之间的值 _opacity_30 
    opacity: ([s]) => ({ 'opacity': s / 100 }),
    // 旋转 _rotate_30
    rotate: ([s]) => ({ 'transform': `rotate(${s}deg)` }),
    // 旋转 _scale_2_1 _scale_0.9
    scale: ([s]) => {
      s = s.split('_').filter(o => o);
      return ({ 'transform': `scaleX(${s[0]}) scaleY(${s[1] || s[0]})` });
    },
    translate: ([s]) => {
      s = s.split('_').filter(o => o);
      return ({ 'transform': `translate(${formatUnit(s[0] || 0)},${formatUnit(s[1] || 0)})` });
    },
    // transition动画 _transition _transition_3000_ease
    transition: ([s]) => {
      let time = 1000, mode = 'ease';
      if (s) {
        const list = s.split('_').filter(o => o);
        mode = removeOne(list, o => ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier'].includes(o))[0] || mode;
        time = list[0] || time;
      }
      return { 'transition': `all ${time}ms ${mode}` };
    },
    // 箭头 _arrow_3d3d3d_9_1_(left|right|up|down) 默认向右
    // 箭头 _arrow_3d3d3d_size_thick_(left|right|up|down) 默认向右
    arrow: ([s]) => {
      let color = '3d3d3d', dir = 'right', rotate = '-45deg', size = 4, thick = 1;
      if (s) {
        const list = s.split('_').filter(o => o);
        dir = removeOne(list, o => ['left', 'right', 'up', 'down'].includes(o))[0] || dir;
        rotate = dir === 'right' ? '-45deg' : dir === 'up' ? '-135deg' : dir === 'down' ? '45deg' : dir === 'left' ? '135deg' : rotate;
        color = removeOne(list, o => isColor(o))[0] || color;
        size = list[0] || size;
        thick = list[1] || thick;
      }
      color = formatColor(sr, color);
      return { 'width': formatUnit(size), 'height': formatUnit(size), 'border-right': `${formatUnit(thick)} solid ${color}`, 'border-bottom': `${formatUnit(thick)} solid ${color}`, 'transform': `rotate(${rotate})`, padding: formatUnit(size) };
    },
    // 关闭按钮 _close_3d3d3d_9_1
    close: ([s], { rawSelector, currentSelector }) => {
      let color = '3d3d3d', size = 20, thick = 1;
      if (s) {
        const list = s.split('_').filter(o => o);
        color = removeOne(list, o => isColor(o))[0] || color;
        size = list[0] || size;
        thick = list[1] || thick;
      }
      color = formatColor(sr, color);
      const selector = $(rawSelector);
      return `${selector}{position:relative;width:${formatUnit(size)};height:${formatUnit(size)};}${selector}::before,${selector}::after{content:'';position:absolute;height:${formatUnit(thick)};width:100%;top:50%;left:0;background:${color};}${selector}::before{transform:rotate(45deg);}${selector}::after{transform: rotate(-45deg);}`;
    },
    // add按钮 _add_3d3d3d_9_1
    add: ([s], { rawSelector, currentSelector }) => {
      let color = '3d3d3d', size = 20, thick = 1;
      if (s) {
        const list = s.split('_').filter(o => o);
        color = removeOne(list, o => isColor(o))[0] || color;
        size = list[0] || size;
        thick = list[1] || thick;
      }
      color = formatColor(sr, color);
      const selector = $(rawSelector);
      return `${selector}{position:relative;width:${formatUnit(size)};height:${formatUnit(size)};}${selector}::before,${selector}::after{content:'';position:absolute;height:${formatUnit(thick)};width:100%;top:50%;left:0;background:${color};}${selector}::before{transform:rotate(90deg);}`;
    },
    // grid布局 _grid_v3_g10 _grid_h3_g10 _grid_h3_hg10_vg20
    // v 表示竖着排满3个，h表示横着排满3个，hg为横向空白，vg为纵向空白
    grid: ([s]) => {
      let vcount, hcount, gap = 0, hgap = 0, vgap = 0;
      if (s) {
        const list = s.split('_').filter(o => o);
        vcount = removeOne(list, o => /^v\d+$/.test(o))[0];
        hcount = removeOne(list, o => /^h\d+$/.test(o))[0];
        gap = removeOne(list, o => /^g\d+$/.test(o))[0];
        hgap = removeOne(list, o => /^hg\d+$/.test(o))[0];
        vgap = removeOne(list, o => /^vg\d+$/.test(o))[0];
        !hgap && (hgap = gap ? 'h' + gap : 0);
        !vgap && (vgap = gap ? 'v' + gap : 0);
        hgap && (hgap = hgap?.slice(2));
        vgap && (vgap = vgap?.slice(2));
      }
      if (vcount) {
        return {
          "display": "grid",
          "grid-auto-flow": "column",
          "grid-template-rows": `repeat(${vcount?.slice(1)}, 1fr)`,
          "grid-row-gap": formatUnit(vgap),
          "grid-column-gap": formatUnit(hgap),
        };
      }
      if (hcount) {
        return {
          "display": "grid",
          "grid-template-columns": `repeat(${hcount?.slice(1)}, 1fr)`,
          "grid-template-rows": "auto",
          "grid-row-gap": formatUnit(vgap),
          "grid-column-gap": formatUnit(hgap),
        };
      }
    },
    // column布局 _col_3 _col_3_w200 _col_3_wauto_g10_s_f_r2solid_red _col_rsolid2
    // 3 表示3列，w表示每列的宽度可以是auto，g为空白，s为column-span的all表示贯穿所有列，f为column-fill的auto表示按顺序对每个列进行填充列的高度会各有不同，r为column-rule定义列与列间边框的宽度和样式，剩下的颜色为边框的颜色
    col: ([s]) => {
      let count = 2, width = 'auto', gap = 'g0', span = 'none', fill = 'blance', rule, color;
      if (s) {
        const list = s.split('_').filter(o => o);
        count = removeOne(list, o => /^\d+$/.test(o))[0] || count;
        width = removeOne(list, o => /^w\d+(px|p)?$/.test(o))[0] || width;
        gap = removeOne(list, o => /^g\d+$/.test(o))[0] || gap;
        span = removeOne(list, o => o === 's')[0] ? 'all' : span;
        fill = removeOne(list, o => o === 'f')[0] ? 'auto' : fill;
        rule = removeOne(list, o => /^r(\d+)?(solid|dotted|dashed|double|groove|ridge|inset|outset)?(\d+)?$/.test(o))[0];
        color = list[0];
      }
      const obj = {
        'column-count': count,
        'column-width': formatUnit(width),
        'column-gap': formatUnit(gap?.slice(1)),
        'column-span': span,
        'column-fill': fill,
      };
      color && (obj['column-rule-color'] = formatColor(sr, color));
      if (rule) {
        const match = rule.match(/^r(\d+)?(solid|dotted|dashed|double|groove|ridge|inset|outset)?(\d+)?$/);
        const w = match[1] || match[3];
        w && (obj['column-rule-width'] = formatUnit(w));
        match[2] && (obj['column-rule-style'] = match[2]);
      }

      return obj;
    },
  };
  rules = _.map(rules, (v, k) => {
    const func = ([line, im, ...params], ...otherParams) => {
      // console.log('【UNO】解析：', line);
      params = params.map(o => {
        o && _.forEach(sss, (v, k) => o = o.replaceAll(v, k).replace(/^_/, ''));
        return o;
      });
      const obj = v(params, ...otherParams);
      return _.isString(obj) ? obj : _.mapValues(obj, (v, k) => im ? `${v} !important` : v); // 是否添加!important
    }
    return [_r(k, sss), func];
  });
  return rules;
}

// https://unocss.dev/guide
export const uno = ({ $, sr, isWeixin }) => { // 自定义原子css类
  const sss = {
    '.': isWeixin ? '_dot_' : '.',
    '%': isWeixin ? '_percent_' : '%',
    '!': isWeixin ? '_important_' : '!',
    '#': isWeixin ? '_hash_' : '#',
  };
  return { rules: getRules({ $, sr, sss }), sss };
}
