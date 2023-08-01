const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        userTypes: {
            type : DataTypes.ENUM('doctor', 'normal'),
        },
        latitude: {
            type: DataTypes.FLOAT
        },
        longitude: {
            type: DataTypes.FLOAT
        }
    });

    User.associate= module => {
        User.hasOne(module.profile);
    }
    
    return User;
}

export default user;