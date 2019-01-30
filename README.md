# Client-Side

## Intended Workflow
* You GET the index.html page which contains a browse and an upload button.
* You browse and select an html file which is the saved file of 'program_hafteh2.aspx'
* The file is POSTed in an AJAX call.
* A JSON array of courses is returned as response.
* upload form is disappeared.
* JSON is parsed.
* Timetable is rendered.


## Current Stage
* A `result.json` file and an `index.html` file are staticly served by `server.js` file.
* Only GET method is currently supported.
* You GET `/` then `index.html` is returned, then script tag is interpreted.
* Inside script tag, an AJAX call with GET method fetches `result.json`.
* On success load, `xhr.response` is parsed to JavaScript array of objects.
* Then the timetable is rendered.


# Server-Side

## Intended Workflow
* `server.js` is the entry point of the app which listens for request on the web using express.js framework.
* When receiving GET on `/`, `index.html` will be served.
* When receiving valid POST containing a `.html` file, logic on `fileProcessor.js` is invoked to process the file.
* `fileProcessor.js` receives the html file, assuming it contains lots of useless tags.
* First it finds the appropriate table tag, then sanitizes it and then starts extracting data.
* For an easier pattern matching and spiting of data, the contents of the table are somehow modified before any further processing.
* After extraction, data are turned to instances of Course class defined in `Course.js` file.
* An array of Course instances is prepared and serialized as JSON.
* A JSON array is returned is the response to received POST request.

## Current Stage
`.html` file is stored locally and doesn't contain other table tags.
JSON response is wrote to a `result.json` file locally and is served with GET.