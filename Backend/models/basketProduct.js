module.exports = (seq, Sequelize) => {
  const basketProduct = seq.define('basketProduct', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  })
  return basketProduct
}
