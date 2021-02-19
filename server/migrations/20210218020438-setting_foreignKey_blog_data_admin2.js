'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // raw 쿼리
    // 외래키 제한자를 설정한다.
    var sql = "ALTER TABLE `blogdataadmin`" +
      "ADD CONSTRAINT `blogdataadmin_userid_fk` FOREIGN KEY (`userID`) REFERENCES `user_mywebsite` (`userID`) ON UPDATE CASCADE ON DELETE RESTRICT";

    // 쿼리 실행
    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
