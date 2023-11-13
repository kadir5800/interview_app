import axios from 'axios';
import md5 from "react-native-md5";
import { marvelVeriable } from '../Characters/marvelVeriable';

const createdHash = (timestamp, privateKey, publicKey) => {
  const stringToHash = timestamp + privateKey + publicKey;
  const hashedString = md5.hex_md5(stringToHash);
  return hashedString;
};

const getAllSeries = async (searchTerm = '',limit=20, sortBy = 'title') => {
  const timestamp = new Date().getTime();
  console.log(searchTerm);
  console.log(limit);
  console.log(sortBy);

  const hash = createdHash(timestamp, marvelVeriable.privateKey, marvelVeriable.publicKey);
  const params = {
    ts: timestamp,
    apikey: marvelVeriable.publicKey,
    hash: hash,
    orderBy:sortBy,
    limit:limit,
  };
  if (searchTerm) {
    params.titleStartsWith = searchTerm;
  }
  try {
    const response = await axios.get(`${marvelVeriable.baseUrl}/series`, {
      params: params,
    });
    const total=response.data.data.total;
    const seriesData=response.data.data.results
    return {seriesData,total};
  } catch (error) {
    console.error('series verileri alınırken hata oluştu:', error);
    throw error;
  }
};

export { getAllSeries };