import { GridParameter } from "src/dtos/shared/grid/gridPrameter";
import UserModel, { User } from "../../security/user";
import GridUtilityHelper from "../../../helpers/gridUtilityHelper";
import AppConstant from "src/constants/appConstants";


    export default class UserRepository{
        /**
         * add user
         * 
         * @param {object} user 
         * @returns {Promis<object>}
         */
        add = async (user: User) => await UserModel.create(user); 
        
        /**
         * count users
         * 
         * @returns {Promise<number>}
         */
        count = async (): Promise<number> => await UserModel.count(); 
        
        /**
         * is user exists user by username
         * 
         * @param {string | null} id 
         * @param {string} userName 
         * @returns {Promise<boolean>}
         */
        isExistsUsername = async (id: string | null, userName: string) : Promise<boolean> => 
        {
            return id ? await UserModel.count({ userName, _id: {$ne: id}}) > 0 : await UserModel.count({ userName}) > 0;  
        }
        
        /**
         * is user exists user by email
         * 
         * @param {string | null} id 
         * @param {string} userName 
         * @returns {Promise<boolean>}
         */
        isExistsEmail = async (id: string | null, email: string): Promise<boolean> => await UserModel.count({ email, _id: {$ne: id}}) > 0; 
        
        /**
         * get all users
         * 
         * @returns {Promise<User[]>}
         */
        getAll = async () => await UserModel.find(); 
        
        /**
         * get all users by parameters
         * 
         * @param {object} gridParameter 
         * @returns {Promise<User[]>}
         */
        getAllByParams = async (gridParameter: GridParameter) : Promise<User[]> =>{
            const { currentPage, pageSize, sortModel } = gridParameter;
            const limitCount: number = (pageSize || AppConstant.pageSize);
            const skipCount = (currentPage || 0) * limitCount;           
            const sort = GridUtilityHelper.getSortObject(sortModel);
            const list = await UserModel.find().sort(sort).skip(skipCount).limit(limitCount);
            return list;
        }  
        
        /**
         * get user by id
         * 
         * @param {string} id 
         * @returns {Promise<User | null>}
         */
        getById = async (id: string): Promise<User | null> => await UserModel.findOne({ _id : id }); 
        
        /**
         * get user by usename
         * 
         * @param {string} username 
         * @returns {Promise<User | null>}
         */
        getByUsername = async (username: string): Promise<User | null> => await UserModel.findOne({ userName : username }); 
        
        /**
         * get user by email
         * 
         * @param {string} email 
         * @returns {Promise<User | null>}
         */
        getByEmail = async (email: string): Promise<User | null> => await UserModel.findOne({ email : email }); 
        
        /**
         * get user by username or email
         * 
         * @param {string} username 
         * @param {string} email 
         * @returns {Promise<User | null>}
         */
        getByUsernameOrEmail = async (username: string, email: string): Promise<User | null> => await UserModel.findOne( {$or : [{ userName : username }, {email : email}] }); 
        
        /**
         * update user
         * 
         * @param {object} user 
         * @returns {Promise<object>}
         */
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

        /**
         * change password
         * 
         * @param {string} id 
         * @param {string} hashedPassword 
         * @returns {Promise<object>}
         */
        changePassword = async (id: string, hashedPassword: string) => await UserModel.updateOne({ _id : id },
            { $set: { 
                password: hashedPassword,
                lastUpdateDate: new Date()
            }}); 
        
        /**
         * toggle user active status
         * 
         * @param {string} id 
         * @param {boolean} toggleIsActive 
         * @returns {Promise<object>}
         */
        toggleIsActive = async (id: string, toggleIsActive: boolean) => {
            return await UserModel.updateOne({_id: id}, 
                { $set: { 
                    isActive: toggleIsActive,
                    lastUpdateDate: new Date()
                }}); 
        }

        /**
         * delete user by id
         * 
         * @param {string} id 
         * @returns {Promise<object>}
         */
        delete = async (id: string) => await UserModel.deleteOne({ _id : id }); 
    }


