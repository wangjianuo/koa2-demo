
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user',
        {
            userId: {
                field: 'user_id',
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userName: {
                field: 'user_name',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            userPwd: {
                field: 'user_pwd',
                type: DataTypes.STRING(255),
                allowNull: false
            },
            userDelFlag: {
                field: 'user_del_flag',
                type: DataTypes.INTEGER(10),
                allowNull: false
            }
        }, {
            tableName: 'tbl_user'
        }
    )
}
