import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  id: string;
  email: string;
  password: string;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersCreationAttributes = usersAttributes;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: string;
  email!: string;
  password!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(2000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
