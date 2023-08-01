const profile = (sequelize, DataType) => {
  const profile = sequelize.define('profile', {
    specialization: {
      type: DataType.STRING,
    },
    address: {
      type: DataType.STRING,
    },
    workingHours: {
      type: DataType.STRING,
    },
    phone: {
      type: DataType.STRING,
    },
  });

  profile.associate = models => {
    profile.belongsTo(models.User);
  };

  return profile;
};

export default profile;
