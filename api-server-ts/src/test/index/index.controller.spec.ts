import 'mocha';
import * as Chai from 'chai';
import {IndexController} from "../../main/index/index.controller";

const expect: Chai.ExpectStatic = Chai.expect;

describe('Index Controller Specs', () => {
    let controller: IndexController;

    beforeEach(() => {
        controller = new IndexController();
    });

    describe('GET /', () => {
        it('Get Index Page', (done: MochaDone) => {
            expect(controller.index()).to.equal('index page');
            done();
        });
    });
});
