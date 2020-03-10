//
//
//
// INTEGRATION TESTS FOR ORBB WATCHER GAMES.LOG
//

import request from 'supertest';
import { matchers } from 'jest-json-schema';
import app from '../src/app';

expect.extend(matchers);

describe('ORBB WATCHER PARSER', () => {
  //
  //
  //
  // GET PARSER
  //
  it('WORKS! Parse GAMES.LOG', async () => {
    const schema = {
      properties: {
        game: { type: 'object' },
      },
      required: ['game'],
    };

    const res = await request(app).get('/parser');
    expect(res.body).toMatchSchema(schema);
  });
  //
  //
  //
  // POST MATCH
  //
  it('must return match info', async () => {
    const schema = {
      properties: {
        match_number: { type: 'number' },
        match_datetime: { type: 'string' },
        capture_limit: { type: 'number' },
        frag_limit: { type: 'number' },
        time_limit: { type: 'number' },
        server: { type: 'string' },
      },
      required: [
        'match_number',
        'match_datetime',
        'capture_limit',
        'frag_limit',
        'time_limit',
        'server',
      ],
    };

    const res = await request(app)
      .post('/match')
      .send({ match_number: 1 });
    expect(res.body).toMatchSchema(schema);
  });
  //
  //
  //
  // GET PLAYERS
  //
  it('must return all players of log', async () => {
    const schema = {
      properties: {
        player: { type: 'string' },
      },
      required: ['player'],
    };

    const res = await request(app).get('/players');
    expect(res.body).toMatchSchema(schema);
  });
  //
  //
  //
  // GET MAPS
  //
  it('must show all maps', async () => {
    const schema = {
      properties: {
        map: { type: 'string' },
      },
      required: ['map'],
    };

    const res = await request(app).get('/maps');
    expect(res.body).toMatchSchema(schema);
  });
  //
  //
  //
  // GET RANKING
  //
  it('should return players ranking', async () => {
    const schema = {
      properties: {
        player: { type: 'string' },
        frags: { type: 'string' },
      },
      required: ['player', 'frags'],
    };

    const res = await request(app).get('/ranking');
    expect(res.body).toMatchSchema(schema);
  });
});
