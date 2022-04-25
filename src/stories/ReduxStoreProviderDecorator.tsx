import {Provider} from "react-redux";
import {store} from "../State/Store";

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>{storyFn()}</Provider>
}