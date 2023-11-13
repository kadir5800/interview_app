import axios from 'axios';
import { marvelVeriable } from './marvelVeriable';
import md5 from "react-native-md5";

const createdHash = (timestamp, privateKey, publicKey) => {
  const stringToHash = timestamp + privateKey + publicKey;
  const hashedString = md5.hex_md5(stringToHash);
  return hashedString;
};

const getCharacters = async (searchTerm = '',limit=20) => {
  const timestamp = new Date().getTime();
  const hash = createdHash(timestamp, marvelVeriable.privateKey, marvelVeriable.publicKey);
  const params = {
    ts: timestamp,
    apikey: marvelVeriable.publicKey,
    hash: hash,
    orderBy:'name',
    limit:limit,
  };
  if (searchTerm) {
    params.nameStartsWith = searchTerm;
  }
  try {
    const response = await axios.get(`${marvelVeriable.baseUrl}/characters`, {
      params: params,
    });
    const total=response.data.data.total;
    const characters=response.data.data.results
    return {characters,total};
  } catch (error) {
    console.error('Karakter verileri alınırken hata oluştu:', error);
    throw error;
  }
};

export { getCharacters };
