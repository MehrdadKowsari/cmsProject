export default class CommonMessage {
    public static readonly Success = 'Success';
    public static readonly Error = 'Error';
    public static readonly Warning = 'Warning';
    public static readonly Info = 'Info';
    public static readonly Confirm = 'Confirm';
    public static readonly Yes = 'Yes';
    public static readonly No = 'No';
    public static readonly Cancel = 'Cancel'
    public static readonly Close = 'Close'
    public static readonly SuccessOperation: string = 'Operation Completed Successfully';
    public static readonly SuccessWithWarningOperation: string = 'Operation Completed With Warnings Successfully';
    public static readonly ConfirmOperation: string = 'Do You Confirm The Operation?';
    public static readonly ErrorOperation: string = 'Operation Completed With Error';
    public static readonly WarningOperation: string = 'Operation Completed With Warnings';
    public static readonly UnknownErrorHappened: string = 'Unknown Error Happened';
    public static readonly InfoOperation: string = 'Info Operation';
    public static readonly AdressNotFound: string = 'Adress Not Found';
    public static readonly ModelIsNotValid: string = 'Model Is Not Valid';
    public static readonly Progress: string = 'Progress';
    public static readonly Loading: string = 'Lading ...';
    public static readonly ServerSideErrorHappended: string = 'Server Side Error Happended'
    public static readonly Page = 'Page';
    public static readonly Code: string = 'Code';
    public static readonly Title: string = 'Title';
    public static readonly Type: string = 'Type';
    public static readonly Parent: string = 'Parent';
    public static readonly Description: string = 'Description';
    public static readonly Locale: string = 'Local Code';
    public static readonly IconClass: string = 'Icon Class';
    public static readonly LastModifiedDate: string = 'Last Modified Date';
    public static readonly Actions: string = 'Actions';
    public static readonly Status: string = 'Status';
    public static readonly Date: string = 'Date';
    public static readonly Name: string = 'Name';
    public static readonly Attachment: string = 'Attachment';
    public static readonly Download: string = 'Download';
    public static readonly Preview: string = 'Preview';
    public static readonly Priority: string = 'Priority';
    public static readonly FullName: string = 'FullName';
    public static readonly Username: string = 'Username';
    public static readonly User: string = 'User';
    public static readonly Role: string = 'Role';
    public static readonly Permission: string = 'Permission';
    public static readonly Password: string = 'Password';
    public static readonly ConfirmPassword: string = 'Confirm Password';
    public static readonly OperationType: string = 'OperationType';
    public static readonly Detail: string = 'Detail';
    public static readonly Edit: string = 'Edit';
    public static readonly IsActive: string = 'Is Active';
    public static readonly IsHidden: string = 'Is Hidden';
    public static readonly StartDate: string = 'Start Date';
    public static readonly EndDate: string = 'End Date';
    public static readonly PostalCode: string = 'PostalCode';
    public static readonly Address: string = 'Address';
    public static readonly Website: string = 'Website';
    public static readonly Tel: string = 'Tel';
    public static readonly Mobile: string = 'Mobile';
    public static readonly Fax: string = 'Fax';
    public static readonly Property: string = 'Property';
    public static readonly Amount: string = 'Amount';
    public static readonly SelectRow: string = 'Select Row';
    public static readonly LastName: string = 'Last Name';
    public static readonly FirstName: string = 'First Name';
    public static readonly Image: string = 'Image';
    public static readonly Email: string = 'Email';
    public static readonly PhoneNumber: string = 'Phone Number';
    public static readonly Select: string = 'Select';
    public static readonly Hour: string = 'Hour';
    public static readonly Minute: string = 'Minute';
    public static readonly Day: string = 'Day';
    public static readonly StartFromDate: string = 'From Date';
    public static readonly EndToDate: string = 'To Date';
    public static readonly Search = 'Search';
    public static readonly Print = 'Print';
    public static readonly ShowHide: string = 'Show/Hide';
    public static readonly AcceptableMaxFileSize: string = `Acceptable Max File Size:`;
    public static readonly Help: string = 'Help';    
    public static readonly ImportFromFile = 'Import From File';
    public static readonly To: string = 'To';
    public static readonly From: string = 'From';
    public static readonly Current: string = 'Current';
    public static readonly PageSize: string = 'Page Size';
    public static readonly New: string = 'New';  
    public static readonly Save: string = 'Save';
    public static readonly Update: string = 'Update';
    public static readonly Add: string = 'Add';
    public static readonly Clear: string = 'Clear';
    public static readonly Reset: string = 'Reset';
    public static readonly Delete: string = 'Delete';
    public static readonly Items: string = 'Items';
    public static readonly Hotkeys: string = 'Hotkeys';
    public static readonly RequiredFiled: string = 'This Field Is Required';
    public static readonly FiledFormatIsInvalid: string = 'Filed Format Is Invalid';
    public static readonly ToggleActive: string = 'Active/InActive';  
    public static readonly ToggleHidden: string = 'Show/Hide';  
    public static readonly DateDidNotEnterCorrectly: string = 'Date Did Not Enter Correctly';
    public static readonly NoFileSelected: string = 'No File Selected';
    public static readonly AnyDataDidNotEnter: string = 'Any Data Did Not Enter';
    public static readonly ThisFieldDidNotEnterCorrectly: string = 'This Field Did Not Enter Correctly';
    public static readonly StartFromDateShouldNotBeGreaterThanEndToDate: string = 'Start From Date Should Not Be Greater Than End To Date';
    public static readonly NoRowSelected: string = 'No Row Selected';
    public static readonly NoDataExist: string = 'No Data Exist';
    public static readonly DoNotHaveAccessToPage: string = 'You Do Not Have Access To This Page';
    public static readonly DoNotHaveAccessToThisActionOrSection: string = 'You Do Not Have Access To This Action Or Section';
    public static readonly FormDataIsInvalid: string = 'Form Data Is Invalid';
    public static readonly MinLenghtForThisFieldIsN = (n: number): string => `Min Lenght for This Field Is ${n}`;
    public static readonly MaxLenghtForThisFieldIsN = (n: number): string => `Max Lenght for This Field Is ${n}`;
    public static readonly View: string = 'View';
    public static readonly Publish: string = 'Publish';
    public static readonly Unpublish: string = 'Unpublish';
    public static readonly Reject: string = 'Reject';
    public static readonly Export: string = 'Export';
    public static readonly Import: string = 'Import';
    public static readonly ViewComment: string = 'View Comment';
    public static readonly AddComment: string = 'Add Comment';
    public static readonly ReplyComment: string = 'Reply Comment';
    public static readonly Tag: string = 'Tag';
    public static readonly PostCategory: string = 'Post Category';
    public static readonly GalleryCategory: string = 'Gallery Category';
    public static readonly SliderItem: string = 'Slider Item';
    public static readonly SectionName: string = 'Section Name';
    public static readonly AllowedFileExtension: string = 'Allowed File Extension';
    public static readonly Params: string = 'Params';
    public static readonly List: string = 'List';
    public static readonly FileExtension: string = 'File Extension';
    public static readonly Url: string = 'Url';
    public static readonly LinkUrl: string = 'Url';
    public static readonly LinkTarget: string = 'Link Target';
    public static readonly OpenInTheSameWindow: string = 'Open In The Same Window';
    public static readonly OpenINNewWindow: string = 'Open IN New Window';
    public static readonly File: string = 'File';
    public static readonly UploadAFile: string = 'Upload A File';
}