const _sqlPackage = require('mssql');

dbConfig = {
    user: "<user name>",
    password: "<password>",
    server: "<server name>", // can be azure sql as well
    port: 1433,  // change the port number, usually for azure sql its 1433
    database: "<database name>",
    options: {
        "encrypt": true,   // essential to include this for azure sql
    }
};

var conn = new _sqlPackage.ConnectionPool(dbConfig);

QueryToExecuteInDatabase = function (response, strQuery) {
    //close sql connection before creating an connection otherwise you will get an error if connection already exists.  
    _sqlPackage.close();
    //Now connect your sql connection  
    _sqlPackage.connect(dbConfig, function (error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            response.send(error);
        }
        else {
            //let's create a request for sql object  
            var request = new _sqlPackage.Request();
            //Query to run in our database  
            request.query(strQuery, function (error, responseResult) {
                if (error) {
                    console.log("Error while connecting to database:- " + error);
                    response.send(error);
                }
                else {
                    response.send(responseResult.recordset);
                }
            });
        }
    });
}

insertStoredProcedureToExecute = function (response, sp_Name, params_Values) {
    _sqlPackage.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            val = params_Values[obj];
            key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.execute(sp_Name).then(function (err, recordsets, returnValue, affected) {
            console.log("Your details added successfully");
            conn.close();
            response.send("Your details added successfully");
        }).catch(function (err) {
            console.log(err);
            conn.close();
            response.send("The details could not be added. Please try again!");
        });
    });
}

editStoredProcedureToExecute = function (response, sp_Name, params_Values) {
    _sqlPackage.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            val = params_Values[obj];
            key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.execute(sp_Name).then(function (err, recordsets, returnValue, affected) {
            console.log("Your details were updated successfully");
            conn.close();
            return "Your details were updated successfully";
        }).catch(function (err) {
            console.log("The detaiils could not be updated. Please try again!");
            conn.close();
            return "The detaiils could not be updated. Please try again!";
        });
    });
}

deleteStoredProcedureToExecute = function (response, sp_Name, params_Values) {
    _sqlPackage.close();
    conn.connect().then(function (conn) {
        var request = new _sqlPackage.Request(conn);
        for (var obj in params_Values) {
            val = params_Values[obj];
            key = obj
            request.input(key, _sqlPackage.VarChar(255), val);
        }
        request.execute(sp_Name).then(function (err, recordsets, returnValue, affected) {
            console.log("record was deleted successfully");
            conn.close();
            return "record was deleted successfully";
        }).catch(function (err) {
            console.log("record could not be deleted. Please try again!");
            conn.close();
            return "record could not be deleted. Please try again!";
        });
    });
}


module.exports = { QueryToExecuteInDatabase, insertStoredProcedureToExecute, editStoredProcedureToExecute, deleteStoredProcedureToExecute };