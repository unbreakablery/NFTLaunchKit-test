import moment from 'moment';

// Make short Contract Address string
export const shortAddress = (addr: any): string => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 5)}...${addr.slice(addr.length - 4)}`;
}