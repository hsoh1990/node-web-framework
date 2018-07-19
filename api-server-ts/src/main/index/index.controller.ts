import "reflect-metadata";

import { injectable } from 'inversify';
import {controller, httpGet, interfaces} from 'inversify-express-utils';

@injectable()
@controller('/')
export class IndexController implements interfaces.Controller {

    @httpGet('/')
    public index(): string {
        return 'index page';
    }

}
