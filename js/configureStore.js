import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { createLogger } from "redux-logger";
import { autoRehydrate, persistStore } from "redux-persist";
import { createBlacklistFilter } from "redux-persist-transform-filter";
import { AsyncStorage } from "react-native";

import reducer from "./reducers";
import promise from "./promise";

const blacklistFilter = createBlacklistFilter("rider", [
  "tripRequest",
  "trip",
  "rideCardPayment",
  "paymentOption",
  "appState.loadingStatus"
]);

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8081 });

export default function configureStore(onCompletion): any {
  const logger = createLogger();
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    autoRehydrate()
  );

  const store = createStore(reducer, enhancer);
  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: [
        "socialLogin",
        "entrypage",
        "form",
        "route",
        "trip",
        "appState",
        "viewStore",
        "rideCardPayment"
      ],
      transforms: [blacklistFilter]
    },
    onCompletion
  );

  return store;
}
