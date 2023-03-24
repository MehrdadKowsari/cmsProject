export class ChangeUserPasswordDTO {
    public password: string;
    public passwordConfirm: string;
    public currentPassword: string;
    public userId: number;
}
