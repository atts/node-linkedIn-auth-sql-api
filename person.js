module.exports = function(app){

//GET API  
app.get('/person/get', function(_req ,_res){  
    var Sqlquery = 'select * from [dbo].[tblPerson]'; 
    QueryToExecuteInDatabase(_res, Sqlquery);  
}); 

app.get('/person/add', function(_req ,_res){
    let params = {
        'PersonLastName' : _req.query.PersonLastName,
        'PersonFirstName' : _req.query.PersonLastName,
    }
    insertStoredProcedureToExecute(_res,'InsertPersonData',params); 
}); 

app.get('/person/edit', function(_req ,_res){
    let params = {
        'PersonUniqueID':_req.query.PersonUniqueID,
        'PersonLastName' : _req.query.PersonLastName,
        'PersonFirstName' : _req.query.PersonLastName,
    }  
    editStoredProcedureToExecute(_res,'EditPersonData',params); 
}); 

app.get('/person/delete', function(_req ,_res){
    let params = {
        'PersonUniqueID':_req.query.PersonUniqueID,
    }  
    deleteStoredProcedureToExecute(_res,'DeletePersonData',params); 
}); 

}


  

   