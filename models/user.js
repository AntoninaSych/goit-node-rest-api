const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const User = sequelize.define("User", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subscription: {
        type: DataTypes.ENUM("starter", "pro", "business"),
        defaultValue: "starter",
    },
    avatarURL: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "users"
});

module.exports = User;
