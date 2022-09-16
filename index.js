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
          data = "Key Inválida";
          break;

        case 429:
          data = "Rate Limit Excedido";
          break;

        case 401:
          data = "Não Autorizado";
          break;

        case 404:
          data = "Usuário Não Encontrado";
          break;
      }
      return data
    }

    if (data2.status) {
      switch (data2.status.status_code) {
        case 403:
          data2 = "Key Inválida";
          break;

        case 429:
          data2 = "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          data2 = "Não Autorizado";
          break;
      }
      return data2
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
          data = "Key Inválida";
          break;

        case 429:
          data = "Rate Limit Excedido";
          break;

        case 401:
          data = "Não Autorizado";
          break;

        case 404:
          data = "Usuário Não Encontrado";
          break;
      }
    }

    if (data2.status) {
      switch (data2.status.status_code) {
        case 403:
          data2 = "Key Inválida";
          break;

        case 429:
          data2 = "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          data2 = "Não Autorizado";
          break;
      }
      return data2
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
          data = "Key Inválida";
          break;

        case 429:
          data = "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          data = "Não Autorizado";
          break;

        case 404:
          data = "Data Não Encontrada";
          break;
      }
      return data
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

  async lastMatch(name) {
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
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data2 = await response2.json();

    const response3 = await fetch(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${data2[0]}`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data3 = await response3.json();

    if (data.status) {
      switch (data.status.status_code) {
        case 403:
          data = "Key Inválida";
          break;

        case 429:
          data = "Rate Limit Excedido";
          break;

        case 401:
          data = "Não Autorizado";
          break;

        case 404:
          data = "Usuário Não Encontrado";
          break;
      }
      return data3
    }

    if (data2.status) {
      switch (data2.status.status_code) {
        case 403:
          data3 = "Key Inválida";
          break;

        case 429:
          data3 = "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          data3 = "Não Autorizado";
          break;
      }
      return data3
    }
    
    data3.info.participants.forEach((id, index) => {
        data3.info.participants[index].championName = champions.find(
          (element) => element.id == id.championId
        ).name;
    });

    return data3
  }

  async inGame(name) {
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
      `https://br1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${data.id}`,
      {
        method: "GET",
        headers: { "X-Riot-Token": this.key },
      }
    );

    let data2 = await response2.json();

    if (data.status) {
      console.log(data.status.status_code)
      switch (data.status.status_code) {
        case '403':
          data2 = "Key Inválida";
          break;

        case '429':
          data2 = "Rate Limit Excedido";
          break;

        case '401':
          data2 = "Não Autorizado";
          break;

        case '404':
          data2 = "Usuário Não Encontrado";
          break;
      }
    }

    if (data2.status) {
      switch (data2.status.status_code) {
        case 403:
          data2 = "Key Inválida";
          break;

        case 429:
          data2 = "Rate Limit Excedido Aguarde Alguns Minutos";
          break;

        case 401:
          data2 = "Não Autorizado";
          break;

        case 404:
          data2 = 'Usuário Não Está Em Partida'
          break;
      }
    }

    return data2

  }

}

export default LolApi;