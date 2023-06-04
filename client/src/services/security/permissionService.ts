import { PermissionDTO } from "src/models/security/permission/permissionDTO";
import { PermissionTypeEnum } from "src/models/shared/enums/permissionTypeEnum";

class PermissionService{
    hasPermission(permissions: PermissionDTO[], permission: PermissionTypeEnum): boolean{
        if (!permissions || permissions.length === 0) {
            return false;
        }
        return permissions.some(p => p.type === permission);
    }
}

export default new PermissionService();