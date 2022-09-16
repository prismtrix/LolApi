# League Of Legends API

This project utilize the Riot Games Official API

To initialize this follow the bellow steps:


## Installing

To install utilize this in your terminal: 

```js
  npm install loldata.js
```
```diff
- Warning: This Project Only Will Work In Node 17 Or Node 18
```

## Initializing The Project

```js
  import LolApi from 'loldata.js';
  
  const lolApi = new LolApi(api_key);
```

| Parameter   | Type  | Required |
| :---------- | :---- | :-----   |
|  `api_key`| `string`| **True** |

#### Receiving A User

```js
  const user = await lolApi.searchUser(nickname);
```

| Parameter   | Type     | Required |
| :---------- | :--------| :--------|
| `nickname`  | `string` | **True** |

#### Receiving The Current Rotation

```js
  const rotation = await lolApi.rotation();
```

#### Receiving Ranked Informations

```js
  const user = await lolApi.rankUser(nickname);
```

| Parameter   | Type     | Required |
| :---------- | :--------| :--------|
| `nickname`  | `string` | **True** |

#### Receiving Last Match Informations

```js
  const user = await lolApi.lastMatch(nickname);
```

| Parameter   | Type     | Required |
| :---------- | :--------| :--------|
| `nickname`  | `string` | **True** |

#### Receiving Actual Match Informations

```js
  const user = await lolApi.inGame(nickname);
```

| Parameter   | Type     | Required |
| :---------- | :--------| :--------|
| `nickname`  | `string` | **True** |

