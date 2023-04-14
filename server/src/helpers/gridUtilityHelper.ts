const GridUtilityHelper = {
    getSortObject: (sortModel: any[]) => {
        return sortModel.reduce(
            (obj: any, item: any) => Object.assign(obj, { [item.field]: item.sort === 'asc' ? 1 : -1 }), {});
    }
}

export default GridUtilityHelper;