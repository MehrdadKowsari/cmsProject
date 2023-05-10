import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import UserModel, { User } from "../../security/user";
import GridUtilityHelper from "../../../helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class UserRepository{
        add = async (user: User) => await UserModel.create(user); 
        
        count = async () => await UserModel.count(); 
        
        isExistsUsername = async (id: string | null, userName: string) : Promise<boolean> => 
        {
            return id ? await UserModel.count({ userName, _id: {$ne: id}}) > 0 : await UserModel.count({ userName}) > 0;  
        }
        
        isExistsEmail = async (id: string | null, email: string) => await UserModel.count({ email, _id: {$ne: id}}) > 0; 
        
        getAll = async () => await UserModel.find(); 
        
        getAllByParams = async (gridParameter: GridParameter) : Promise<User[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.pageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await UserModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        getById = async (id: string): Promise<User | null> => await UserModel.findOne({ _id : id }); 
        
        getByUsername = async (username: string): Promise<User | null> => await UserModel.findOne({ userName : username }); 
        
        getByEmail = async (email: string): Promise<User | null> => await UserModel.findOne({ email : email }); 
        
        getByUsernameOrEmail = async (username: string, email: string): Promise<User | null> => await UserModel.findOne( {$or : [{ userName : username }, {email : email}] }); 
        
        update = async (user: User) => {
            return await UserModel.updateOne({ _id : user._id },
                { $set: { 
                    userName: user.userName,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    lastUpdateDate: user.lastUpdateDate
                }});
        }

        changePassword = async (id: string, hashedPassword: string) => await UserModel.updateOne({ _id : id },
            { $set: { 
                password: hashedPassword,
                lastUpdateDate: new Date()
            }}); 

        toggleIsActive = async (id: string, toggleIsActive: boolean) => {
            return await UserModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    lastUpdateDate: new Date()
                }}); 
        }

        delete = async (id: string) => await UserModel.deleteOne({ _id : id }); 
    }


