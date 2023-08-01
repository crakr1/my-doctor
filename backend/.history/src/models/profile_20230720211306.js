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

  profile.associate = module => {
    profile.belongsTo(module.User);
  };

  return profile;
};

export default profile;
