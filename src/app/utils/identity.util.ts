import { GB2260 } from './identity.data'

export const extractInfo = (idNo: string) => {
  const addrPart = idNo.substring(0, 6); // 身份证号的前6位代表地址
  const birthPart = idNo.substring(6, 14);

  return {
    addrCode: addrPart,
    dateOfBirth: birthPart
  };
}

export const isValidAddr = (addr: string) => { // 判断地址是否合法
  return GB2260[addr] !== undefined;
}

export const getAddrByCode = (code: string) => {
  const province = GB2260[code.substring(0, 2) + '0000' ]; // 省份数据，后4位都是0
  const city = GB2260[code.substring(0, 4) + '00'].replace(province, ''); // 市数据，后2位都是0。 但是数据类型是  省份市区， 所以要处理成市区
  const district = GB2260[code].replace(province+city, ''); // 得到省市区的数据，处理成 区县

  return {
    province: province,
    city: city,
    district: district
  };
}