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

      slugify(string: string) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
      
        return string.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          //.replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
      }
}

export default new UtilityHelper();