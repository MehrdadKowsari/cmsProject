class UtilityHelper{
    getKeyByValue(object: object,value: string) {
        const indexOfS = Object.values(object).indexOf(value as unknown as object);
      
        const key = Object.keys(object)[indexOfS];
      
        return key;
      }
}

export default new UtilityHelper();