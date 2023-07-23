class UtilityHelper{
    getKeyByValue(object: object,value: string) {
        const indexOfS = Object.values(object).indexOf(value as unknown as object);
      
        const key = Object.keys(object)[indexOfS];
      
        return key;
      }

      isImagePath(src: string) {
        const modifySrc = src.toLowerCase();
        const isCorrectPath =
          modifySrc.includes(".png") ||
          modifySrc.includes(".jpg") ||
          modifySrc.includes(".jpeg");
        return isCorrectPath;
      }
}

export default new UtilityHelper();