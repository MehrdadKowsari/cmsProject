import { PermissionDTO } from "src/models/security/permission/permissionDTO";

export type FormProps  = {
    id: string | number | null;
    permissions: PermissionDTO[],
    onClose: () => void,
    locale?: string | null;
}