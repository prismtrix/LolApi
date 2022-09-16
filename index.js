import champions from "./champions.js";

class LolApi {
  constructor(key) {
    this.key = key;
  }

  async rankUser(name) {
    const nameReplace = name.replaceAll(" ", "+");

    const response = await fetch(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nameReplace}`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data = await response.json();

    const response2 = await fetch(
      `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data2 = await response2.json();

    if (data.status) {
      switch (data.status.status_code) {
        case 403:
          return "Key Inválida";
          break;

        case 429:
          return "Rate Limit Excedido";
          break;

        case 401:
          return "Não Autorizado";
          break;

        case 404:
          return "Usuário Não Encontrado";
          break;
      }
    }

    if (data2.status) {
      switch (data2.status.status_code) {
        case 403:
          return "Key Inválida";
          break;

        case 429:
          return "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          return "Não Autorizado";
          break;
      }
    }

    return data2;
  }

  async searchUser(name) {
    const nameReplace = name.replaceAll(" ", "+");

    const response = await fetch(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nameReplace}`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data = await response.json();

    const response2 = await fetch(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data2 = await response2.json();

    if (data.status) {
      switch (data.status.status_code) {
        case 403:
          return "Key Inválida";
          break;

        case 429:
          return "Rate Limit Excedido";
          break;

        case 401:
          return "Não Autorizado";
          break;

        case 404:
          return "Usuário Não Encontrado";
          break;
      }
    }

    if (data2.status) {
      switch (data2.status.status_code) {
        case 403:
          return "Key Inválida";
          break;

        case 429:
          return "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          return "Não Autorizado";
          break;
      }
    }

    if (data2[0] || data2[1] || data2[2]) {
      const name1 = champions.find(
        (element) => element.id == data2[0].championId
      );
      const name2 = champions.find(
        (element) => element.id == data2[1].championId
      );
      const name3 = champions.find(
        (element) => element.id == data2[2].championId
      );

      if (data2[0]) data2[0].championName = name1.name;
      if (data2[1]) data2[1].championName = name2.name;
      if (data2[2]) data2[2].championName = name3.name;

      data2 = [data2[0], data2[1], data2[2]];
    }

    const search = {
      user: data,
      mastery: data2,
    };
    return search;
  }

  async rotation() {
    const response = await fetch(
      `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data = await response.json();

    if (data.status) {
      switch (data.status.status_code) {
        case 403:
          return "Key Inválida";
          break;

        case 429:
          return "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          return "Não Autorizado";
          break;

        case 404:
          return "Data Não Encontrada";
          break;
      }
    }

    data.freeChampionIds.forEach((id, index) => {
      data.freeChampionIds[index] = champions.find(
        (element) => element.id == id
      ).name;
    });

    data.freeChampionIdsForNewPlayers.forEach((id, index) => {
      data.freeChampionIdsForNewPlayers[index] = champions.find(
        (element) => element.id == id
      ).name;
    });

    return data;
  }
  
}

export default LolApi;
