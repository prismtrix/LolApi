/*
import LolApi from "loldata.js";
*/

const lolApi = new LolApi('YOUR_KEY_HERE')

const rotation = await lolApi.rotation();

const rank = await lolApi.rankUser('Sopa Do TK');

const user = await lolApi.searchUser('Sopa Do TK');

const lastMatch = await lolApi.lastMatch('Sopa Do TK')

const currentMatch = await lolApi.inGame('Sopa Do TK')

console.log(rotation, rank, user, lastMatch, currentMatch)