function useCalculateLDM(orders) {
  if(!orders?.ids || orders?.ids?.length <= 0) return 0;
  return orders?.ids
    .map(id => orders.entities[id].loadingMeter)
    .reduce((acc, val) => acc + val, 0)
}

export default useCalculateLDM;