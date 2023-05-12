import { Request } from "express";
import { MethodResult } from "src/models/shared/crud/methodResult";

class LocalizerHelper<T>{
    localize(methodResult: MethodResult<T>, req: Request){
        if(!methodResult || !methodResult?.message || typeof methodResult.message === 'undefined')
            return methodResult;
        methodResult.message = req.t(methodResult.message);
        return methodResult
    }
}

export default new LocalizerHelper()