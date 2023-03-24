import { PermissionsEnum } from "../../shared/enums/permissionEnum";

export class PermissionDTO {
    public Id: PermissionsEnum;
    public LatinName: string;
    public PersianName: string;
    public PermDescription: string;
}
