import {inject, injectable} from 'inversify';
import {Account} from './account';
import {AccountRegisterDto, AccountResponseDto} from './account.dto';
import {AccountRepository} from './account.repository';

@injectable()
export class AccountService {

    @inject('AccountRepository') private accountRepository: AccountRepository;

    public async register(accountDto: AccountRegisterDto): Promise<Account> {
        const account = await new Account();
        account.email = accountDto.email;
        account.passwd = accountDto.passwd;

        return this.accountRepository.save(account);
    }

    public async getAccounts(): Promise<AccountResponseDto[]> {
        const accounts: Account[] = await this.accountRepository.findAll();
        const accountResponseDto: AccountResponseDto[] = [];

        for (const account of accounts) {
            const accountResp = new AccountResponseDto();
            accountResp.id = account.id;
            accountResp.email = account.email;
            accountResponseDto.push(accountResp);
        }

        return accountResponseDto;
    }

    public async getAccount(id: string): Promise<AccountResponseDto> {
        const account: Account = await this.accountRepository.findById(id);
        const accountResponseDto: AccountResponseDto = new AccountResponseDto();
        if (account) {
            accountResponseDto.id = account.id;
            accountResponseDto.email = account.email;
        }
        return accountResponseDto;
    }

    public async putAccount(id: string, account: AccountRegisterDto): Promise<AccountResponseDto> {
        const accountToUpdate: Account = await  this.accountRepository.findById(id);
        accountToUpdate.email = account.email;
        accountToUpdate.passwd = account.passwd;

        return this.accountRepository.save(accountToUpdate);
    }

    public async deleteAccount(id: string): Promise<Account> {
        const accountToDelete: Account = await this.accountRepository.findById(id);
        return this.accountRepository.remove(accountToDelete);
    }
}
