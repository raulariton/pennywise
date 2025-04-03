const user = require("../entities/eventSchema");
const dataSource = require('../config/database')

const getUsers = async (request, response, next) => {
	try {
	  const users = await dataSource
      .createQueryBuilder()
      .select('users')
      .from(user, 'users')
      .getMany()
	  response.status(200).json(users);
	} catch (err) {
	  console.log(err)
	}
};

module.exports = { getUsers };
