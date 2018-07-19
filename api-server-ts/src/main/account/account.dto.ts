export class AccountDto {
    public id: number;
    public email: string;
    public passwd: string;
}

export class AccountRegisterDto {
    public email: string;
    public passwd: string;
}

export class AccountResponseDto {
    public id: number;
    public email: string;
}
