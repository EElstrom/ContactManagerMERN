# The Contact API

## Making a request

You can ask the API to do things for you by making requests. Here is what a request looks like:

```JavaScript
// API Call
const response = await fetch('API_ENDPOINT_ROUTE', {
  method: 'POST',
  credentials: 'same-origin', // Include this only when authentication is required
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ // This is your request payload
    <field1>: <value1>,
    <field2>: <value2>
  })
}).then(response => {return response.json()});
```

## /api/register

Register a new user

The Request:

```JavaScript
{
  username: "YOUR_USERNAME", // Required String
  password: "YOUR_PASSWORD", // Required String
  firstname: "YOUR_FIRSTNAME", // Required String
  lastname: "YOUR_LASTNAME", // Required String
  email: "YOUR_EMAIL" // Required String
}
```

The Response:

```JavaScript
{
  success: <Boolean>, // Required Boolean
  errors: "ERROR_STRING" // Only included if success is false
}
```

## /api/login

Login to your account. The API awards a JSON Web Token (JWT) Cookie identifier on successful login. This cookie is required for all contact API endpoints.

The Request:

```JavaScript
{
  username: "YOUR_USERNAME", // Required String
  password: "YOUR_PASSWORD", // Required String
}
```

The Response:

```JavaScript
// The response will put a Cookie in your local storage encoding
// your user information on successful login
{
  success: <Boolean>, // Required Boolean
  errors: ["ERROR_STRING"] // Only included if success is false
}
```

## /api/searchContacts

Search for contacts. Returns contacts that contain matching substrings from request. Requires successful login

The Request

```JavaScript
// Replies with all user contacts if the request has no fields
{
  query: "QUERY_SUBSTRING", // Optional: Returns contacts that contain substring in any field
  sort_by: {<FIELD_YOU_WANT_TO_SORT_BY>: <1 | -1>}, // Optional: Sort order (1 for sorted and -1 for reverse sorted)
  firstname: "FIRSTNAME_SUBSTRING", // Optional: Returns contacts that contain subtring in firstname field
  lastname: "LASTNAME_SUBSTRING", // Optional: Returns contacts that contain subtring in lastname field
  phoneNumber: "PHONE_NUMBER_SUBSTRING", // Optional: Returns contacts that contain subtring in phoneNumber field
  email: "EMAIL_SUBSTRING", // Optional: Returns contacts that contain subtring in email field
  address: "ADDRESS_SUBSTRING", // Optional: Returns contacts that contain subtring in address field
  company: "COMPANY_SUBSTRING", // Optional: Returns contacts that contain subtring in company field
  title: "TITLE_SUBSTRING" // Optional: Returns contacts that contain subtring in title field
}
```

The Response

```JavaScript
{
  success: <Boolean> // Required Boolean
  contacts: [LIST_OF_CONTACTS] // Included on successful search
  errors: ["ERROR_STRING"] // Included on failed search
}
```

## /api/addContact

Add a new contact. Requires successful login

The Request

```JavaScript
// The Request must include at least one optional field
// Leave unused optional fields undefined (don't even include them in the request)
{
  firstname: "YOUR_CONTACT_FIRSTNAME", // Optional String
  lastname: "YOUR_CONTACT_LASTNAME", // Optional String
  phoneNumber: ["YOUR_CONTACT_PHONE_NUMBER_1", "YOUR_CONTACT_PHONE_NUMBER_2"], // Optional String Array
  email: ["YOUR_CONTACT_EMAIL_1", "YOUR_CONTACT_EMAIL_2"], // Optional String Array
  address: ["YOUR_CONTACT_ADDRESS_1", "YOUR_CONTACT_ADDRESS_2"], // Optional String Array
  company: "YOUR_CONTACT_COMPANY", // Optional String
  title: "YOUR_CONTACT_TITLE" // Optional String
}
```

The Response

```JavaScript
{
  success: <Boolean> // Required Boolean
  errors: ["ERROR_STRING"] // Only included if success is false
}
```

## /api/editContact

Edit an existing contact. Requires successful login

The Request

```JavaScript
// Leave unused optional fields undefined (don't even include them in the request)
// Included field values will overwrite existing ones
{
  id: "THE_ID_OF_THE_CONTACT_YOU_WANT_TO_EDIT", // Required String
  firstname: "YOUR_CONTACT_FIRSTNAME", // Optional String
  lastname: "YOUR_CONTACT_LASTNAME", // Optional String
  phoneNumber: ["YOUR_CONTACT_PHONE_NUMBER_1", "YOUR_CONTACT_PHONE_NUMBER_2"], // Optional String Array
  email: ["YOUR_CONTACT_EMAIL_1", "YOUR_CONTACT_EMAIL_2"], // Optional String Array
  address: ["YOUR_CONTACT_ADDRESS_1", "YOUR_CONTACT_ADDRESS_2"], // Optional String Array
  company: "YOUR_CONTACT_COMPANY", // Optional String
  title: "YOUR_CONTACT_TITLE" // Optional String
}
```

The Response

```JavaScript
{
  success: <Boolean> // Required Boolean
  errors: ["ERROR_STRING"] // Only included if success is false
}
```

## /api/deleteContact

Delete an existing contact. Requires successful login

The Request

```JavaScript
// Leave unused optional fields undefined (don't even include them in the request)
// Included field values will overwrite existing ones
{
  id: "THE_ID_OF_THE_CONTACT_YOU_WANT_TO_DELETE" // Required String
}
```

The Response

```JavaScript
{
  success: <Boolean> // Required Boolean
  errors: ["ERROR_STRING"] // Only included if success is false
}
```
