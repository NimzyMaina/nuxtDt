import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export default {
  install(Vue, options) {

    const employeesHub = new Vue();
    Vue.prototype.$employeesHub = employeesHub;

    const { url } = options;

    // Provide methods to connect/disconnect from the SignalR hub
    let connection = null;
    let startedPromise = null;
    let manuallyClosed = false;

    Vue.prototype.startSignalR = (jwtToken) => {
      connection = new HubConnectionBuilder()
        .withUrl(url, jwtToken ? {accessTokenFactory: () => jwtToken} : null)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on('EmployeeUpdated', (guid) => {
        employeesHub.$emit('employee-updated', guid);
      });

      function start () {
        startedPromise = connection.start()
          .catch(err => {
            console.error('Failed to connect with hub', err);
            return new Promise((resolve, reject) => setTimeout(() => start().then(resolve).catch(reject), 5000));
          });
        return startedPromise;
      }
      connection.onclose(() => {
        if (!manuallyClosed) start()
      });

      // Start everything
      manuallyClosed = false;
      start();
    };

    Vue.prototype.stopSignalR = () => {
      if (!startedPromise) return;

      manuallyClosed = true;
      return startedPromise
        .then(() => connection.stop())
        .then(() => { startedPromise = null })
    };

  }
}
