//app.js
import wxMqtt from './utils/mqtt/wxMqtt'
import { Provider } from './libs/wechat-weapp-redux.min';
import { configStore } from './utils/store/store';

const store = configStore();

App(Provider(store)({
  onLaunch: async function() {
  }
}))