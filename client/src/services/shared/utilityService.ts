import { TextValueDTO } from "src/models/shared/list/textValueDTO";

class UtilityService {
    getTextValueListByEnum<T>(enumType: object, enumLabelMapping: any): TextValueDTO[] {
        const pageTypes: TextValueDTO[] = Object.values(enumType).filter(p => typeof p === 'number').map(p => (<TextValueDTO>{
            text: p,
            value: enumLabelMapping[p]
        }));
        return pageTypes;
    }
}
export default new UtilityService();