import { watchSearchNovels } from "../../src/sagas/novel";
import { take, call } from "redux-saga/effects";
import { fetchNovels } from "../../src/actions/novel";
import { queryNovels } from "../../src/services/novelapi";

test("watchSearchNovels Saga test", () => {
  const gen = watchSearchNovels();

  expect(gen.next().value).toEqual(take(fetchNovels));
  expect(gen.next().value).toEqual(call(queryNovels));
});
