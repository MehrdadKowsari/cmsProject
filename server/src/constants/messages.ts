export default class Message {
    public static readonly Success = 'Success';
    public static readonly Error = 'Error';
    public static readonly SuccessOperation: string = 'Operation Completed Successfully';
    public static readonly SuccessWithWarningOperation: string = 'Operation Completed With Warnings Successfully';
    public static readonly ConfirmOperation: string = 'Do You Confirm The Operation?';
    public static readonly ErrorOperation: string = 'Operation Completed With Error';
    public static readonly WarningOperation: string = 'Operation Completed With Warnings';
    public static readonly UnknownErrorHappened: string = 'Unknown Error Happened';
    public static readonly InfoOperation: string = 'Info Operation';
    public static readonly AdressNotFound: string = 'Adress Not Found';
    public static readonly ModelIsNotValid: string = 'Model Is Not Valid';
    public static readonly TokenExpired: string = 'Token Expired';
    public static readonly ThisLoginTypeIsNotPossible: string = 'This Login Type Is Not Possible';
    public static readonly UserIsNotActive: string = 'User Is Not Active';
    public static readonly UsernameOrPasswordIsIncorect: string = 'Username Or Password Is Incorect';
    public static readonly UserDoesNotExist: 'User Does Not Exist';
    public static readonly UserNameAlreadyExists: 'UserName Already Exists';
    public static readonly EmailAlreadyExists: 'Email Already Exists';
    public static readonly ConfirmPasswordDoesNotMatch:string = 'Confirm Password Does Not Match';
    public static readonly PasswordDoesNotMatch:string = 'Password Does Not Match';
}