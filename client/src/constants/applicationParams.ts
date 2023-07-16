export default class ApplicationParams {
    public static readonly DefaultLanguageCode:string = 'en';
    public static readonly GridPageSize:number[] = [10,30,50,100];
    public static readonly UsernameMinLenght:number = 3;
    public static readonly UsernameMaxLenght:number = 50;
    public static readonly PostTitleMaxLenght:number = 1000;
    public static readonly NameMaxLenght:number = 100;
    public static readonly DescriptionMaxLenght:number = 500;
    public static readonly PasswordMinLenght:number = 6;
    public static readonly GridDefaultHeight:number = 400;
    public static readonly GridDefaultPageSize:number = 10;
    public static readonly GridDefaultSortColumn:string = '_id';
    public static readonly GridDefaultSortDirection: 'asc' | 'desc' | null | undefined = 'desc';
    
}