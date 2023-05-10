import { MethodResult } from "src/models/shared/crud/methodResult";

class LocalizerHelper<T>{
    localize(methodResult: MethodResult<T>, req: any){
        if(!methodResult || !methodResult?.message)
            return methodResult;
        methodResult.message = req.t(methodResult.message);
        return methodResult
    }
}

export default new LocalizerHelper()