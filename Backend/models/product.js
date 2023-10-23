module.exports = (seq, Sequelize) => {
  const product = seq.define('product', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    imageUrl: {
      type: Sequelize.STRING
    }
  })
  return product
}
