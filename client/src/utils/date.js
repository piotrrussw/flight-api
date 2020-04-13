export const getIsoToday = () => {
  const now = new Date();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();

  return '2020-12-01';
  return [
    now.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-');
};
