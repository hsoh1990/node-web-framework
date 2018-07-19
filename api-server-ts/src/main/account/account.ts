import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public passwd: string;

    @Column()
    public email: string;
}
