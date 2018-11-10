/**
 * @api {post} api/v1/favorite Add/Remove/List
 * @apiVersion 1.0.0
 * @apiName HTTP API
 * @apiGroup Favorite
 *
 * @apiDescription Add/Remove/List user favorites
 *
 * @apiParam (FavoriteRequest)            {String}    action            The action to execute. Valid values are:
 * <br/>
 * <br/>
 * <code>ADD</code> Adds a new favorite
 * <br/>
 * <code>REMOVE</code> Removes an existing favorite
 * <br/>
 * <code>LIST</code> Enumerates all favorites
 * @apiParam (FavoriteRequest)            {String}    email             The user email
 * @apiParam (FavoriteRequest)            {String}    catalog           The catalog type. Valid values are:
 * <br/>
 * <br/><code>CKAN</code>
 * <br/><code>DSPACE</code>
 * <br/><code>LAB</code>
 * <br/><code>OPENAIRE</code>
 * <br/><br/>Property <code>catalog</code> is required only for actions <code>ADD</code> and <code>REMOVE</code>. In
 * any other case the value is ignored.
 * @apiParam (FavoriteRequest)            {String}    handle            The resource unique handle. Property
 * <code>handle</code> is required only when action is equal to <code>ADD</code> or <code>REMOVE</code>.
 * @apiParam (FavoriteRequest)            {String}    url               The resource unique URI. Property
 * <code>url</code> is required only when action is equal to <code>ADD</code>.
 * @apiParam (FavoriteRequest)            {String}    title             A user friendly name for the resource.
 * Property <code>title</code> is required only when action is equal to <code>ADD</code>.
 * @apiParam (FavoriteRequest)            {String}    [description]     An optional short description of the resource.
 *
 * @apiParamExample {json} Add Request Example
 * POST api/v1/favorite
 * {
 *   "action": "ADD",
 *   "email": "user@helix.gr",
 *   "catalog": "CKAN",
 *   "handle": "71205188-7573-40e3-915b-186e1b719bb0",
 *   "url": "http://data.hellenicdataservice.gr/dataset/71205188-7573-40e3-915b-186e1b719bb0",
 *   "title": "Average Per Weekly Hour Water Consumption Dataset (January 2015 - May 2017)",
 *   "description": "Water consumption dataset for the city of Athens, Greece, averaged per hour of week. The original data where obtained during the period from January 2015 to May 2017."
 * }
 *
 * @apiParamExample {json} Remove Request Example
 * POST api/v1/favorite
 * {
 *   "action": "REMOVE",
 *   "email": "user@helix.gr",
 *   "catalog": "CKAN",
 *   "handle": "98320e81-616a-4113-9a07-3eb4741b36db"
 * }
 *
 * @apiParamExample {json} List Request Example
 * POST api/v1/favorite
 * {
 *   "action": "LIST",
 *   "email": "user@helix.gr"
 * }
 *
 * @apiSuccess                            {Boolean}   success           Returns <code>true</code> or <code>false</code>
 * indicating success of the operation.
 * @apiSuccess                            {Object[]}  errors            Array of <code>Error</code> objects
 * @apiSuccess                            {Object[]}  result            Array of <code>Favorite</code> objects when request
 * action property is equal to <code>LIST</code>. Otherwise the property is set to <code>null</code>.
 *
 * @apiSuccess (Favorite) {Number}           id                         The record unique id in HELIX core data store.
 * @apiSuccess (Favorite) {String}           catalog                    The catalog type
 * @apiSuccess (Favorite) {String}           handle                     The resource unique handle.
 * @apiSuccess (Favorite) {String}           url                        The resource unique URI.
 * @apiSuccess (Favorite) {String}           title                      A user friendly name for the resource.
 * @apiSuccess (Favorite) {String}           [description]              An optional short description of the resource.
 *
 * @apiSuccessExample {json} ADD Response Example
 * HTTP/1.1 200 OK
 * {
 *   "errors": [],
 *   "success": true
 * }
 *
 * @apiSuccessExample {json} Remove Response Example
 * HTTP/1.1 200 OK
 * {
 *   "errors": [],
 *   "success": true
 * }
 *
 * @apiSuccessExample {json} List Response Example
 * HTTP/1.1 200 OK
 * {
 *   "errors": [],
 *   "success": true,
 *   "result": [{
 *     "id": 2,
 *     "catalog": "CKAN",
 *     "handle": "98320e81-616a-4113-9a07-3eb4741b36db",
 *     "url": "http://data.hellenicdataservice.gr/dataset/71205188-7573-40e3-915b-186e1b719bb0",
 *     "title": "Average Per Weekly Hour Water Consumption Dataset (January 2015 - May 2017)",
 *     "description": "Water consumption dataset for the city of Athens, Greece, averaged per hour of week. The original data where obtained during the period from January 2015 to May 2017."
 *   }]
 * }
 *
 * @apiError                              {Boolean}   success           Always <code>false</code>.
 * @apiError                              {Object[]}  errors            Array of <code>Error</code> objects.
 *
 * @apiError (Error)                      {String} code                 Unique error code. Possible error codes are:
 * <br/>
 * <br/><code>BasicErrorCode.AUTHENTICATION_INVALID_KEY</code> Application key is invalid or missing
 * <br/><code>BasicErrorCode.UNKNOWN</code> An unknown exception has occurred.
 * <br/><code>FavoriteErrorCode.ACTION_NOT_SUPPORTED</code> Action is not supported or missing
 * <br/><code>FavoriteErrorCode.EMAIL_MISSING</code> Email is required
 * <br/><code>FavoriteErrorCode.CATALOG_MISSING</code> Catalog is required
 * <br/><code>FavoriteErrorCode.TITLE_MISSING</code> Title is required
 * <br/><code>FavoriteErrorCode.HANDLE_MISSING</code> Handle is required
 * <br/><code>FavoriteErrorCode.URL_MISSING</code> Url is required
 * <br/><code>FavoriteErrorCode.HANDLE_ALREADY_EXISTS</code> A registration already exists
 * <br/><code>FavoriteErrorCode.HANDLE_NOT_FOUND</code> Favorite was not found
 *
 * @apiError (Error)                      {String} description          Error message
 *
 * @apiErrorExample Error Response Example
 * HTTP/1.1 200 OK
 * {
 *   errors: [{
 *     code: "FavoriteErrorCode.ACTION_NOT_SUPPORTED",
 *     description: "Action is not supported or missing"
 *   }],
 *   success: false
 * }
 *
 */
function action() { return; }
