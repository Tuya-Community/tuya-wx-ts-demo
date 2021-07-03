import { reduce, assign } from 'lodash';
import { dpIdMap } from './config';

// 默认的key，value
const DEFAULT_OPTIONS = {
  key: 'code',
  value: 'value',
}

const parseDict = (datas, options) => {
  if (datas.length === 0) return {};
  options = assign({}, DEFAULT_OPTIONS, options);
  const key = options.key;
  const value = options.value;
  return reduce(
    datas,
    (obj, item) => {
      obj[item[key]] = item[value];
      return obj;
    },
    {},
  );
};

function getDpInfo({ functions = [], status = [], dpStatus = [] }) {
  // dp基本配置信息
  let dps = {}
  if(Array.isArray(functions) && functions.length > 0) {
    functions.forEach(rwDp => {
      const { code, type, values } = rwDp
      dps[code] = { dp_id: dpIdMap[code], dp_code: code, dp_type: type, dp_values: JSON.parse(values) }
    })
  }
  if(Array.isArray(status) && status.length > 0) {
    status.forEach(roDp => {
      const { code, type, values } = roDp
      if(!dps[code]) {
        dps[code] = { dp_id: dpIdMap[code], dp_code: code, dp_type: type, dp_values: JSON.parse(values) }
      }
    })
  }

  // dp状态
  const dpState = parseDict(dpStatus)

  return { dps, dpState }
}

export default {
  getDpInfo
}