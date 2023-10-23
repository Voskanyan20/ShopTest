module.exports = (seq, Sequelize) => {
  const basket = seq.define('basket', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  })
  return basket
}
