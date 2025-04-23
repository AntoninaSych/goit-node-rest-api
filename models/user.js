const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelize");

const User = sequelize.define("user", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subscription: {
        type: DataTypes.ENUM("starter", "pro", "business"),
        defaultValue: "starter"
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null
    }
}, {
    timestamps: true
});

module.exports = User;
