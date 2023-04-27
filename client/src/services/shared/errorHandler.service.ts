import { MethodError } from "../../models/shared/crud/methodError";
import { MethodResult } from "../../models/shared/crud/methodResult";
import { CRUDResultEnum } from "../../models/shared/enums/crudResultEnum";
import NotificationService from "../notificationService"
import CommonMessage from "../../constants/commonMessage";
import React, { ReactNode } from "react";

class ErrorHandlerService {
    ShowErrorMessage(methodResult: MethodResult<any>) {
        if (methodResult.type) {
            switch (methodResult.type) {
                case CRUDResultEnum.UnknownError:
                    {
                        NotificationService.showErrorMessage();
                        break;
                    }
                case CRUDResultEnum.Error:
                    {
                        if (methodResult.result.Errors != null) {
                            let errorMessages = '';
                            methodResult.result.Errors.forEach((value: any) => {
                                errorMessages += `${value.Description}\n`;
                            });
                            
                            NotificationService.showErrorMessage(errorMessages);
                        }
                        else {
                            NotificationService.showErrorMessage(methodResult.message);
                        }
                        break;
                    }
                case CRUDResultEnum.SuccessWithWarning:
                    {
                        if (methodResult.result.Errors !== null) {
                            let errorMessages = '';
                            methodResult.result.Errors.forEach((value: any) => {
                                errorMessages += `${value.Description}\n`;
                            });

                            NotificationService.showWarningMessage(`${CommonMessage.Warning}`, errorMessages, 10000);
                        }
                        else {
                            NotificationService.showWarningMessage(`${CommonMessage.Warning}`, methodResult.result.message, 10000);
                        }
                        break;
                    }
                case CRUDResultEnum.AccessDenied:
                    {
                        NotificationService.showErrorMessage(`${CommonMessage.DoNotHaveAccessToThisActionOrSection}`);
                        break;
                    }
                default:
                    {
                        NotificationService.showErrorMessage();
                        break;
                    }
            }
        }
        else {
            NotificationService.showErrorMessage();
        }
    }

    ShowAndGetErrorMessage(methodResult: MethodResult<any>): MethodError[] {
        const erroMessages: MethodError[] = [];
        if (methodResult.result && methodResult.result.Type) {
            switch (methodResult.result.Type) {
                case CRUDResultEnum.UnknownError:
                    {
                        NotificationService.showErrorMessage();
                        const description: string = `${CommonMessage.UnknownErrorHappened}`;
                        erroMessages.push({
                            Code: 1,
                            Title: `${CommonMessage.Error}`,
                            Description: description
                        } as MethodError);
                        NotificationService.showErrorMessage(description);
                        break;
                    }
                case CRUDResultEnum.Error:
                    {
                        if (methodResult.result.Errors !== null) {
                            NotificationService.showErrorMessage();
                            methodResult.result.Errors.forEach((value: any, index: number) => {
                                erroMessages.push({
                                    Code: index + 1,
                                    Title: value.Title !== value.Description ? value.Title : `${CommonMessage.Error}`,
                                    Description: value.Description
                                }as MethodError);
                            });
                        }
                        else {
                            NotificationService.showErrorMessage(methodResult.result.Message);
                            erroMessages.push({
                                Code: 1,
                                Title: `${CommonMessage.Error}`,
                                Description: methodResult.result.Message
                            }as MethodError);
                        }
                        break;
                    }
                case CRUDResultEnum.SuccessWithWarning:
                    {
                        if (methodResult.result.Errors !== null) {
                            methodResult.result.Errors.forEach((value: any, index: number) => {
                                erroMessages.push({
                                    Code: index + 1,
                                    Title: value.Title !== value.Description ? value.Title : `${CommonMessage.Warning}`,
                                    Description: value.Description
                                }as MethodError);
                            });
                            NotificationService.showWarningMessage();
                        }
                        else {
                            NotificationService.showWarningMessage(`${CommonMessage.Warning}`, methodResult.result.Message, 10000);
                            erroMessages.push({
                                Code: 1,
                                Title: `${CommonMessage.Warning}`,
                                Description: methodResult.result.Message
                            }as MethodError);
                        }
                        break;
                    }
                case CRUDResultEnum.AccessDenied:
                    {
                        NotificationService.showErrorMessage(`${CommonMessage.DoNotHaveAccessToThisActionOrSection}`);
                        erroMessages.push({
                            Code: 1,
                            Title: `${CommonMessage.Error}`,
                            Description: `${CommonMessage.DoNotHaveAccessToThisActionOrSection}`
                        }as MethodError);
                        break;
                    }
                default:
                    {
                        const description: string = `${CommonMessage.UnknownErrorHappened}`;
                        erroMessages.push({
                            Code: 1,
                            Title: `${CommonMessage.Error}`,
                            Description: description
                        }as MethodError);
                        NotificationService.showErrorMessage();
                        break;
                    }
            }
        }
        else {
            const description: string = `${CommonMessage.UnknownErrorHappened}`;
            erroMessages.push({
                Code: 1,
                Title: `${CommonMessage.Error}`,
                Description: description
            }as MethodError);
            NotificationService.showErrorMessage();
        }
        return erroMessages;
    }

    GetErrorElement(methodErrors: MethodError[]): ReactNode {
        let ul = React.createElement('ul', { style: { listStyleType: "square", padding: 10, margin: 10 } }, methodErrors.map((p, index) => (React.createElement('li', {key: index}, p.Description))));
        return ul; 
    }
}



export default new ErrorHandlerService();