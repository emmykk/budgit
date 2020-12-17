# budgit-api
No frills budget tracking by user-defined categories.

# Contributor Note:

Please use an *imperative* commit style!
Write commits like this, in the imperative present tense, concisely describing the action:


`'Add comments section to home page'`
`'Delete questions component'`

Happy coding!

CONFIG 

MAC -> create a file in environment/test.sh with the format

export DB_CONNECTION_DATABASE = "<database>"
  
export DB_CONNECTION_USERNAME = "<database username>"
  
export DB_CONNECTION_PASSWORD = "<db password>"
  
export DB_CONNECTION_HOST = "<db host>"
  
 If you are unfortunate and are on windows create a file in environment/test-windows.ps1 with the format
 
$env:DB_CONNECTION_DATABASE="<database>"
  
$env:DB_CONNECTION_USERNAME="<database username>"
  
$env:DB_CONNECTION_PASSWORD="<db password>"
  
$env:DB_CONNECTION_HOST="<db host>"
  
npm run test
