import { BaseModel } from "../../shared/base/baseModel";


export class AddOwnerDTO extends BaseModel{
  public Name: string;
  public Family: string;
  public InternationalNumber: string;
  public PersonalEmail: string;
  public PersonalEmailConfirm: string;
  public PhoneNumber: string;
  public UserName: string;
  public PostalAddress: string;
  public Password: string;
  public PasswordConfirm: string;

  public OwnerCode: string;
  public OwnerName: string;
  public OwnerPrefixName: string;
  public OwnerDescription: string;

  public RoleName: string;
  public FinanceYearGroupTitle: string;
  public FinanceYearTitle: string;
  public SubSystemIds: any[];
}

