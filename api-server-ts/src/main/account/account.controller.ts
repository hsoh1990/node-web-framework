import {inject, injectable} from 'inversify';
import {controller, httpDelete, httpGet, httpPost, httpPut, requestBody, requestParam} from 'inversify-express-utils';
import {AccountRegisterDto, AccountResponseDto} from './account.dto';
import {AccountService} from './account.service';

@injectable()
@controller('/accounts')
export class AccountController {

    @inject('AccountService') private accountService: AccountService;

    @httpPost('/')
    public postAccount(@requestBody() account: AccountRegisterDto) {
        return this.accountService.register(account);
    }

    @httpGet('/')
    public async getAccounts(): Promise<AccountResponseDto[]> {
        return await this.accountService.getAccounts();
    }

    @httpGet('/:id')
    public async getAccount(@requestParam('id') id: string): Promise<AccountResponseDto> {
        return await this.accountService.getAccount(id);
    }

    @httpPut('/:id')
    public async putAccount(@requestParam('id') id: string, @requestBody() account: AccountRegisterDto): Promise<AccountResponseDto> {
        return await this.accountService.putAccount(id, account);
    }

    @httpDelete('/:id')
    public async deleteAccount(@requestParam('id') id: string): Promise<AccountResponseDto> {
        return await this.accountService.deleteAccount(id);
    }
}
