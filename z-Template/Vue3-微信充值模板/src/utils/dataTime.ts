export function dataTime(value: any) {
  if (!value) {
    return '';
  }
  // if (typeof value === 'string' && (value.indexOf('T') > -1 || value.includes('T'))) {
  //     value = value.replace('T', ' ').replace(/\-/g, '/'); //注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
  // };
  const date = new Date(value);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    (date.getDate() < 10
      ? ("0" + date.getDate())
      : date.getDate()) + " ";
  const h =
    (date.getHours() < 10
      ? ("0" + date.getHours())
      : date.getHours()) + ":";
  const m =
    (date.getMinutes() < 10
      ? ("0" + date.getMinutes())
      : date.getMinutes());
  const dataFormate = Y + M + D + h + m;
  return dataFormate;
};
