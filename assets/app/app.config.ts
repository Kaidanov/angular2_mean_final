/**
 * Created by Tzvika on 12/2/2016.
 */
// import { OpaqueToken } from "@angular/core";
//
// export let APP_CONFIG = new OpaqueToken("app.config");
//
// export interface IAppConfig {
//     apiEndpoint: string;
// }
//
// export const AppConfig: IAppConfig = {
//     apiEndpoint: "http://localhost:15422/api/"
// };
//

export class AppConfig {

    public static getEnvironmentVariable(value) {
        var environment:string;
        var data = {};
        environment = window.location.hostname;
        switch (environment) {
            case'localhost':
                data = {
                    endPoint: 'http://localhost:3000/'
                };
                break;
            case 'kaidanov-angular2-mean.herokuapp.com':
                data = {
                    endPoint: 'https://kaidanov-angular2-mean.herokuapp.com/'
                };
                break;

            case 'LowCost-env.ppiw7txwdp.us-west-2.elasticbeanstalk.com':
                data = {
                    endPoint: 'https://LowCost-env.ppiw7txwdp.us-west-2.elasticbeanstalk.com/'
                };
                break;
            default:
                data = {
                    endPoint: 'https://kaidanov-angular2-mean.herokuapp.com/'
                };
        }
        return data[value];
    }
}