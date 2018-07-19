import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import {Container} from 'inversify';
import {interfaces, InversifyExpressServer, TYPE} from 'inversify-express-utils';
import {ConnectionOptions, createConnection} from 'typeorm';
import {PgConfig} from '../resource/PgConfig';
import {Account} from './account/account';
import {AccountController} from './account/account.controller';
import {AccountRepository} from './account/account.repository';
import {AccountService} from './account/account.service';
import {IndexController} from './index/index.controller';

class Bootstrap {
    private option: ConnectionOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'wellstone',
        password: 'dblab321',
        database: 'api_ts_dev',
        autoSchemaSync: true,
        entities: [Account],
    };

    public server() {
        createConnection(this.option).then((connection) => {
            this.startExpressServer();
        }).catch((err) => {
            console.log(err);
        });

    }

    public startExpressServer() {
        const container = new Container();

        container.bind<interfaces.Controller>(TYPE.Controller).to(IndexController).whenTargetNamed('IndexController');

        container.bind<interfaces.Controller>(TYPE.Controller).to(AccountController).whenTargetNamed('AccountController');
        container.bind<AccountService>('AccountService').to(AccountService);
        container.bind<AccountRepository>('AccountRepository').to(AccountRepository);

        const server = new InversifyExpressServer(container);
        server.setConfig((app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
        });

        const app = server.build();
        app.listen(3000);
        console.log('Server started on port 3000 :)');
    }

}

const bootstrap = new Bootstrap();
bootstrap.server();
