const sql = require('mssql');

module.exports = async function (context, req) {
  const { StudentID, FirstName, LastName, Age, Grade, School, Birthday, DateBaptized } = req.body;

  const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server.database.windows.net',
    database: 'your_database',
    options: {
      encrypt: true
    }
  };

  try {
    await sql.connect(config);
    const request = new sql.Request();

    if (StudentID) {
      await request.query(`
                UPDATE StudentDetails
                SET FirstName = '${FirstName}', LastName = '${LastName}', Age = ${Age}, Grade = '${Grade}', School = '${School}', Birthday = '${Birthday}', DateBaptized = '${DateBaptized}'
                WHERE StudentID = ${StudentID}
            `);
      context.res = {
        status: 200,
        body: "Student details updated successfully"
      };
    } else {
      await request.query(`
                INSERT INTO StudentDetails (FirstName, LastName, Age, Grade, School, Birthday, DateBaptized)
                VALUES ('${FirstName}', '${LastName}', ${Age}, '${Grade}', '${School}', '${Birthday}', '${DateBaptized}')
            `);
      context.res = {
        status: 200,
        body: "Student details added successfully"
      };
    }
  } catch (err) {
    context.res = {
      status: 500,
      body: `Error: ${err.message}`
    };
  }
};
