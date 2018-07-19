import {injectable} from 'inversify';
import {getEntityManager, Repository} from 'typeorm';
import {Account} from './account';

@injectable()
export class AccountRepository {
    private accountConnector: Repository<Account> = getEntityManager().getRepository(Account);

    public async save(account: Account): Promise<Account> {
        return await this.accountConnector.save(account);
    }

    public async findAll(): Promise<Account[]> {
        return this.accountConnector.find();
    }

    public async findById(id: string): Promise<Account> {
        return this.accountConnector.findOneById(id);
    }

    public async remove(account: Account): Promise<Account> {
        return this.accountConnector.remove(account);
    }
}
