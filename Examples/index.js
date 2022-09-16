/*
import LolApi from "loldata.js";
*/

const lolApi = new LolApi()

const rotation = await lolApi.rotation();

const rank = await lolApi.rankUser('Sopa Do TK');

const user = await lolApi.searchUser('Sopa Do TK');

console.log(rotation, rank, user)