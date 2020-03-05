//
// ORBB, THE WATCHER
// PARSE READER OF Q3ARENA GAME LOGS
// created by: Carlos Augusto Massucato, aka shakma
//
class OrbbLogParser {
  //
  //
  //
  // CONSTRUCTOR
  //
  //
  constructor() {
    this.matches = [];
  }

  //
  //
  //
  // ORBB WATCHER PLAYERS FUNCTION
  //
  //
  watchPlayers(matches, line) {
    //
    // GET PLAYER NAME
    //
    const line_begin = line.indexOf('n\\');
    const line_end = line.indexOf('\\t') - 1;
    const line_chars = line_end - line_begin;
    let player = line.trim().substr(line_begin, line_chars);
    player = player.replace(/\\/g, '');
    //
    // POPULATE PLAYERS AND PLAYERS FRAG COUNT
    //
    if (matches[matches.length - 1].game.players.indexOf(player) === -1) {
      matches[matches.length - 1].game.players.push(player);
      matches[matches.length - 1].game.frags[player] = 0;
    }
  }

  //
  //
  //
  // ORBB WATCHER PLAYER FRAG FUNCTION
  //
  //
  watchPlayerFrag(line, fragby) {
    //
    // FRAG
    //
    const frag = { player: undefined, fragmessage: undefined };
    //
    // FRAGGED BY WORLD ?
    if (fragby === 'world') {
      //
      // LINE STRING EXPLODE INFO
      //
      let player = line[0].substr(line[0].indexOf('killed'));
      player = player.substr(7, player.indexOf('by'));
      player = player.split('by');
      player = player[0].trim();
      //
      // SET ARRAY WITH PLAYER AND MESSAGE
      //
      const fraggstring = `${player} killed by <world>`;
      frag.player = player;
      frag.fragmessage = fraggstring;
      //
      //
    } else {
      //
      // LINE STRING EXPLODE INFO
      //
      let player = line[0].substr(line[0].lastIndexOf(':')).substr(2);
      player = player.slice(0, player.indexOf('killed')).trim();
      let killed = line[0].substr(line[0].lastIndexOf('killed')).substr(7);
      killed = killed.slice(0, killed.indexOf('by')).trim();
      //
      // SET ARRAY WITH PLAYER AND MESSAGE
      //
      const fraggstring = `${player} frag ${killed}`;
      frag.player = player;
      frag.fragmessage = fraggstring;
    }

    return frag;
  }

  //
  //
  //
  // ORBB WATCHER FRAG FUNCTION
  //
  //
  watchFrag(matches, line) {
    //
    // TOTAL FRAGS
    //
    matches[matches.length - 1].game.total_frags += 1;

    //
    // PLAYER TYPE
    //
    if (line[0].includes('<world>')) {
      //
      // <WORLD> FRAGS
      //
      const fragged = this.watchPlayerFrag(line, 'world');
      matches[matches.length - 1].game.frags[fragged.player] -= 1;
    } else {
      //
      // FRAGGER KILLS
      //
      const fragger = this.watchPlayerFrag(line, 'player');
      matches[matches.length - 1].game.frags[fragger.player] += 1;
    }
  }

  //
  //
  //
  // ORBB WATCHER INITGAME FUNCTION
  //
  //
  watchInitGame(matches, pLine, pGameCount) {
    //
    // const game = `game_${pGameCount}`;
    // POPULATE MATCHES ARRAY
    //
    matches.push({
      game: {
        match_number: pGameCount,
        total_frags: 0,
        players: [],
        frags: {},
      },
    });
  }

  //
  //
  //
  // INIT
  //
  //
  watcher(gamelog) {
    //
    // SPLIT GAMELOG LINES
    //
    const loglines = gamelog.toString().split(/[\n]/);

    //
    // MATCHES START
    //
    const matches = [];
    let matchcount = 0;

    //
    // MAPPING GAMELOG
    //
    loglines.map(logline => {
      const arr_logline = logline.trim().split(/[\\]/);
      const lineAction = arr_logline[0].split(' ');

      //
      // LOGLINE ACTION TYPES
      //
      switch (lineAction[1]) {
        //
        // MAP INITGAMES
        //
        case 'InitGame:':
          matchcount += 1;
          this.watchInitGame(matches, arr_logline, matchcount);
          break;
        //
        // MAP PLAYERS
        //
        case 'ClientUserinfoChanged:':
          this.watchPlayers(matches, logline);
          break;
        //
        // MAP KILL
        //
        case 'Kill:':
          this.watchFrag(matches, arr_logline);
          break;
        default:
          break;
      }

      return null;
    });

    return matches;
  }
}

export default new OrbbLogParser();
