# budgit-api

No frills budget tracking by user-defined categories.

## Contributing:

Please use an _imperative_ commit style!
Write commits like this, in the imperative present tense, concisely describing the action:

`'Add comments section to home page'`

`'Delete questions component'`

Happy coding!

## DB Config:

MAC -> create a file in environment/test.sh with the format

```
export DB_CONNECTION_DATABASE = "<database>"
  
export DB_CONNECTION_USERNAME = "<database username>"
  
export DB_CONNECTION_PASSWORD = "<db password>"
  
export DB_CONNECTION_HOST = "<db host>" 
```
  
 If you are are using Windows, create a file in environment/test-windows.ps1 with the format

```
$env:DB_CONNECTION_DATABASE="<database>"
  
$env:DB_CONNECTION_USERNAME="<database username>"
  
$env:DB_CONNECTION_PASSWORD="<db password>"
  
$env:DB_CONNECTION_HOST="<db host>"
```

## How to Run the Tests
On Mac:
`npm run test:local`

On Windows:
`npm run test:local:windows`
