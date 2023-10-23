module.exports = (seq, Sequelize) => {
  const order = seq.define('order', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    amount_total: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false
    },
    customer_details: {
      type: Sequelize.JSON,
      defaultValue: {}
    },
    product_details: {
      type: Sequelize.JSON,
      defaultValue: {}
    }
  })
  return order
}
